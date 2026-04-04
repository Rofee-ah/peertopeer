import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Home,
  User,
  Mail,
  Lock,
  CheckCircle,
  CircleCheck,
  Eye,
  EyeClosed,
} from "lucide-react";

import { useSelector, useDispatch } from "react-redux";

import { addAccount } from "@/redux/slice/RegisterSlice";
import { validateConfirmPassword, validatePassword } from "@/lib/utils";

const variables = {
  pin: "",
  confirmPin: "",
};
export const SetPassword = () => {
  const dispatch = useDispatch();

  const [password, setPassword] = useState(variables);
  const [error, setError] = useState(variables);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (value, attr) => {
    const form = { ...password };
    form[attr] = value;
    setPassword(form);
  };

  const goBack = () => {
    dispatch(
      addAccount({
        email: "",
        verified: undefined,
      }),
    );
  };

  const validateField = (field) => ({
    password: validatePassword(field.pin || "", "Password"),
    confirmPassword: validateConfirmPassword(
      field.pin,
      field.confirmPin,
      "Password",
    ),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(validateField(password));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.values(error).every((item) => item === null) && isSubmitting) {
      dispatch(
        addAccount({
          password: password.pin,
        }),
      );
    }
  }, [error, isSubmitting]);

  return (
    <>
      <>
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
          <Link
            href="/"
            className="mb-8 flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition"
          >
            <Home className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Go to Home</span>
          </Link>
          <div className="w-full max-w-2xl `bg-gradient-to-r from-[#f8fafe] rounded-3xl shadow-2xl p-8 sm:p-12">
            <div className="flex flex-wrap justify-center items-center gap-6 mb-12">
              <div className="flex flex-col items-center text-gray-500 bg-blue-500 px-4 py-4 rounded-2xl">
                <User className="w-6 h-6 mb-2 text-white" />
                <span className="text-sm font-semibold text-white">
                  SET PROFILE
                </span>
              </div>
              <div className="flex flex-col items-center text-gray-500 bg-blue-500 px-4 py-4 rounded-2xl">
                <Mail className="w-6 h-6 mb-2 text-white" />
                <span className="text-sm font-semibold text-white">
                  VERIFY EMAIL
                </span>
              </div>
              <div className="flex flex-col items-center border-2 border-blue-500 bg-blue-50 px-4 py-4 rounded-2xl">
                <Lock className="w-6 h-6 text-blue-600 mb-2" />
                <span className="text-sm font-semibold">SET PASSWORD</span>
              </div>
              <div className="flex flex-col items-center text-gray-500">
                <CircleCheck className="w-6 h-6 mb-2" />
                <span className="text-sm font-semibold">COMPLETE</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-center mb-4">
              Create a Password
            </h1>
            <p className="text-center text-gray-500 mb-10">
              Keep your account secure with strong password
            </p>
            <form className="space-y-6">
              <div>
                <label className="block font-semibold mb-2">Password</label>
                <div
                  className="flex items-center bg-gray-50 shadow-[inset_-8px_-8px_15px_rgba(255,255,255,0.8),
             inset_8px_8px_15px_rgba(0,0,0,0.15)] rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-500"
                >
                  <Lock className="w-5 h-5 text-gray-400 mr-3" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password.pin || ""}
                    onChange={(e) => handleChange(e.target.value, "pin")}
                    placeholder="*******"
                    className="w-full bg-transparent outline-none"
                  />
                  {showPassword ? (
                    <EyeClosed onClick={() => setShowPassword(!showPassword)} />
                  ) : (
                    <Eye onClick={() => setShowPassword(!showPassword)} />
                  )}
                </div>
                {error && error.password && (
                  <div className="flex items-center gap-2 text-sm text-red-500 mt-2">
                    <span>{error.password}</span>
                  </div>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-2">
                  Confirm Password
                </label>
                <div
                  className="flex items-center bg-gray-50 shadow-[inset_-8px_-8px_15px_rgba(255,255,255,0.8),
                    inset_8px_8px_15px_rgba(0,0,0,0.15)] rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-500"
                >
                  <Lock className="w-5 h-5 text-gray-400 mr-3" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="********"
                    value={password.confirmPin || ""}
                    onChange={(e) => handleChange(e.target.value, "confirmPin")}
                    className="w-full bg-transparent outline-none"
                  />
                  {showConfirmPassword ? (
                    <EyeClosed
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  ) : (
                    <Eye
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  )}
                </div>
                <span className="text-gray-500 text-sm mt-16">
                  * Password should be at least 8 characters
                </span>
                {error && error.confirmPassword && (
                  <div className="flex items-center gap-2 text-sm text-red-500 mt-2">
                    <span>{error.confirmPassword}</span>
                  </div>
                )}
              </div>
              <div className="flex">
                <button
                  onClick={goBack}
                  type="submit"
                  className="w-full bg-white-600 text-black py-4 border rounded-full font-semibold text-lg mx-2"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-full font-semibold text-lg transition"
                >
                  Next
                </button>
              </div>
            </form>
            <div className="border border-black/25 my-8"></div>
            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link
                href="/Login"
                className="text-blue-600 font-semibold hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </>
    </>
  );
};
