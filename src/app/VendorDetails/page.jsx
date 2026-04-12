"use client";

import {
  ArrowLeft,
  Home,
  User,
  Mail,
  GraduationCap,
  Upload,
} from "lucide-react";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Image from "next/image";

import { validateText } from "@/lib/utils";
import { isVendor } from "@/redux/slice/UserSlice";

const variables = {
  businessName: "",
  primary: "",
  description: "",
  department: "",
};
export default function VendorDetails() {
  const router = useRouter();
  // const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [agree, setAgree] = useState(false);
  const [fileName, setFileName] = useState();
  const [form, setForm] = useState(variables);
  const [error, setError] = useState(variables);
  const [savingImage, setSavingImage] = useState(false);
  const [uploadUri, setUploadUri] = useState();
  const [loading, setIsLoading] = useState(false);

  const handleFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file);
    }
  };

  const transformImageUrl = (url, width, height) => {
    return url.replace("/upload/", `/upload/w_${width},h_${height}/`);
  };

  useEffect(() => {
    if (!fileName) return;

    const formData = new FormData();
    formData.append("file", fileName);
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
  }, [fileName]);

  useEffect(() => {
    if (uploadUri) {
      setForm((prev) => ({
        ...prev,
        logo: uploadUri,
      }));
    }
  }, [uploadUri]);

  useEffect(() => {
    if (!user) return;
    setForm((prev) => ({
      ...prev,
      universityEmail: user._doc.email,
    }));
  }, [user]);

  const handleChange = (value, attr) => {
    const data = { ...form };
    data[attr] = value;
    setForm(data);
  };

  const validateFields = (field) => ({
    universityEmail: validateText(
      field.universityEmail || "",
      "University Email",
    ),
    primary: validateText(field.primary || "", "Primary Business"),
    description: validateText(field.description || "", "Business description"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(validateFields(form));
  };

  const primaryOptions = [
    "Food Vendor",
    "Tutor",
    "Electronics",
    "Fashion",
    "Services",
  ];

  useEffect(() => {
    if (error && Object.values(error).every((item) => item === null)) {
      const registerVendor = async () => {
        try {
          setIsLoading(true);
          const response = await fetch("/api/register-vendor", {
            method: "POST",
            body: JSON.stringify(form),
          });

          const initData = await response.json();
          if (!initData.success) {
            toast.error(initData.message);
            return;
          }
          toast.success(initData.message);
          setForm(variables);
          setAgree(false);
          setUploadUri(undefined);
          setFileName(undefined);
          // dispatch(isVendor());
          router.push("/VendorCompleteRegistration");
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      registerVendor();
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-[#e9eaec] flex flex-col items-center py-10 px-4">
      <button
        onClick={() => router.push("/")}
        className="mb-8 flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow hover:bg-gray-50 transition"
      >
        <Home className="w-5 h-5 text-blue-600" />
        <span className="font-semibold">Go to Home</span>
      </button>

      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg p-6 md:p-10">
        <div className="flex items-center gap-4 mb-8 ">
          <button
            onClick={() => router.back()}
            className="p-3 bg-white rounded-full hover:bg-gray-200 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.12),inset_-2px_-2px_10px_rgba(255,255,255,0.9)]"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <h1 className="text-3xl md:text-4xl font-bold">Vendor Details</h1>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block font-semibold mb-2">
              Business Name (Optional)
            </label>

            <div className="flex items-center bg-white rounded-xl px-4 py-3 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.12),inset_-2px_-2px_10px_rgba(255,255,255,0.9)]">
              <User className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                value={form.businessName || ""}
                onChange={(e) => handleChange(e.target.value, "businessName")}
                placeholder="e.g Campus Bites or Leave blank for full name"
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-2">
              University Emails
            </label>

            <div className="flex items-center bg-white rounded-xl px-4 py-3 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.12),inset_-2px_-2px_10px_rgba(255,255,255,0.9)]">
              <Mail className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="email"
                defaultValue={user._doc.email || ""}
                placeholder="bendoe@stu.ui.edu.ng"
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-2">
              Primary <span className="text-red-500">*</span>
            </label>

            <select
              className="w-full bg-white rounded-xl px-4 py-3 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.12),inset_-2px_-2px_10px_rgba(255,255,255,0.9)] outline-none"
              onChange={(e) => handleChange(e.target.value, "primary")}
              defaultValue=""
            >
              <option value="" disabled>
                Select...
              </option>
              {primaryOptions.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {error && error.primary && (
              <div className="flex items-center gap-2 text-sm text-red-500 mt-2">
                <span>{error.primary}</span>
              </div>
            )}
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="font-semibold">
                Business Description <span className="text-red-500">*</span>
              </label>

              <span className="text-gray-400 text-sm">
                {form.description.length}/250
              </span>
            </div>

            <textarea
              maxLength={250}
              value={form.description || ""}
              onChange={(e) => handleChange(e.target.value, "description")}
              placeholder="Describe what you sell or offer to other students..."
              className="w-full bg-white rounded-xl p-4 outline-none h-32 resize-none shadow-[inset_2px_2px_6px_rgba(0,0,0,0.12),inset_-2px_-2px_10px_rgba(255,255,255,0.9)]"
            />
            {error && error.description && (
              <div className="flex items-center gap-2 text-sm text-red-500">
                <span>{error.description}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Department (Optional)
            </label>

            <div className="flex items-center bg-white rounded-xl px-4 py-3 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.12),inset_-2px_-2px_10px_rgba(255,255,255,0.9)]">
              <GraduationCap className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                value={form.department || ""}
                onChange={(e) => handleChange(e.target.value, "department")}
                placeholder="e.g Computer Science"
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-3">
              Business Logo/Profile Image (Optional)
            </label>

            <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-50 transition">
              {!savingImage ? (
                <>
                  {!form?.logo && (
                    <>
                      <Upload className="w-6 h-6 text-gray-500 mb-2" />

                      <span className="text-blue-600 font-medium">
                        Upload a file
                      </span>

                      <span className="text-gray-400 text-sm mt-1">
                        PNG or JPG up to 2MB
                      </span>
                    </>
                  )}
                </>
              ) : (
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
              )}
              {!form?.logo ? (
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
                    src={form.logo}
                    width={150}
                    height={150}
                    alt="logo"
                    className="rounded-2xl"
                  />
                </div>
              )}
            </label>
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
              className="w-5 h-5 mt-1 accent-blue-600"
            />

            <div>
              <p className="font-medium">
                I agree to the marketplace guidelines.
              </p>

              <p className="text-gray-400 text-sm">
                I will not sell prohibited items, alcohol, or academic
                assignments.
              </p>
            </div>
          </div>

          {/* Submit */}
          <button
            disabled={!agree}
            onClick={handleSubmit}
            className={`w-full py-4 rounded-full text-white font-semibold transition
    ${
      agree ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
    }`}
          >
            {!loading ? (
              "Complete Setup"
            ) : (
              <div className="flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-t-transparent"></div>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
