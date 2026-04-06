import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Home, Mail, User, Lock, CircleCheck } from "lucide-react";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const CompleteSignUp = () => {
  const { account } = useSelector((state) => state.register);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsSubmitting(true);

    if (!isSubmitting) {
      const registerAccount = async () => {
        const response = await fetch("/api/register-account", {
          method: "POST",
          body: JSON.stringify(account),
        });
        const initData = await response.json();
        if (!initData.success) {
          return toast.error("Server error, Try again");
        }
        toast.success(initData.message);
        setIsSubmitting(false);
      };
      registerAccount();
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
        <Link
          href="/"
          className="mb-8 flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition"
        >
          <Home className="w-5 h-5 text-blue-600" />
          <span className="font-medium">Go to Home</span>
        </Link>
        <div
          className="w-full max-w-2xl `bg-gradient-to-r from-[#f8fafe] rounded-3xl shadow-2xl p-8 sm:p-12"
          style={{ minHeight: "600px" }}
        >
          <div className="flex flex-wrap justify-center items-center gap-6 mb-12">
            <div className="flex flex-col items-center text-gray-500 bg-blue-500 px-2 py-4 rounded-2xl">
              <Mail className="w-6 h-6 mb-2 text-white" />
              <span className="text-sm font-semibold text-white">
                SET PROFILE{" "}
              </span>
            </div>
            <div className="flex flex-col items-center text-gray-500 bg-blue-500 px-2 py-4 rounded-2xl">
              <User className="w-6 h-6 mb-2 text-white" />
              <span className="text-sm font-semibold text-white">
                VERIFY EMAIL
              </span>
            </div>
            <div className="flex flex-col items-center text-gray-500 bg-blue-500 px-2 py-4 rounded-2xl">
              <Lock className="w-6 h-6 mb-2 text-white" />
              <span className="text-sm font-semibold text-white">
                SET PASSWORD
              </span>
            </div>
            <div className="flex flex-col items-center border-2 border-blue-500 bg-blue-50 px-2 py-4 rounded-2xl">
              <CircleCheck className="w-6 h-6 text-blue-600 mb-2" />
              <span className="text-sm font-semibold">COMPLETE</span>
            </div>
          </div>
          <div className="flex justify-center" style={{ marginTop: "120px" }}>
            <>
              {isSubmitting ? (
                <div className="" style={{ marginBottom: "10px" }}>
                  <p>Loading...</p>
                </div>
              ) : (
                <CircleCheck
                  size={48}
                  className="w-12 h-12 text-green-500 mb-2"
                />
              )}
            </>
          </div>
          <h3 className="text-xl sm:text-xl font-bold text-center mb-4">
            Registration Completed
          </h3>
          <h2
            className="flex justify-center text-sm font-semibold"
            style={{ paddingTop: "50px", paddingBottom: "40px" }}
          >
            Proceed to
            <Link
              href="/Login"
              className=" mx-2 text-blue-600 font-semibold hover:underline"
            >
              Log In
            </Link>
          </h2>
        </div>
      </div>
    </>
  );
};
