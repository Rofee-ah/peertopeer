'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateListing } from '@/redux/slice/ListingSlice';

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();

  // get saved duration from redux
  const listing = useSelector((state) => state.listing);

  const [useCustom, setUseCustom] = useState(false);
  const [days, setDays] = useState(30);

  // restore saved data when page loads
  useEffect(() => {
    if (listing.duration) {
      setDays(listing.duration);
      setUseCustom(listing.duration !== 30);
    }
  }, [listing.duration]);

  const handleNext = () => {
    const duration = useCustom ? Number(days) : 30;

    // save to redux
    dispatch(updateListing({ duration }));

    router.push('/ReviewListing');
  };

  return (
    <div className='min-h-screen bg-[#f4f6fb] flex flex-col items-center px-4 py-10'>
      {/* Dashboard */}
      <button
        onClick={() => router.push('/VendorProfile')}
        className='flex items-center gap-2 bg-white shadow-md px-5 py-3 rounded-full text-gray-800 font-medium mb-10 hover:shadow-lg transition'>
        <Home size={18} />
        Go to Dashboard
      </button>

      {/* Card */}
      <div className='w-full max-w-2xl bg-white rounded-3xl shadow-md p-6 sm:p-10'>
        <h1 className='text-3xl font-bold text-center'>Listing duration</h1>

        <p className='text-gray-500 text-center mt-2 mb-8'>
          How long should this listing be active?
        </p>

        {/* Selection */}
        <div className='border-2 border-dashed border-blue-300 rounded-xl p-6'>
          <h3 className='font-semibold text-lg'>
            Does this item have an expiration date?
          </h3>

          <p className='text-gray-500 text-sm mt-1 mb-6'>
            E.g., goods that expire, services with limited availability
          </p>

          <div className='flex gap-4'>
            {/* Default */}
            <button
              onClick={() => {
                setUseCustom(false);
                setDays(30);
              }}
              className={`flex-1 py-3 rounded-full font-medium border transition
              ${
                !useCustom
                  ? 'bg-blue-700 text-white'
                  : 'bg-white border-gray-300 hover:bg-gray-50'
              }`}>
              No (Use Default 30 Days)
            </button>

            {/* Custom */}
            <button
              onClick={() => setUseCustom(true)}
              className={`flex-1 py-3 rounded-full font-medium transition
              ${
                useCustom
                  ? 'bg-blue-700 text-white'
                  : 'border border-gray-300 hover:bg-gray-50'
              }`}>
              Yes, Custom Duration
            </button>
          </div>
        </div>

        {/* Custom Input */}
        {useCustom && (
          <div className='mt-6'>
            <label className='font-semibold'>
              How many days should this listing be active?
            </label>

            <div className='flex items-center mt-2 border rounded-full px-4 py-3'>
              <input
                type='number'
                value={days}
                min='1'
                onChange={(e) => setDays(e.target.value)}
                className='w-full outline-none'
              />
              <span className='text-gray-400'>Days</span>
            </div>
          </div>
        )}

        {/* Info */}
        {!useCustom && (
          <div className='bg-gray-100 rounded-xl p-4 mt-6 text-sm text-gray-600 flex gap-2'>
            <span>ℹ️</span>
            <p>
              Your listing will be active for <strong>30 days</strong> by
              default. You can renew it anytime before it expires.
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className='flex gap-4 mt-8'>
          <button
            onClick={() => router.back()}
            className='flex-1 border border-gray-300 rounded-full py-3 font-medium hover:bg-gray-100'>
            Previous
          </button>

          <button
            onClick={handleNext}
            className='flex-1 bg-blue-700 text-white py-3 rounded-full font-medium hover:bg-blue-800'>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
