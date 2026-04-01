'use client';

import { X, User, Mail, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function ContactVendorModal({ seller = 'ALEX CHEN', onClose }) {
  const [form, setForm] = useState({
    listing: '',
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 md:p-0'>
      {/* MODAL */}
      <div className='bg-[#f6f8fc] w-full md:w-[720px] max-h-[95vh] md:max-h-none overflow-y-auto rounded-[20px] md:rounded-[30px] shadow-2xl p-6 md:p-10 relative'>
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className='absolute top-4 md:top-6 right-4 md:right-6 w-10 md:w-12 h-10 md:h-12 bg-white rounded-full flex items-center justify-center shadow'>
          <X size={20} />
        </button>

        {/* TITLE */}
        <h2 className='text-2xl md:text-3xl font-bold mb-4'>
          Contact {seller}
        </h2>

        <p className='text-gray-500 mb-6 md:mb-8 text-sm md:text-base'>
          Send a message to {seller} about this listing. They’ll receive an
          email with your inquiry.
        </p>

        <form onSubmit={handleSubmit} className='space-y-5 md:space-y-6'>
          {/* SELECT LISTING */}
          <div>
            <label className='font-semibold'>
              Select Listing <span className='text-red-500'>*</span>
            </label>

            <select
              name='listing'
              value={form.listing}
              onChange={handleChange}
              className='mt-2 w-full bg-white rounded-xl border border-gray-200 p-3 md:p-4 shadow-sm focus:outline-none'>
              <option value=''>Choose a listing...</option>
              <option value='MacBook'>MacBook Pro</option>
              <option value='Laptop'>HP Laptop</option>
              <option value='Phone'>iPhone 13</option>
            </select>
          </div>

          {/* NAME */}
          <div>
            <label className='font-semibold'>Your Name</label>

            <div className='mt-2 flex items-center bg-white border border-gray-200 rounded-xl px-3 md:px-4 shadow-sm'>
              <User size={18} className='text-gray-400' />
              <input
                type='text'
                name='name'
                placeholder='Your full name'
                value={form.name}
                onChange={handleChange}
                className='w-full p-3 md:p-4 outline-none bg-transparent'
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className='font-semibold'>Your Email</label>

            <div className='mt-2 flex items-center bg-white border border-gray-200 rounded-xl px-3 md:px-4 shadow-sm'>
              <Mail size={18} className='text-gray-400' />
              <input
                type='email'
                name='email'
                placeholder='name@stu.ui.edu.ng'
                value={form.email}
                onChange={handleChange}
                className='w-full p-3 md:p-4 outline-none bg-transparent'
              />
            </div>

            <div className='flex items-center gap-2 text-green-600 mt-2 text-xs md:text-sm'>
              <CheckCircle size={18} />
              Accepted emails: @stu.ui.edu.ng or @dlc.ui.edu.ng
            </div>
          </div>

          {/* MESSAGE */}
          <div>
            <label className='font-semibold'>Your Message</label>

            <textarea
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='Tell them about your interest in this listing...'
              rows={4}
              className='mt-2 w-full bg-white border border-gray-200 rounded-xl p-3 md:p-4 shadow-sm focus:outline-none'
            />
          </div>

          {/* BUTTONS */}
          <div className='flex flex-col md:flex-row gap-4 md:gap-0 md:justify-between pt-6 border-t'>
            <button
              type='button'
              onClick={onClose}
              className='w-full md:w-auto px-8 md:px-10 py-3 md:py-4 rounded-full border border-gray-300 font-medium hover:bg-gray-100'>
              Cancel
            </button>

            <button
              type='submit'
              className='flex items-center justify-center gap-2 w-full md:w-auto bg-blue-700 text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-semibold hover:bg-blue-800'>
              Send Inquiry
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
