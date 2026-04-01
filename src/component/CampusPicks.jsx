'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useDispatch } from 'react-redux';
import { addProduct } from '@/redux/slice/productSlice';

const goodsCategories = [
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

const servicesCategories = ['All items', 'Tutor', 'Carpenter', 'Electrician'];

const items = [
  {
    id: 1,
    title: 'Intro to Algorithm',
    category: 'Textbooks',
    type: 'Goods',
    location: 'Mellanby Hall',
    time: '5 days left',
    price: '₦15,000',
    seller: 'ALEX_CSC',
    image: '/image/book.png',
  },
  {
    id: 2,
    title: 'HP Pavilion Laptop',
    category: 'Gadgets',
    type: 'Goods',
    location: 'Mellanby Hall',
    time: '5 days left',
    price: '₦200,000',
    seller: 'SARAH_TECH',
    image: '/image/laptop.png',
  },
  {
    id: 3,
    title: 'Calculus & Stats Tutorials',
    category: 'Tutor',
    type: 'Services',
    location: 'Tedder Hall',
    time: '3 days left',
    price: '₦2,000/hr',
    seller: 'DANIEL_MATH',
    image: '/image/tutoring.png',
  },
  {
    id: 4,
    title: 'Furniture Repairs',
    category: 'Carpenter',
    type: 'Services',
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
    type: 'Services',
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
    type: 'Goods',
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
    type: 'Goods',
    location: 'Mellanby Hall',
    time: '6 days left',
    price: '₦350,000',
    seller: 'SARAH_TECH',
    image: '/image/laptop.png',
  },
];

export default function CampusPicks() {
  const [activeType, setActiveType] = useState('Goods');
  const [activeCategory, setActiveCategory] = useState('All items');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addProduct(items));
  }, []);

  // useEffect(() => {
  //   setActiveCategory('All items');
  // }, [activeType]);

  const categories =
    activeType === 'Goods' ? goodsCategories : servicesCategories;

  const filteredItems = items.filter((item) => {
    const matchType = item.type === activeType;
    const matchCategory =
      activeCategory === 'All items' || item.category === activeCategory;
    return matchType && matchCategory;
  });

  return (
    <section className='w-full bg-white py-20'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6'>
        {/* Type Tabs */}
        <div className='mb-6'>
          <div className='flex w-fit rounded-full bg-gray-100 p-1'>
            {['Goods', 'Services'].map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition ${
                  activeType === type
                    ? 'bg-blue-200 text-gray-900'
                    : 'text-gray-500 hover:text-gray-800'
                }`}>
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className='mb-8 flex gap-2 overflow-x-auto sm:flex-wrap'>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === cat
                  ? 'bg-blue-200 text-gray-900'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Heading */}
        <h2 className='text-2xl font-bold text-gray-900'>Campus Picks</h2>
        <p className='mb-10 text-gray-500'>
          Verified listings from fellow students
        </p>

        {/* Grid */}
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className='overflow-hidden rounded-2xl bg-white shadow-md'>
              <Link href={`/product/${item.id}`}>
                <div className='relative h-64 w-full bg-gray-100'>
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className='object-contain'
                    />
                  )}
                </div>
                {console.log({ item })}

                {/* Content */}
                <div className='space-y-4 p-5'>
                  <h3 className='text-xl font-bold text-gray-900'>
                    {item.title}
                  </h3>

                  <span className='inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700'>
                    {item.category}
                  </span>

                  <div className='flex items-center gap-2 text-gray-600'>
                    📍 <span>{item.location}</span>
                  </div>

                  <div className='flex items-center gap-2 text-gray-600'>
                    ⏳ <span>{item.time}</span>
                  </div>

                  <p className='text-2xl font-bold text-blue-700'>
                    {item.price}
                  </p>

                  <hr />

                  <div className='flex items-center gap-3'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700'>
                      {item.seller.charAt(0)}
                    </div>
                    <span className='font-semibold text-gray-800'>
                      {item.seller}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className='mt-14 flex justify-center'>
          <button className='rounded-full bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700'>
            View More Listings
          </button>
        </div>
      </div>
    </section>
  );
}
