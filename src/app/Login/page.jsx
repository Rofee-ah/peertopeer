import React from 'react'
import Link from 'next/link';
import { Home, Mail, Lock, CheckCircle } from 'lucide-react';


const page = () => {
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

        {/* Form */}
        <form className="space-y-6">

          {/* Email */}
          <div>
            <label className="block font-semibold mb-2">
              University Email
            </label>

            <div className="flex items-center bg-gray-50 border rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
              <Mail className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="email"
                placeholder="name@stu.ui.edu.ng"
                className="w-full bg-transparent outline-none text-gray-700"
              />
            </div>

            {/* Accepted Emails */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>
                Accepted emails: @stu.ui.edu.ng or @dlc.ui.edu.ng
              </span>
            </div>
          </div>

          {/* Password */}
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
                type="password"
                placeholder="••••••••"
                className="w-full bg-transparent outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-full font-semibold text-lg transition"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="border-t my-8"></div>

        {/* Sign Up */}
        <p className="text-center text-gray-600">
          Don’t have an account?{' '}
          <Link
            href="/SignUp"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default page