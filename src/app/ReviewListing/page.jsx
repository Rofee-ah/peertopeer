'use client';

import { Home, Info } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  // get images from redux
  const images = useSelector((state) => state.images?.images || []);

  // get listing details from redux
  const listing = useSelector((state) => state.listing);

  const duration = listing.duration || 30;

  return (
    <div className='min-h-screen bg-[#f4f7fb] flex flex-col items-center py-12 px-4'>
      {/* Go to Dashboard */}
      <button
        onClick={() => router.push('/VendorProfile')}
        className='mb-10 flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition'>
        <Home className='w-5 h-5 text-blue-600' />
        <span className='font-semibold text-gray-800'>Go to Dashboard</span>
      </button>

      {/* Review Card */}
      <div className='w-full max-w-3xl bg-[#f4f7fb] rounded-[32px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-6 md:p-10'>
        {/* Title */}
        <h1 className='text-3xl md:text-4xl font-bold text-center text-gray-900'>
          Review your listing
        </h1>

        <p className='text-gray-500 text-center mt-3 mb-8 text-sm md:text-base'>
          Confirm all details before publishing
        </p>

        <div className='border border-dashed bg-white border-blue-300 rounded-2xl p-6'>
          {/* TITLE */}
          <div className='mb-6'>
            <p className='text-xs text-gray-400 uppercase font-semibold mb-1'>
              Title
            </p>
            <p className='font-semibold text-gray-900'>
              {listing.title || 'Not provided'}
            </p>
          </div>

          <hr className='my-6 text-gray-300' />

          {/* CATEGORY */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            <div>
              <p className='text-xs text-gray-400 uppercase font-semibold mb-1'>
                Category
              </p>
              <p className='font-semibold text-gray-900'>
                {listing.category || 'Not provided'}
              </p>
            </div>

            <div>
              <p className='text-xs text-gray-400 uppercase font-semibold mb-1'>
                Sub-Category
              </p>
              <p className='font-semibold text-gray-900'>
                {listing.subCategory || 'Not provided'}
              </p>
            </div>
          </div>

          <hr className='my-6 text-gray-300' />

          {/* PRICE + DURATION */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            <div>
              <p className='text-xs text-gray-400 uppercase font-semibold mb-1'>
                Price
              </p>
              <p className='font-semibold text-gray-900'>
                ₦{listing.price || '0'}
              </p>
            </div>

            <div>
              <p className='text-xs text-gray-400 uppercase font-semibold mb-1'>
                Listing Duration
              </p>
              <p className='font-semibold text-gray-900'>{duration} Days</p>
            </div>
          </div>

          <hr className='my-6 text-gray-300' />

          {/* DESCRIPTION */}
          <div>
            <p className='text-xs text-gray-400 uppercase font-semibold mb-1'>
              Description
            </p>

            <p className='text-gray-800 leading-relaxed'>
              {listing.description || 'No description added'}
            </p>
          </div>

          <hr className='my-6 text-gray-300' />

          {/* IMAGES */}
          <div>
            <p className='text-xs text-gray-400 uppercase font-semibold mb-3'>
              Images ({images.length})
            </p>

            {images.length > 0 && (
              <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt='listing'
                    className='w-full h-28 sm:h-32 object-cover rounded-xl'
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* INFO */}
        <div className='flex gap-3 items-start bg-gray-100 rounded-xl p-4 mt-8 text-sm text-gray-600'>
          <Info className='w-5 h-5 mt-0.5 text-gray-500' />
          <p>
            Your listing will be published and visible on the marketplace. It
            will automatically expire after <b>{duration} days</b> if not
            renewed.
          </p>
        </div>

        {/* BUTTONS */}
        <div className='flex flex-col md:flex-row gap-4 mt-10'>
          <button
            onClick={() => router.back()}
            className='flex-1 border border-gray-300 rounded-full py-3 font-medium text-gray-700 hover:bg-gray-100 transition'>
            Edit
          </button>

          <button className='flex-1 bg-blue-600 text-white rounded-full py-3 font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg'>
            Publish Listing
          </button>
        </div>
      </div>
    </div>
  );
}
