'use client';

import {
  ArrowLeft,
  Home,
  User,
  Mail,
  GraduationCap,
  Upload,
} from 'lucide-react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VendorDetails() {
  const router = useRouter();

  const [description, setDescription] = useState('');
  const [agree, setAgree] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className='min-h-screen bg-[#e9eaec] flex flex-col items-center py-10 px-4'>
      {/* Go Home */}
      <button
        onClick={() => router.push('/')}
        className='mb-8 flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow hover:bg-gray-50 transition'>
        <Home className='w-5 h-5 text-blue-600' />
        <span className='font-semibold'>Go to Home</span>
      </button>

      {/* Card */}
      <div className='w-full max-w-3xl bg-white rounded-3xl shadow-lg p-6 md:p-10'>
        {/* Header */}
        <div className='flex items-center gap-4 mb-8 '>
          <button
            onClick={() => router.back()}
            className='p-3 bg-white rounded-full hover:bg-gray-200 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.12),inset_-2px_-2px_10px_rgba(255,255,255,0.9)]'>
            <ArrowLeft className='w-5 h-5' />
          </button>

          <h1 className='text-3xl md:text-4xl font-bold'>Vendor Details</h1>
        </div>

        <div className='space-y-6'>
          {/* Business Name */}
          <div>
            <label className='block font-semibold mb-2'>
              Business Name (Optional)
            </label>

            <div className='flex items-center bg-white rounded-xl px-4 py-3 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.12),inset_-2px_-2px_10px_rgba(255,255,255,0.9)]'>
              <User className='w-5 h-5 text-gray-400 mr-3' />
              <input
                type='text'
                placeholder='e.g Campus Bites or Leave blank for full name'
                className='bg-transparent outline-none w-full'
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className='block font-semibold mb-2'>
              University Emails
            </label>

            <div className='flex items-center bg-white rounded-xl px-4 py-3 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.12),inset_-2px_-2px_10px_rgba(255,255,255,0.9)]'>
              <Mail className='w-5 h-5 text-gray-400 mr-3' />
              <input
                type='email'
                placeholder='bendoe@stu.ui.edu.ng'
                className='bg-transparent outline-none w-full'
              />
            </div>
          </div>

          {/* Primary Focus */}
          <div>
            <label className='block font-semibold mb-2'>
              Primary <span className='text-red-500'>*</span>
            </label>

            <select className='w-full bg-white rounded-xl px-4 py-3 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.12),inset_-2px_-2px_10px_rgba(255,255,255,0.9)]'>
              <option>Select...</option>
              <option>Food Vendor</option>
              <option>Tutor</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Services</option>
            </select>
          </div>

          {/* Business Description */}
          <div>
            <div className='flex justify-between mb-2'>
              <label className='font-semibold'>
                Business Description <span className='text-red-500'>*</span>
              </label>

              <span className='text-gray-400 text-sm'>
                {description.length}/250
              </span>
            </div>

            <textarea
              maxLength={250}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Describe what you sell or offer to other students...'
              className='w-full bg-white rounded-xl p-4 outline-none h-32 resize-none shadow-[inset_2px_2px_6px_rgba(0,0,0,0.12),inset_-2px_-2px_10px_rgba(255,255,255,0.9)]'
            />
          </div>

          {/* Department */}
          <div>
            <label className='block font-semibold mb-2'>
              Department (Optional)
            </label>

            <div className='flex items-center bg-white rounded-xl px-4 py-3 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.12),inset_-2px_-2px_10px_rgba(255,255,255,0.9)]'>
              <GraduationCap className='w-5 h-5 text-gray-400 mr-3' />
              <input
                type='text'
                placeholder='e.g Computer Science'
                className='bg-transparent outline-none w-full'
              />
            </div>
          </div>

          {/* Upload */}
          <div>
            <label className='block font-semibold mb-3'>
              Business Logo/Profile Image (Optional)
            </label>

            <label className='flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-50 transition'>
              <Upload className='w-6 h-6 text-gray-500 mb-2' />

              <span className='text-blue-600 font-medium'>Upload a file</span>

              <span className='text-gray-400 text-sm mt-1'>
                PNG or JPG up to 2MB
              </span>

              {fileName && (
                <p className='text-sm text-gray-600 mt-2'>{fileName}</p>
              )}

              <input
                type='file'
                accept='image/png, image/jpeg'
                className='hidden'
                onChange={handleFile}
              />
            </label>
          </div>

          {/* Agreement */}
          <div className='flex items-start gap-3'>
            <input
              type='checkbox'
              checked={agree}
              onChange={() => setAgree(!agree)}
              className='w-5 h-5 mt-1 accent-blue-600'
            />

            <div>
              <p className='font-medium'>
                I agree to the marketplace guidelines.
              </p>

              <p className='text-gray-400 text-sm'>
                I will not sell prohibited items, alcohol, or academic
                assignments.
              </p>
            </div>
          </div>

          {/* Submit */}
          <button
            disabled={!agree}
            onClick={() => {
              if (!agree) return;
              router.push('/VendorCompleteRegistration');
            }}
            className={`w-full py-4 rounded-full text-white font-semibold transition
    ${
      agree ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'
    }`}>
            Complete Setup
          </button>
        </div>
      </div>
    </div>
  );
}
