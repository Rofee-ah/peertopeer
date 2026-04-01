'use client';

import {
  Home,
  Store,
  ShieldCheck,
  UserCheck,
  BadgeDollarSign,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function page() {
  const router = useRouter();

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 mt-6'>
      <Link
        href='/'
        className='mb-8 flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition'>
        <Home className='w-5 h-5 text-blue-600' />
        <span className='font-medium'>Go to Home</span>
      </Link>

      <div className='w-full max-w-3xl bg-white rounded-3xl shadow-lg overflow-hidden'>
        <div className='bg-gradient-to-b from-blue-100 to-gray-100 h-36 flex items-center justify-center'>
          <div className='bg-white p-5 rounded-full shadow'>
            <Store className='w-7 h-7 text-gray-700' />
          </div>
        </div>

        <div className='p-6 md:p-10'>
          <h1 className='text-3xl md:text-4xl font-bold text-center mb-4'>
            Start Selling on Campus
          </h1>

          <p className='text-gray-500 text-center max-w-xl mx-auto mb-8'>
            Tell students what you offer. List goods or services, and receive
            inquiries securely to your student email.
          </p>

          <div className='space-y-6 mb-10'>
            <div className='flex gap-4'>
              <ShieldCheck className='text-green-600 w-6 h-6 mt-1' />
              <div>
                <h3 className='font-semibold text-lg'>Secure & Private</h3>
                <p className='text-gray-500 text-sm'>
                  Your phone number and private details remain hidden.
                </p>
              </div>
            </div>

            <div className='flex gap-4'>
              <UserCheck className='text-blue-600 w-6 h-6 mt-1' />
              <div>
                <h3 className='font-semibold text-lg'>
                  Verified Students Only
                </h3>
                <p className='text-gray-500 text-sm'>
                  Only verified campus members can view and contact you.
                </p>
              </div>
            </div>

            <div className='flex gap-4'>
              <BadgeDollarSign className='text-teal-600 w-6 h-6 mt-1' />
              <div>
                <h3 className='font-semibold text-lg'>It's completely free</h3>
                <p className='text-gray-500 text-sm'>
                  No listing fees, no hidden charges. Keep 100% of your money.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className='flex md:flex-row gap-1'>
            <button
              onClick={() => router.back()}
              className='flex-1 border rounded-full  md:w-[100px] w-[70px]  font-medium text-gray-700 hover:bg-gray-100 transition'>
              Cancel
            </button>
            <a href='/VendorDetails'>
              <button className='flex-1 bg-blue-600 text-white md:w-[100px]  w-[100px] rounded-full py-4 px-3 font-semibold hover:bg-blue-700 transition'>Continue</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
