import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Plus, MoreHorizontal, Eye, Edit2, CheckCircle, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useSelector } from 'react-redux';

const listings = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100&h=100&fit=crop', // Headphone image
    title: 'Sony WH-1000XM5 Wireless...',
    category: 'Goods • Gadgets',
    price: '₦25,000',
    status: 'Active',
    views: 0,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=100&h=100&fit=crop', // Tomatoes image
    title: 'Fresh Vegetable Tomatoes',
    category: 'Goods • Fresh Foods',
    price: '₦4,000',
    status: 'Sold',
    views: 12,
  }
];

export const ProductListings = () => {
  const {vendor} = useSelector((state) => state.vendor);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (id, e) => {
    e.stopPropagation();
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  console.log({vendor})
  return (
    <div className="bg-white rounded-[2rem] p-4 md:p-8 w-full">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Listings</h2>
        <p className="text-sm text-gray-500 mt-1">Browse items offered as a vendor on UI Exchange.</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search listings..." 
              className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-full w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 text-sm"
            />
          </div>
          <button className="flex items-center justify-between gap-2 px-5 py-2.5 border border-gray-200 rounded-full bg-white text-sm text-gray-700 hover:bg-gray-50">
            All Listings
            <ChevronDown size={16} className="text-gray-500" />
          </button>
        </div>
        <button className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors w-full sm:w-auto justify-center">
          <Plus size={18} />
          Create Listing
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-[#f8f9fa] text-gray-800 text-sm">
              <th className="py-4 px-5 font-semibold rounded-tl-2xl rounded-bl-2xl">Listing Details</th>
              <th className="py-4 px-5 font-semibold">Price</th>
              <th className="py-4 px-5 font-semibold text-center">Status</th>
              <th className="py-4 px-5 font-semibold text-center">Views</th>
              <th className="py-4 px-5 font-semibold text-center rounded-tr-2xl rounded-br-2xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendor?.listing.map((item, index) => (
              <tr key={item._id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                <td className="py-5 px-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden relative">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                    </div>
                  </div>
                </td>
                <td className="py-5 px-5 text-sm font-bold text-gray-900">
                  {item.price}
                </td>
                <td className="py-5 px-5 text-center">
                  <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold ${
                    item.status === 'Active' ? 'bg-[#e6f0ff] text-blue-600' : 'bg-[#e6ffe6] text-green-600'
                  }`}>
                    {item.status || 'N/A'}
                  </span>
                </td>
                <td className="py-5 px-5 text-center">
                  <span className="inline-flex items-center justify-center min-w-[2.5rem] px-2.5 py-1.5 rounded-full text-xs font-semibold bg-[#e6ffff] text-teal-600">
                    {item.views || 'N/A'}
                  </span>
                </td>
                <td className="py-5 px-5 text-center relative">
                  <button 
                    onClick={(e) => toggleDropdown(item._id, e)}
                    className="p-2 border border-gray-200 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors inline-flex items-center justify-center focus:outline-none"
                  >
                    <MoreHorizontal size={18} />
                  </button>
                  
                  {openDropdownId === item._id && (
                    <div 
                      ref={dropdownRef}
                      className="absolute right-5 top-12 mt-2 w-40 bg-white rounded-xl shadow-lg shadow-gray-200/50 border border-gray-100 py-2 z-50 text-left"
                    >
                      <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                        <Eye size={16} className="text-gray-500" />
                        View
                      </button>
                      <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                        <Edit2 size={16} className="text-gray-500" />
                        Edit
                      </button>
                      <button className="w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50 flex items-center gap-3 transition-colors">
                        <CheckCircle size={16} />
                        Mark as sold
                      </button>
                      <button className="w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-3 transition-colors">
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100">
        <p className="text-xs text-gray-400">Showing 1-{vendor?.listing.length} of {vendor?.listing.length}</p>
      </div>
    </div>
  );
};

export default ProductListings;
