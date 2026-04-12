"use client";

import React, { useEffect } from "react";
import { CheckCircle, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function page() {
  const router = useRouter();
  const { user } = useSelector((state) => state.user);

  const handleProceed = () => {
    router.push("/VendorProfile");
  };
  useEffect(() => {
    if (!user) return;
    const { __v, createdAt, ...others } = user._doc;
    const updateUserProfile = async () => {
      try {
        const response = await fetch("/api/update-profile", {
          method: "PUT",
          body: JSON.stringify(others),
        });
        const initData = await response.json();
        if (!initData.success) {
          toast.error("Something went wrong while updating account, try again");
        }
      } catch (error) {
        console.error(error);
      }
    };
    updateUserProfile();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#e9eaec] flex flex-col items-center px-4 py-10">
      <button
        onClick={() => router.push("/")}
        className="
          flex items-center gap-2 
          px-6 py-3 
          rounded-full 
          bg-[#e9eaec]
          shadow-[6px_6px_12px_rgba(0,0,0,0.15),-6px_-6px_12px_rgba(255,255,255,0.9)]
          hover:shadow-[inset_4px_4px_10px_rgba(0,0,0,0.15),inset_-4px_-4px_10px_rgba(255,255,255,0.9)]
          transition
        "
      >
        <Home className="text-blue-600" />
        <span className="font-semibold">Go to Home</span>
      </button>

      <div
        className="
          mt-10 w-full max-w-4xl 
          bg-[#e9eaec]
          rounded-[30px] 
          px-6 py-10 md:px-16 md:py-16
          text-center
          shadow-[10px_10px_30px_rgba(0,0,0,0.12),-10px_-10px_30px_rgba(255,255,255,0.9)]
        "
      >
        <div
          className="
            w-20 h-20 md:w-24 md:h-24
            mx-auto mb-6
            rounded-full
            flex items-center justify-center
            bg-[#e9eaec]
            shadow-[inset_6px_6px_12px_rgba(0,0,0,0.15),inset_-6px_-6px_12px_rgba(255,255,255,0.9)]
          "
        >
          <CheckCircle className="text-blue-600 w-8 h-8 md:w-10 md:h-10" />
        </div>

        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          You’re officially a Vendor!
        </h1>

        <p className="text-gray-600 text-sm md:text-lg mb-8 max-w-2xl mx-auto">
          Your vendor profile is set up and ready to utilize our exchange
          service.
        </p>

        <div className="text-gray-600 space-y-3 text-sm md:text-lg mb-10">
          <p>You can now:</p>

          <p>✔ Post goods or services or both</p>
          <p>
            ✔ Start receiving inquiries from students via your institutional
            email
          </p>
        </div>

        <button
          onClick={handleProceed}
          className="
            w-full md:w-[80%] mx-auto
            py-4 md:py-5
            rounded-full
            text-white
            text-sm md:text-lg
            font-semibold
            bg-blue-600
            hover:bg-blue-700
            transition
          "
        >
          Proceed to Vendor Dashboard
        </button>
      </div>
    </div>
  );
}
