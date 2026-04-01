'use client';

import { Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { updateField, loadListing } from '@/redux/slice/ListingSlice';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();

  const listing = useSelector((state) => state.listing);

  useEffect(() => {
    dispatch(loadListing());
  }, [dispatch]);

  const handleProceed = () => {
    router.push('/AddPhoto');
  };

  return (
    <div className='min-h-screen bg-[#f4f6fb] flex flex-col items-center px-4 py-10'>
      {/* Dashboard */}
      <button
        onClick={() => router.back()}
        className='flex items-center gap-2 bg-white shadow-md px-6 py-3 rounded-full text-gray-800 font-medium mb-10 hover:shadow-lg transition'>
        <Home size={18} className='text-blue-600' />
        Back to Dashboard
      </button>

      {/* Card */}
      <div className='w-full max-w-3xl bg-white rounded-3xl shadow-lg p-6 md:p-10'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold'>
            What are you selling?
          </h1>
          <p className='text-gray-500 mt-2'>
            Tell us about your item or service
          </p>
        </div>

        {/* Title */}
        <div className='mb-6'>
          <label className='block font-medium mb-2'>
            Listing Title <span className='text-red-500'>*</span>
          </label>

          <input
            type='text'
            value={listing.title}
            onChange={(e) =>
              dispatch(updateField({ field: 'title', value: e.target.value }))
            }
            placeholder='e.g CLRS Algorithms Textbook'
            className='w-full bg-[#f7f8fb] rounded-xl px-5 py-4 outline-none shadow-sm'
          />
        </div>

        {/* Category */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
          <div>
            <label className='block font-medium mb-2'>
              Category <span className='text-red-500'>*</span>
            </label>

            <select
              value={listing.category}
              onChange={(e) =>
                dispatch(
                  updateField({ field: 'category', value: e.target.value })
                )
              }
              className='w-full bg-[#f7f8fb] rounded-xl px-5 py-4 outline-none shadow-sm'>
              <option>Select...</option>
              <option>Goods</option>
              <option>Services</option>
              <option>Both</option>
            </select>
          </div>

          <div>
            <label className='block font-medium mb-2'>
              Sub-category <span className='text-red-500'>*</span>
            </label>

            <select
              value={listing.subCategory}
              onChange={(e) =>
                dispatch(
                  updateField({ field: 'subCategory', value: e.target.value })
                )
              }
              className='w-full bg-[#f7f8fb] rounded-xl px-5 py-4 outline-none shadow-sm'>
              <option>Select...</option>
              <option>Fresh Foods</option>
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Books</option>
              <option>Jewellery</option>
              <option>Snacks</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div className='mb-6'>
          <label className='block font-medium mb-2'>
            Description <span className='text-red-500'>*</span>
          </label>

          <textarea
            rows='4'
            value={listing.description}
            onChange={(e) =>
              dispatch(
                updateField({ field: 'description', value: e.target.value })
              )
            }
            placeholder='Describe your item or service in detail...'
            className='w-full bg-[#f7f8fb] rounded-xl px-5 py-4 outline-none shadow-sm'
          />
        </div>

        {/* Price */}
        <div className='mb-8'>
          <label className='block font-medium mb-2'>
            Price (₦) <span className='text-red-500'>*</span>
          </label>

          <input
            type='number'
            value={listing.price}
            onChange={(e) =>
              dispatch(updateField({ field: 'price', value: e.target.value }))
            }
            placeholder='0.00'
            className='w-full bg-[#f7f8fb] rounded-xl px-5 py-4 outline-none shadow-sm'
          />
        </div>

        {/* Next */}
        <button
          onClick={handleProceed}
          className='w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-full text-lg font-semibold transition'>
          Next
        </button>
      </div>
    </div>
  );
}
