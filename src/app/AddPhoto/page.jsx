"use client";

import React, { useState, useEffect } from "react";
import { Upload, X, Home } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { removeListing, updateListing } from "@/redux/slice/ListingSlice";

export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [image, setImage] = useState();
  const [uploadUri, setUploadUri] = useState();
  const [savingImage, setSavingImage] = useState(false);
  const [imageError, setImagError] = useState();

  const handleFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
    }
  };

  const transformImageUrl = (url, width, height) => {
    return url.replace("/upload/", `/upload/w_${width},h_${height}/`);
  };

  useEffect(() => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    );
    formData.append(
      "cloud_name",
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    );
    const saveImage = async () => {
      try {
        setSavingImage(true);

        const uploadResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          },
        );
        if (!uploadResponse.ok) {
          toast.error("Failed to upload image, Try again");
        }
        const data = await uploadResponse.json();
        const transformUrl = transformImageUrl(data.secure_url, 728, 666);
        setUploadUri(transformUrl);
      } catch (error) {
        console.error(error);
      } finally {
        setSavingImage(false);
      }
    };
    saveImage();
  }, [image]);

  useEffect(() => {
    if (uploadUri) {
      dispatch(updateListing({ image: uploadUri }));
    }
  }, [uploadUri]);

  const handleProceed = () => {
    if (!uploadUri) {
      setImagError("Product Image is required");
      return;
    }
    router.push("/ListingDuration");
  };

  const goBack = () => {
    dispatch(removeListing());
    router.push("/VendorProfile");
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex flex-col items-center py-12 px-4">
      <button
        onClick={goBack}
        className="mb-10 flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition"
      >
        <Home className="w-5 h-5 text-blue-600" />
        <span className="font-semibold text-gray-800">Go to Dashboard</span>
      </button>

      <div className="w-full max-w-3xl bg-white rounded-[32px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
          Add photos
        </h1>

        <p className="text-gray-500 text-center mt-3 mb-8 text-sm md:text-base">
          Upload clear images of your item or service
        </p>

        <label className="flex flex-col items-center justify-center w-full h-44 md:h-48 border border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-50 transition text-center">
          {!savingImage ? (
            <>
              {!uploadUri && (
                <>
                  <Upload className="w-7 h-7 text-gray-500 mb-3" />

                  <span className="text-blue-600 font-medium text-sm md:text-base">
                    Click to upload or drag images
                  </span>

                  <span className="text-gray-400 text-xs md:text-sm mt-1">
                    PNG, JPG or WEBP (Max 5MB each)
                  </span>
                </>
              )}
            </>
          ) : (
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
          )}

          {!uploadUri ? (
            <input
              type="file"
              accept="image/*"
              name="image"
              id="file"
              onChange={handleFile}
              className="hidden"
            />
          ) : (
            <div className="rounded-full">
              <Image
                src={uploadUri}
                width={150}
                height={150}
                alt="logo"
                className="rounded-2xl"
              />
            </div>
          )}
        </label>
        {imageError && (
          <div className="flex items-center gap-2 text-sm text-red-500 mt-2">
            <span>{imageError}</span>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 mt-10">
          <button
            onClick={() => router.back()}
            className="flex-1 border border-gray-300 rounded-full py-3 font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Previous
          </button>

          <button
            onClick={handleProceed}
            className="flex-1 bg-blue-600 text-white rounded-full py-3 font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
