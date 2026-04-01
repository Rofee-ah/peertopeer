'use client';

import { Upload, X, Home } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addImages, removeImage } from '@/redux/slice/ImageSlice';
import { useRouter } from 'next/navigation';

export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();

  const images = useSelector((state) => state.images?.images || []);

  const convertToBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
    });
  };

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);

    const base64Images = await Promise.all(
      files.map(async (file) => {
        const base64 = await convertToBase64(file);
        return { url: base64 };
      })
    );

    dispatch(addImages(base64Images));
  };

  const handleProceed = () => {
    router.push('/ListingDuration');
  };
  return (
    <div className='min-h-screen bg-[#f4f7fb] flex flex-col items-center py-12 px-4'>
      <button
        onClick={() => router.push('/VendorProfile')}
        className='mb-10 flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition'>
        <Home className='w-5 h-5 text-blue-600' />
        <span className='font-semibold text-gray-800'>Go to Dashboard</span>
      </button>

      <div className='w-full max-w-3xl bg-white rounded-[32px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-6 md:p-10'>
        <h1 className='text-3xl md:text-4xl font-bold text-center text-gray-900'>
          Add photos
        </h1>

        <p className='text-gray-500 text-center mt-3 mb-8 text-sm md:text-base'>
          Upload clear images of your item or service
        </p>

        <label className='flex flex-col items-center justify-center w-full h-44 md:h-48 border border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-50 transition text-center'>
          <Upload className='w-7 h-7 text-gray-500 mb-3' />

          <span className='text-blue-600 font-medium text-sm md:text-base'>
            Click to upload or drag images
          </span>

          <span className='text-gray-400 text-xs md:text-sm mt-1'>
            PNG, JPG or WEBP (Max 5MB each)
          </span>

          <input
            type='file'
            multiple
            className='hidden'
            onChange={handleUpload}
          />
        </label>

        {images.length > 0 && (
          <p className='text-gray-500 mt-6 text-sm'>
            {images.length} image{images.length > 1 && 's'} uploaded
          </p>
        )}

        {images.length > 0 && (
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-5 mt-6'>
            {images.map((img, index) => (
              <div
                key={index}
                className='relative rounded-2xl overflow-hidden group shadow-sm hover:shadow-md transition'>
                <img
                  src={img.url}
                  alt='preview'
                  className='w-full h-44 object-cover transition duration-300 group-hover:scale-105'
                />

                <button
                  onClick={() => dispatch(removeImage(index))}
                  className='absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md transition'>
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className='flex flex-col md:flex-row gap-4 mt-10'>
          <button
            onClick={() => router.back()}
            className='flex-1 border border-gray-300 rounded-full py-3 font-medium text-gray-700 hover:bg-gray-100 transition'>
            Previous
          </button>

          <button
            onClick={handleProceed}
            className='flex-1 bg-blue-600 text-white rounded-full py-3 font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg'>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
