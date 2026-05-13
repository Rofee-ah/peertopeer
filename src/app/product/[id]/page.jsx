'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import ContactVendorModal from '@/component/ContactVendorModal';
import Image from 'next/image';
import Link from 'next/link';

import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Mail,
  Shield,
  ShieldCheck,
  GraduationCap,
  MapPin,
} from 'lucide-react';

import Header from '@/component/Header';
import { formatNaira, calculateDaysRemaining } from '@/lib/utils';

export default function Page() {
  const param = useParams();
  const { productItems } = useSelector((state) => state.product);

  const [entity, setEntity] = useState();
  const [showVendor, setShowVendor] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (param.id && !entity) {
      const getProducts = async () => {
        const response = await fetch(`/api/get-single-listing?id=${param.id}`);
        const initData = await response.json();
        if (initData.success) {
          setEntity(initData.data);
        }
      }
      getProducts();
    }
  }, [param.id])

  useEffect(() => {
    if (entity) {
      const updateViewsCount = async () => {
        await fetch(`/api/update-views-count`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: param.id,
            count: (entity.count || 0) + 1,
          }),
        });
      }
      updateViewsCount();
    }
  }, [entity])

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === entity.image.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <div className='bg-[#f9fbff]'>
        {showVendor && entity && (
          <ContactVendorModal
            seller={entity}
            isContact
            onClose={() => setShowVendor(false)}
          />
        )}

        {showProfile && entity && (
          <ContactVendorModal
            seller={entity}
            onClose={() => setShowProfile(false)}
          />
        )}

        <Header />

        {entity && (
          <div className='min-h-screen bg-[#f4f6fb] p-6 md:p-20 pt-32 md:pt-50'>
            <p className='flex items-center text-sm md:text-base'>
              <Link href='/'>Home</Link> / {entity.category} /{' '}
              {entity.title}
            </p>

            <div className='flex items-center gap-2 text-gray-600 cursor-pointer mb-6 pt-6 md:pt-10'>
              <Link href='/'>
                <div className='flex items-center'>
                  <ArrowLeft size={18} />
                  Back to Marketplace
                </div>
              </Link>
            </div>

            {/* MAIN GRID */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-90'>
              {/* LEFT SIDE */}
              <div>
                <h1 className='text-2xl md:text-4xl font-bold mb-3'>
                  {entity.title}
                </h1>

                <div className='flex flex-wrap gap-4 md:gap-6 text-gray-500 mb-6 text-sm md:text-base'>
                  <div className='flex items-center gap-2'>
                    <Clock size={16} />
                    {new Date(entity.createdAt).toDateString()}
                  </div>

                  <div className='flex items-center gap-2'>
                    <Clock size={16} />
                    {calculateDaysRemaining(entity.createdAt, entity.listing_duration)} days left
                  </div>
                </div>

                {/* MAIN IMAGE */}
                <div className='bg-white rounded-2xl p-6 md:p-20 flex justify-center items-center shadow-inner w-full md:w-[900px]'>
                  <img
                    src={entity.image[currentImageIndex]}
                    alt={entity.title}
                    className='w-[250px] md:w-[500px] h-[250px] md:h-[400px] object-contain drop-shadow-xl'
                  />
                  {entity.image.length > 1 && (
                    <div className='flex items-center gap-10 w-[50px] h-[40px] bg-white rounded-full shadow-inner ml-2 md:ml-50'>
                      < ArrowRight size={20} onClick={handleNextImage} className='ml-4 text-blue-700' />
                    </div>
                  )}
                </div>

                {/* THUMBNAILS */}
                <div className='flex gap-4 mt-6 overflow-x-auto'>
                  {entity.image.map((item, index) => (
                    <img
                      key={index}
                      src={item}
                      alt={entity.title}
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover shadow-md ${currentImageIndex === index ? 'border-2 border-blue-500' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>

                {/* DETAILS */}
                <div className='mt-12'>
                  <hr className='my-10 border-gray-200' />

                  <div className='mb-10'>
                    <h2 className='text-2xl md:text-3xl font-bold mb-4'>
                      Listing Details
                    </h2>

                    <p className='text-gray-600 text-base md:text-lg leading-relaxed max-w-4xl'>
                      {entity?.description}
                    </p>

                    <div className='mt-6 bg-blue-100 text-blue-800 rounded-2xl px-6 py-4 flex items-start md:items-center gap-3 w-full md:w-[600px]'>
                      <ShieldCheck size={20} />
                      <p className='font-medium text-sm md:text-base'>
                        Safety Tip: Always meet in public campus locations
                        during daylight hours.
                      </p>
                    </div>
                  </div>

                  <hr className='my-10 border-gray-200' />

                  {/* VENDOR CARD */}

                  <div className='bg-white rounded-3xl shadow-lg p-6 md:p-9 flex flex-col md:flex-row md:justify-between md:items-center gap-6 w-full md:w-[900px]'>
                    <div className='flex items-center gap-6'>
                      <div className='w-14 h-14 md:w-16 md:h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl md:text-2xl font-bold'>
                        {entity.seller?.slice(0, 1)}
                      </div>

                      <div>
                        <p className='text-xl md:text-2xl font-bold'>Vendor</p>

                        <h3 className='text-2xl md:text-3xl font-bold'>
                          {entity.seller}
                        </h3>

                        <div className='flex flex-wrap gap-4 md:gap-6 text-gray-500 mt-2 text-sm md:text-base'>
                          <div className='flex items-center gap-2'>
                            <GraduationCap size={18} />
                            DEPARTMENT
                          </div>

                          <div className='flex items-center gap-2'>
                            <MapPin size={18} />
                            {entity.location}
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowProfile(true)}
                      className='bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-3 rounded-full text-base md:text-lg font-semibold transition w-full md:w-auto'>
                      View Vendor Profile
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}

              <div>
                <div className='bg-white rounded-3xl shadow-xl overflow-hidden w-full md:w-[500px]'>
                  <div className='bg-gradient-to-r from-gray-900 to-black text-white p-6 md:p-8'>
                    <h2 className='text-3xl md:text-4xl font-bold'>
                      {formatNaira(entity.price)}
                    </h2>

                    <p className='text-gray-300 mt-1'>Verified Listing Price</p>
                  </div>

                  <div className='p-6 md:p-8 space-y-6'>
                    <div className='flex gap-3'>
                      <Clock className='text-blue-500' />
                      <div>
                        <p className='font-semibold'>Expiration</p>
                        <p className='text-gray-500 text-sm'>Auto-expires in {calculateDaysRemaining(entity.createdAt, entity.listing_duration)} {calculateDaysRemaining(entity.createdAt, entity.listing_duration) == 1 ? 'day' : 'days'}</p>
                      </div>
                    </div>

                    <div className='flex gap-3'>
                      <Mail className='text-blue-500' />
                      <div>
                        <p className='font-semibold'>Secure Contact</p>
                        <p className='text-gray-500 text-sm'>
                          Verified email-only inquiry.
                        </p>
                      </div>
                    </div>

                    <button onClick={() => setShowVendor(true)} className='w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-full font-semibold transition'>
                      Contact Vendor
                    </button>

                    <div className='flex gap-3 bg-gray-100 p-4 rounded-xl text-sm text-gray-600'>
                      <Shield size={18} />
                      Clicking "Interested" sends an automated email to the
                      seller with your UI student contact info.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
