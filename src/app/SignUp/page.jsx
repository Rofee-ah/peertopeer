'use client';
import React from 'react';
import Link from 'next/link';
import { Home, User, Mail, Lock, CheckCircle, CircleCheck } from 'lucide-react';

const page = () => {
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4'>
      {/* Go Home */}
      <Link
        href='/'
        className='mb-8 flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition'>
        <Home className='w-5 h-5 text-blue-600' />
        <span className='font-medium'>Go to Home</span>
      </Link>

      {/* Card */}
      <div className='w-full max-w-2xl `bg-gradient-to-r from-[#f8fafe] rounded-3xl shadow-2xl p-8 sm:p-12'>
        {/* Step Indicator */}
        <div className='flex flex-wrap justify-center gap-6 mb-12'>
          {/* Active Step */}
          <div className='flex flex-col items-center border-2 border-blue-500 bg-blue-50 px-6 py-4 rounded-2xl'>
            <User className='w-6 h-6 text-blue-600 mb-2' />
            <span className='text-sm font-semibold'>SET PROFILE</span>
          </div>

          <div className='flex flex-col items-center text-gray-500'>
            <Mail className='w-6 h-6 mb-2' />
            <span className='text-sm font-semibold'>VERIFY EMAIL</span>
          </div>

          <div className='flex flex-col items-center text-gray-500'>
            <Lock className='w-6 h-6 mb-2' />
            <span className='text-sm font-semibold'>SET PASSWORD</span>
          </div>

          <div className='flex flex-col items-center text-gray-500'>
            <CircleCheck className='w-6 h-6 mb-2' />
            <span className='text-sm font-semibold'>COMPLETE</span>
          </div>
        </div>

        {/* Title */}
        <h1 className='text-3xl sm:text-5xl font-bold text-center mb-4'>
          Welcome to UI Exchange
        </h1>

        <p className='text-center text-gray-500 mb-10'>
          Tell us about yourself to get started
        </p>

        {/* Form */}
        <form className='space-y-6'>
          {/* First Name */}
          <div>
            <label className='block font-semibold mb-2'>First Name</label>
            <div
              className='flex items-center bg-gray-50 shadow-[inset_-8px_-8px_15px_rgba(255,255,255,0.8),
         inset_8px_8px_15px_rgba(0,0,0,0.15)] rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-500'>
              <User className='w-5 h-5 text-gray-400 mr-3' />
              <input
                type='text'
                placeholder='Alex'
                className='w-full bg-transparent outline-none'
              />
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label className='block font-semibold mb-2'>Last Name</label>
            <div
              className='flex items-center bg-gray-50 shadow-[inset_-8px_-8px_15px_rgba(255,255,255,0.8),
                inset_8px_8px_15px_rgba(0,0,0,0.15)] rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-500'>
              <User className='w-5 h-5 text-gray-400 mr-3' />
              <input
                type='text'
                placeholder='Doe'
                className='w-full bg-transparent outline-none'
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className='block font-semibold mb-2'>University Email</label>

            <div
              className='flex items-center bg-gray-50  shadow-[inset_-8px_-8px_15px_rgba(255,255,255,0.8),
         inset_8px_8px_15px_rgba(0,0,0,0.15)] rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-500'>
              <Mail className='w-5 h-5 text-gray-400 mr-3' />
              <input
                type='email'
                placeholder='name@stu.ui.edu.ng'
                className='w-full bg-transparent outline-none'
              />
            </div>

            <div className='flex items-center gap-2 text-sm text-gray-500 mt-2'>
              <CheckCircle className='w-4 h-4 text-green-500' />
              <span>Accepted emails: @stu.ui.edu.ng or @dlc.ui.edu.ng</span>
            </div>
          </div>

          {/* Button */}
          <button
            type='submit'
            className='w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-full font-semibold text-lg transition'>
            Next
          </button>
        </form>

        {/* Divider */}
        <div className='border-t my-8'></div>

        {/* Login Link */}
        <p className='text-center text-gray-600'>
          Already have an account?{' '}
          <Link
            href='/Login'
            className='text-blue-600 font-semibold hover:underline'>
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
