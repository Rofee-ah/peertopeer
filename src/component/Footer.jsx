import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-white'>
      <div className='mx-auto max-w-7xl px-6 py-12'>
        
        <div className='flex flex-col items-center gap-3'>
          <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-[#0053c6] text-3xl font-bold text-white'>
            U
          </div>
          <h2 className='text-lg font-semibold text-gray-900'>UI Exchange</h2>
        </div>

        {/* Divider */}
        <hr className='my-10 border-gray-200' />

        {/* Bottom section */}
        <div className='flex flex-col items-center justify-between gap-6 text-sm text-gray-500 md:flex-row'>
          {/* Links */}
          <div className='flex gap-6'>
            <a href='#' className='hover:text-gray-900'>
              Privacy
            </a>
            <a href='#' className='hover:text-gray-900'>
              Terms
            </a>
            <a href='#' className='hover:text-gray-900'>
              Cookies
            </a>
          </div>

          {/* Copyright */}
          <p className='text-center md:text-right'>
            © 2025 UI Student Marketplace. For educational purposes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
