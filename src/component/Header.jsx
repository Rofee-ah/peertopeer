
'use client'
import React from 'react';
import { useState } from 'react';

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#f9fbff]">
      <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-4">
        <div className="mx-auto max-w-7xl rounded-full bg-white shadow-xl px-5 md:px-8 py-4 md:py-7 flex items-center justify-between">

          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-[#0053c6] flex items-center justify-center text-white font-bold text-2xl md:text-3xl">
              U
            </div>
            <span className="text-lg md:text-xl font-semibold text-gray-900">
              UI Exchange
            </span>
          </div>

          {/* Center: Nav (Desktop only) */}
          <nav className="hidden md:flex items-center gap-10 text-gray-800 font-medium">
            <a href="#" className="hover:text-blue-600 transition">
              Browse Marketplace
            </a>
            <a href="#" className="hover:text-blue-600 transition">
              Sell on UI Exchange
            </a>
          </nav>

          {/* Right: Auth (Desktop only) */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-gray-900 font-medium hover:text-blue-600 transition">
              Login
            </a>
            <button className="rounded-full bg-blue-600 px-6 py-2.5 text-white font-semibold hover:bg-blue-700 transition">
              Sign up
            </button>
          </div>

          {/* Hamburger (Mobile only) */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-[#0053c6]"
          >
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h20M4 14h20M4 21h20" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Top Dropdown */}
      <div
        className={`fixed top-0 left-0 w-full z-50 px-4 pt-24 transition-all duration-200 ease-out
        ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"}`}
      >
        <div className="bg-white rounded-[32px] shadow-2xl px-6 py-8 relative md:hidden">

          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute -top-0 left-6 h-12 w-12 rounded-full bg-white shadow flex items-center justify-center text-blue-600 text-xl"
          >
            ✕
          </button>

          {/* Links */}
          <nav className="space-y-8 text-gray-900 font-medium text-lg mt-10">
            <a href="#" className="block">Browse Listings</a>
            <a href="#" className="block">Sell on UI Exchange</a>
          </nav>

          {/* Auth */}
          <div className="mt-12 flex items-center gap-6">
            <a href="#" className="text-gray-900 font-medium text-lg">
              Login
            </a>
            <button className="rounded-full bg-blue-600 px-8 py-3 text-white font-semibold text-lg">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
