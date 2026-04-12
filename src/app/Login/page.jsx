"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, Mail, Lock, CheckCircle, Eye, EyeClosed } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { setUser } from "@/redux/slice/UserSlice";
import { removeAccount } from "@/redux/slice/RegisterSlice";
import { validateEmail, validatePassword } from "@/lib/utils";

const variables = {
  email: "",
  password: "",
};
const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(removeAccount());
  }, []);

  const [form, setForm] = useState(variables);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(variables);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (value, attr) => {
    const data = { ...form };
    data[attr] = value;
    setForm(data);
  };

  const validateFields = (field) => ({
    email: validateEmail(field.email || "", "Email"),
    password: validatePassword(field.password, "Password"),
  });
  const reset = () => {
    setError(variables);
    setForm(variables);
    setIsLoading(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(validateFields(form));
  };

  useEffect(() => {
    if (isSubmitting && Object.values(error).every((item) => item === null)) {
      setIsLoading(true);
      const validateLogin = async () => {
        const response = await fetch("/api/validate-login", {
          method: "POST",
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        });
        const initData = await response.json();
        if (!initData.success) {
          toast.error(initData.message);
          reset();
          return;
        }
        toast.success(initData.message);
        dispatch(setUser(initData.data));
        reset();
      };
      validateLogin();
    }
  }, [isSubmitting, error]);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      {/* Go Home Button */}
      <Link
        href="/"
        className="mb-8 flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition"
      >
        <Home className="w-5 h-5 text-blue-600" />
        <span className="font-medium">Go to Home</span>
      </Link>

      {/* Card */}
      <div className="w-full max-w-xl `bg-gradient-to-r from-[#f8fafe] rounded-3xl shadow-xl p-8 sm:p-12">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-10">
          Enter your university email and password to sign in to your account
        </p>
        <form className="space-y-6">
          <div>
            <label className="block font-semibold mb-2">University Email</label>

            <div className="flex items-center bg-gray-50 border rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
              <Mail className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange(e.target.value, "email")}
                placeholder="name@stu.ui.edu.ng"
                className="w-full bg-transparent outline-none text-gray-700"
              />
            </div>
            {error && error.email && (
              <div className="flex items-center gap-2 text-sm text-red-500 mt-2">
                <span>{error.email}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Accepted emails: @stu.ui.edu.ng or @dlc.ui.edu.ng</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-semibold">Password</label>
              <Link
                href="/forgot-password"
                className="text-blue-600 hover:underline text-sm"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="flex items-center bg-gray-50 border rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
              <Lock className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => handleChange(e.target.value, "password")}
                className="w-full bg-transparent outline-none text-gray-700"
              />
              {showPassword ? (
                <Eye onClick={() => setShowPassword(!showPassword)} />
              ) : (
                <EyeClosed onClick={() => setShowPassword(!showPassword)} />
              )}
            </div>
            {error && error.password && (
              <div className="flex items-center gap-2 text-sm text-red-500 mt-2">
                <span>{error.password}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-full font-semibold text-lg transition"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-white-500 border-t-transparent"></div>
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="border-t my-8"></div>

        {/* Sign Up */}
        <p className="text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            href="/SignUp"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
