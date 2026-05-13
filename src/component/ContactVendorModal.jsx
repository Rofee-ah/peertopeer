'use client';

import { X, User, Mail, Send, CheckCircle, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

import { validateText, validateEmail } from '@/lib/utils';
import { toast } from 'react-toastify';

const variables = {
  listing: '',
  name: '',
  email: '',
  message: ''
}

export default function ContactVendorModal({ seller, onClose, isContact }) {
  const [form, setForm] = useState(variables);
  const [errors, setErrors] = useState(variables);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    if (!isContact && seller?.email) {
      const getVendorListing = async () => {
        const response = await fetch(`/api/get-listing`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
        const { data } = await response.json();
        const filter = data?.filter((item) => item.email === seller?.email);
        setFilteredData(filter);
      }
      getVendorListing();
    } else {
      setForm({ ...form, listing: seller?.title });
    }
  }, [isContact])

  const handleChange = (value, attr) => {
    const formData = { ...form, [attr]: value };
    setForm(formData)
  };

  const validateFields = (fields) => ({
    listing: validateText(fields.listing || "", "Listing"),
    name: validateText(fields.name || "", "Name"),
    email: validateEmail(fields.email || "", "Email"),
    message: validateText(fields.message || "", "Message"),
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateFields(form))
  };

  useEffect(() => {
    if (errors && Object.values(errors).every(err => err === null)) {
      const sendDetails = async () => {
        setLoading(true)
        const response = await fetch(`/api/send-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            listing: form?.listing,
            name: form?.name,
            email: form?.email,
            message: form?.message,
            seller_email: seller?.email,
            seller_name: seller?.seller
          }),
        });
        const data = await response.json();

        if (data.success) {
          toast.success(data.message)
          setForm(variables)
          setErrors(variables)
          onClose()
          setLoading(false)
          return
        }
        toast.error(data.message)
      }
      sendDetails()
    }
  }, [errors])


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
          Contact {seller?.seller}
        </h2>

        <p className='text-gray-500 mb-6 md:mb-8 text-sm md:text-base'>
          Send a message to {seller?.seller} about this listing. They’ll receive an
          email with your inquiry.
        </p>

        <form onSubmit={handleSubmit} className='space-y-5 md:space-y-6'>
          {/* SELECT LISTING */}
          {isContact ? (
            <>
              <div className='bg-blue-100 p-4 rounded-xl'>
                <h3 className='text-sm mb-2'>Regarding</h3>
                <div className='flex items-center gap-3'>
                  <img src={seller?.image[0]} alt={seller?.title} className='w-10 h-10 rounded-xl border-2 border-gray-400' />
                  <p className='text-lg font-bold text-[#090A0B]'>{seller?.title}</p>
                </div>
              </div>
            </>
          ) : (
            <div>
              <label className='font-semibold'>
                Select Listing <span className='text-red-500'>*</span>
              </label>

              <select
                name='listing'
                value={form?.listing || ''}
                onChange={(e) => handleChange(e.target.value, 'listing')}
                className='mt-2 w-full bg-white rounded-xl border border-gray-200 p-3 md:p-4 shadow-sm focus:outline-none'>
                <option value=''>Choose a listing...</option>
                {filteredData?.map((item, index) => (
                  <option key={index} value={item.title}>{item.title}</option>
                ))}
              </select>
              {errors?.listing && (
                <p className='text-red-500 text-sm'>{errors.listing}</p>
              )}
            </div>
          )}

          {/* NAME */}
          <div>
            <label className='font-semibold'>Your Name</label>

            <div className='mt-2 flex items-center bg-white border border-gray-200 rounded-xl px-3 md:px-4 shadow-sm'>
              <User size={18} className='text-gray-400' />
              <input
                type='text'
                name='name'
                placeholder='Your full name'
                value={form?.name || ''}
                onChange={(e) => handleChange(e.target.value, 'name')}
                className='w-full p-3 md:p-4 outline-none bg-transparent'
              />
            </div>
            {errors?.name && (
              <p className='text-red-500 text-sm'>{errors.name}</p>
            )}
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
                value={form?.email || ''}
                onChange={(e) => handleChange(e.target.value, 'email')}
                className='w-full p-3 md:p-4 outline-none bg-transparent'
              />
            </div>
            {errors?.email && (
              <p className='text-red-500 text-sm'>{errors.email}</p>
            )}

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
              value={form?.message || ''}
              onChange={(e) => handleChange(e.target.value, 'message')}
              placeholder='Tell them about your interest in this listing...'
              rows={4}
              className='mt-2 w-full bg-white border border-gray-200 rounded-xl p-3 md:p-4 shadow-sm focus:outline-none'
            />
            {errors?.message && (
              <p className='text-red-500 text-sm'>{errors.message}</p>
            )}
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
              onClick={handleSubmit}
              disabled={loading}
              className='flex items-center justify-center gap-2 w-full md:w-auto bg-blue-700 text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-semibold hover:bg-blue-800'>
              {loading ? <Loader2 size={18} className='animate-spin' /> : (
                <>
                  Send Inquiry
                  <Send size={18} />
                </>
              )}

            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
