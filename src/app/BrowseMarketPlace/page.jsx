'use client';

import Image from 'next/image';
import { Search, SlidersHorizontal, MapPin, Clock } from 'lucide-react';
import Header from '@/component/Header';

const categories = [
  'All items',
  'Textbooks',
  'Gadgets',
  'Electronics',
  'Furniture',
  'Clothing',
  'Sports & Fitness',
  'Past Questions',
  'School Supplies',
];

const items = [
  {
    id: 1,
    title: 'Intro to Algorithms',
    category: 'TEXTBOOKS',
    location: 'Mellanby Hall',
    time: '5 days left',
    price: '₦15,000',
    seller: 'ALEX CHEN',
    image: '/image/book.png',
  },
  {
    id: 2,
    title: 'HP Pavilion Laptop - 16GB RAM',
    category: 'GADGETS',
    location: 'Mellanby Hall',
    time: '5 days left',
    price: '₦200,000',
    seller: 'SARAH TECH',
    image: '/image/laptop.png',
  },
  {
    id: 3,
    title: 'Calculus & Stats Private Tutorials',
    category: 'TUTORING',
    location: 'Mellanby Hall',
    time: '5 days left',
    price: '₦2,000/hr',
    seller: 'DANIEL MATH',
    image: '/image/tutoring.png',
  },
  {
    id: 4,
    title: 'Furniture Repairs',
    category: 'Carpenter',
    location: 'Awo Hall',
    time: '2 days left',
    price: '₦5,000/job',
    seller: 'IB_CARPENTER',
    image: '/image/tutoring.png',
  },
  {
    id: 5,
    title: 'Electrical Installations',
    category: 'Electrician',
    location: 'Queen Hall',
    time: '1 day left',
    price: '₦4,000/job',
    seller: 'UI_ELECTRIC',
    image: '/image/tutoring.png',
  },
  {
    id: 6,
    title: 'Chemistry Textbook',
    category: 'Textbooks',
    location: 'Mellanby Hall',
    time: '4 days left',
    price: '₦10,000',
    seller: 'ALEX_CSC',
    image: '/image/book.png',
  },
  {
    id: 7,
    title: 'MacBook Pro',
    category: 'Gadgets',
    location: 'Mellanby Hall',
    time: '6 days left',
    price: '₦350,000',
    seller: 'SARAH_TECH',
    image: '/image/laptop.png',
  },
];

export default function Marketplace() {
  return (
    <>
      {/* ✅ FIXED BLUR HEADER */}
      <div className='fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/60 border-b border-gray-200'>
        {/* optional glass gradient */}
        <div className='absolute inset-0 bg-gradient-to-b from-white/70 to-white/30 pointer-events-none' />
        <Header />
      </div>

      {/* ✅ MAIN CONTENT */}
      <div className='min-h-screen bg-[#f6f8fc]/90 px-4 md:px-10 pt-32 pb-10'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
          <div>
            <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>
              UI Marketplace
            </h1>
            <p className='text-gray-500 text-sm md:text-base'>
              Safe campus trading for students, by students.
            </p>
          </div>

          <div className='flex items-center gap-3 w-full md:w-[500px]'>
            <div className='flex items-center bg-white rounded-full px-4 py-3 w-full shadow-sm'>
              <Search className='w-5 h-5 text-gray-400' />
              <input
                type='text'
                placeholder='Search for items or services'
                className='ml-2 w-full outline-none text-sm bg-transparent'
              />
            </div>

            <button className='bg-white p-3 rounded-full shadow-sm'>
              <SlidersHorizontal className='w-5 h-5 text-gray-600' />
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className='flex gap-3 mt-8 overflow-x-auto'>
          <button className='px-6 py-2 rounded-full bg-blue-200 font-medium'>
            Goods
          </button>
          <button className='px-6 py-2 rounded-full bg-gray-200 text-gray-600'>
            Services
          </button>
        </div>

        {/* CATEGORY */}
        <div className='flex gap-3 mt-5 overflow-x-auto'>
          {categories.map((cat, index) => (
            <button
              key={index}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm ${
                index === 0
                  ? 'bg-blue-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className='grid gap-8 mt-10 sm:grid-cols-2 lg:grid-cols-3'>
          {items.map((item) => (
            <div
              key={item.id}
              className='bg-white rounded-2xl shadow-sm overflow-hidden'>
              <div className='relative h-48 md:h-56 bg-gray-100'>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className='object-contain'
                />
              </div>

              <div className='p-5 space-y-4'>
                <h3 className='text-lg md:text-xl font-bold text-gray-900'>
                  {item.title}
                </h3>

                <span className='inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold'>
                  {item.category}
                </span>

                <div className='flex items-center gap-2 text-gray-500 text-sm'>
                  <MapPin className='w-4 h-4' />
                  {item.location}
                </div>

                <div className='flex items-center gap-2 text-gray-500 text-sm'>
                  <Clock className='w-4 h-4' />
                  {item.time}
                </div>

                <p className='text-xl md:text-2xl font-bold text-blue-700'>
                  {item.price}
                </p>

                <hr />

                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold'>
                    {item.seller.charAt(0)}
                  </div>
                  <span className='font-medium text-gray-800 text-sm'>
                    {item.seller}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* VIEW MORE */}
        <div className='mt-14 flex justify-center'>
          <button className='rounded-full bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 transition'>
            View More Listings
          </button>
        </div>

        {/* FOOTER */}
        <footer className='mt-20 text-center'>
          <div className='flex flex-col items-center gap-3'>
            <div className='w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold'>
              U
            </div>
            <h3 className='text-lg font-semibold text-gray-900'>UI Exchange</h3>
          </div>

          <hr className='my-8 border-gray-200' />

          <div className='flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 gap-4'>
            <div className='flex gap-6'>
              <span className='cursor-pointer hover:text-gray-800'>
                PRIVACY
              </span>
              <span className='cursor-pointer hover:text-gray-800'>TERMS</span>
              <span className='cursor-pointer hover:text-gray-800'>
                COOKIES
              </span>
            </div>

            <p>© 2025 UI STUDENT MARKETPLACE. FOR EDUCATIONAL PURPOSES.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
