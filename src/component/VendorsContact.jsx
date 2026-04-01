'use client';

import { useSelector } from 'react-redux';
import { MapPin, Clock, X, BadgeCheck, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import ContactVendorModal from './ContactVendorModal';

export default function VendorsContact({ seller, onClose }) {
  const [activeModal, setActiveModal] = useState('vendor');

  if (!seller) return null;

  const { productItems } = useSelector((state) => state.product);

  const vendorListings = productItems.filter(
    (item) => item.seller === seller.seller
  );

  return (
    <>
      {activeModal === 'vendor' && (
        <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 md:p-0'>

          {/* MODAL */}
          <div className='bg-[#f6f8fc] w-full md:w-[900px] h-[90vh] md:h-[80vh] rounded-[20px] md:rounded-[30px] shadow-2xl flex flex-col relative'>

            <button
              onClick={onClose}
              className='absolute right-4 md:right-6 top-4 md:top-6 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow'
            >
              <X size={18} />
            </button>

            <div className='p-6 md:p-10 pb-4 md:pb-6'>

              <h2 className='text-xl md:text-2xl font-bold mb-6 md:mb-8'>
                Vendor Profile
              </h2>

              <div className='text-center'>

                <div className='w-16 h-16 md:w-20 md:h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold mx-auto'>
                  {seller.seller.slice(0, 1)}
                </div>

                <h3 className='text-2xl md:text-3xl font-bold mt-3 md:mt-4'>
                  {seller.seller}
                </h3>

                <div className='flex flex-wrap justify-center gap-3 md:gap-4 text-gray-500 mt-2 text-sm md:text-base'>

                  <div className='flex items-center gap-2'>
                    <BadgeCheck size={18} className='text-blue-600' />
                    VERIFIED UI STUDENT
                  </div>

                  <div className='flex items-center gap-2'>
                    <GraduationCap size={18} />
                    DEPARTMENT
                  </div>

                </div>
              </div>

              {/* INFO BOXES */}

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8'>

                <div className='border-2 border-dashed border-blue-300 rounded-2xl p-4 md:p-6'>
                  <h4 className='font-semibold mb-2'>About</h4>
                  <p className='text-gray-600 text-sm md:text-base'>
                    Reliable campus vendor with active listings.
                  </p>
                </div>

                <div className='border-2 border-dashed border-blue-300 rounded-2xl p-4 md:p-6'>
                  <h4 className='font-semibold mb-2'>Vendor Since</h4>
                  <p className='text-gray-600 text-sm md:text-base'>
                    Recently joined
                  </p>
                </div>

              </div>

            </div>

            {/* LISTINGS */}

            <div className='px-6 md:px-10 flex-1 overflow-y-auto'>

              <h3 className='text-lg md:text-xl font-bold mb-6'>
                Active Listings ({vendorListings.length})
              </h3>

              <div className='space-y-4 md:space-y-6'>

                {vendorListings.map((item) => (
                  <div
                    key={item.id}
                    className='border border-blue-200 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 md:items-center'
                  >

                    <img
                      src={item.image}
                      alt={item.title}
                      className='w-full md:w-28 h-40 md:h-28 object-cover rounded-lg shadow'
                    />

                    <div className='flex-1'>

                      <span className='bg-blue-100 text-blue-600 px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm'>
                        {item.category}
                      </span>

                      <h3 className='text-lg md:text-xl font-bold mt-2 md:mt-3'>
                        {item.title}
                      </h3>

                      <div className='flex flex-wrap gap-3 md:gap-6 text-gray-500 mt-2 text-sm md:text-base'>

                        <div className='flex items-center gap-2'>
                          <MapPin size={16} />
                          {item.location}
                        </div>

                        <div className='flex items-center gap-2'>
                          <Clock size={16} />
                          {item.time}
                        </div>

                      </div>

                      <p className='text-lg md:text-xl font-bold text-blue-600 mt-2 md:mt-3'>
                        ₦{item.price}
                      </p>

                    </div>

                  </div>
                ))}

              </div>
            </div>

            {/* BUTTON */}

            <div className='p-6 md:p-8 pt-4 bg-[#f6f8fc] border-t'>

              <button
                onClick={() => setActiveModal('contact')}
                className='w-full bg-blue-600 text-white py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:bg-blue-700'
              >
                Contact Vendor
              </button>

            </div>

          </div>
        </div>
      )}

      {activeModal === 'contact' && (
        <ContactVendorModal
          seller={seller.seller}
          onClose={onClose}
        />
      )}
    </>
  );
}