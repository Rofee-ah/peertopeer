'use client';
import Header from '@/component/Header';
import { Store, Package, Eye, ArrowRight, Box, BadgeCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const handleProceed = () => {
    router.push('/CreateListing');
  };

  return (
    <div className='bg-[#f4f6fb] min-h-screen'>
      <div className='fixed top-0 left-0 w-full z-50'>
        <Header />
      </div>

      <div className='pt-24 p-6 md:p-12'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 md:mt-24'>
          <div className='bg-white rounded-3xl shadow-md overflow-hidden'>
            <div className='h-32 bg-gradient-to-r from-blue-100 to-gray-100 flex justify-center items-end'>
              <div className='w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg translate-y-10'>
                <Store className='text-blue-600' size={36} />
              </div>
            </div>

            <div className='pt-14 pb-8 px-6 text-center'>
              <h2 className='text-2xl font-bold'>Business/Profile Name</h2>

              <div className='flex justify-center items-center gap-2 mt-2 text-gray-500'>
                <BadgeCheck className='text-blue-600' size={16} />
                VERIFIED VENDOR
              </div>

              <div className='flex justify-center gap-4 mt-6 flex-wrap'>
                <button className='flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full'>
                  <Package size={16} />0 Listings
                </button>

                <button className='flex items-center gap-2 bg-teal-200 text-gray-800 px-5 py-2 rounded-full'>
                  <Eye size={16} />
                  Profile View
                </button>
              </div>

              <button
                onClick={handleProceed}
                className='mt-8 w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-full flex items-center justify-center gap-2 text-lg font-medium'>
                Create Listing
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          <div className='bg-white rounded-3xl shadow-md flex flex-col justify-center items-center text-center p-10'>
            <div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center'>
              <Box size={36} className='text-gray-600' />
            </div>

            <h3 className='text-xl font-semibold mt-6'>No listings yet</h3>

            <p className='text-gray-500 mt-2 max-w-md'>
              Your business is set up and ready to go. Create your first listing
              to start reaching students on campus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
