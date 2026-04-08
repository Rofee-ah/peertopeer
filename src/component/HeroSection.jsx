"use client";
import React, { useEffect } from "react";
import { removeAccount } from "@/redux/slice/RegisterSlice";
import { useDispatch } from "react-redux";
import { removeUser } from "@/redux/slice/UserSlice";

const HeroSection = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeAccount());
    // dispatch(removeUser());
  }, []);

  return (
    <div>
      <section className="relative w-full bg-[#fafbfc] md:pt-80 pt-40 pb-28 overflow-hidden">
        <div className="absolute" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm  text-sm font-medium text-gray-700 mb-6">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-600">
              ✓
            </span>
            Verified Marketplace for UI Students
          </div>

          {/* Heading */}
          <h1 className=" text-4xl md:text-8xl  font-extrabold tracking-tight text-gray-900 mb-6">
            Campus trade,{" "}
            <span className="text-blue-600 italic">simplified.</span>
          </h1>

          {/* Subtext */}
          <p className="max-w-2xl mx-auto text-gray-600 text-sm mb-10">
            Buy, sell, and trade safely within the University of Ibadan
            community. Exclusive access for institutional email holders.
          </p>

          {/* Search Bar */}
          <div></div>
          <div className="sm:mx-auto sm:max-w-2xl flex md:p-5 lg:w-6xl  items-center bg-white rounded-full shadow-md border-white  px-4 py-2 gap-3">
            <span className="text-gray-400" size={20} />
            <input
              type="text"
              placeholder="What do you need help finding?"
              className="hidden md:flex flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
            />

            <input
              type="text"
              placeholder="What do you need help..."
              className="flex md:hidden flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
            />
            <div className="flex justify-center">
              {/* Outer white pill */}

              {/* Blue button */}
              <button
                className="
            bg-blue-600 
            text-white 
            font-semibold 
            rounded-full 
            px-6 
            py-4 
            md:px-10 
            md:py-4 
            transition 
            hover:bg-blue-700
          "
              >
                {/* Mobile text */}
                <span className="block md:hidden">Explore...</span>

                {/* Desktop text */}
                <span className="hidden md:block">Explore Marketplace</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
