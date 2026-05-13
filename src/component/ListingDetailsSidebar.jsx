import React, { useEffect, useState } from 'react';
import { X, Edit2, CheckCircle, Trash2 } from 'lucide-react';
import { toast } from "react-toastify";

import { formatNaira } from '@/lib/utils';
import DeleteListingModal from './DeleteListingModal';
import { EditListingModal } from './EditListingModal';
import { MarkListingSold } from './MarkListingSold';

const ListingDetailsSidebar = ({ isOpen, onClose, listing }) => {
  const [deleteListing, setDeleteListing] = useState(null);
  const [editListing, setEditListing] = useState(null);
  const [markListing, setMarkListing] = useState(null);
  // Prevent scrolling on body when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);


  const updateListing = async (entity) => {
    const response = await fetch("/api/publish-listing", {
      method: "PUT",
      body: JSON.stringify(entity),
    });
    const initData = await response.json();
    if (!initData.success) {
      toast.error(initData.message);
      return;
    }
    toast.success(initData.message);
    setEditListing(null);
  };

  const handleDeleteListing = async (entity) => {
    const response = await fetch("/api/publish-listing", {
      method: "DELETE",
      body: JSON.stringify(entity),
    });
    const initData = await response.json();
    if (!initData.success) {
      toast.error(initData.message);
      return;
    }
    toast.success(initData.message);
    setDeleteListing(null);
  };

  if (!isOpen || !listing) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-[100] transition-opacity backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed inset-y-0 right-0 w-full lg:w-[600px] sm:w-[450px] md:w-[500px] bg-white shadow-2xl z-[101] overflow-y-auto transform transition-transform duration-300 flex flex-col ">
        <div className="p-8 flex-1">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Listing Details</h2>
              <p className="text-sm text-gray-500 mt-1">{listing._id ? `L-${listing._id.toString().substring(0, 5).toUpperCase()}` : 'L-002'}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 border border-gray-100 rounded-full hover:bg-gray-50 text-gray-500 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Images */}
          <div className="flex gap-4 overflow-x-auto mb-8 pb-2 hide-scrollbar">
            {listing?.image?.map((uri, index) => (
              <div key={index} className="w-48 h-48 flex-shrink-0 bg-[#f8f9fa] rounded-3xl overflow-hidden relative border border-gray-50 p-4">
                <img src={uri} alt={listing.title} className="w-full h-full object-contain mix-blend-multiply" />
              </div>
            ))}
          </div>

          {/* Details Box */}
          <div className="border border-dashed border-gray-300 rounded-[2rem] p-8 mb-8">
            <div className="mb-8">
              <h4 className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wider">Title</h4>
              <p className="text-base font-bold text-gray-900">{listing.title || 'N/A'}</p>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wider">Category</h4>
                <p className="text-sm font-bold text-gray-900">{listing.category || 'N/A'}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wider">Sub-category</h4>
                <p className="text-sm font-bold text-gray-900">{listing.sub_category || 'N/A'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wider">Price</h4>
                <p className="text-sm font-bold text-gray-900">{formatNaira(listing.price) || 'N/A'}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wider">Listing Duration</h4>
                <p className="text-sm font-bold text-gray-900">{listing.listing_duration + ' ' + 'days' || '30 Days'}</p>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wider">Description</h4>
              <p className="text-sm font-bold text-gray-900">{listing.description || 'No description provided for this listing.'}</p>
            </div>
          </div>

          {/* Bottom Badges */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`rounded-3xl p-6 text-center ${(listing.status || 'active') === 'active' ? 'bg-[#e6f0ff] text-blue-600' : 'bg-[#e6ffe6] text-green-600'
              }`}>
              <h4 className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wider">Status</h4>
              <p className="text-2xl font-bold">{listing.status || 'Active'}</p>
            </div>
            <div className="bg-[#e6ffff] rounded-3xl p-6 text-center text-teal-600">
              <h4 className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wider">Views</h4>
              <p className="text-2xl font-bold">{listing.views || '0'}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-8 border-t border-gray-100 flex items-center gap-3">
            <button onClick={() => setEditListing(listing)} className="flex-1 py-3 px-4 bg-[#0056D2] hover:bg-blue-700 text-white rounded-full text-sm font-bold transition-colors flex items-center justify-center gap-2">
              <Edit2 size={16} />
              Edit
            </button>
            {listing.status !== 'sold' && (
              <button onClick={() => setMarkListing(listing)} className="flex-1 py-3 px-4 border border-gray-200 bg-white text-green-600 hover:bg-green-50 rounded-full text-sm font-bold transition-colors flex items-center justify-center gap-2">
                <CheckCircle size={16} />
                Mark as sold
              </button>
            )}
            <button onClick={() => setDeleteListing(listing)} className="flex-1 py-3 px-4 border border-gray-200 bg-white text-red-500 hover:bg-red-50 rounded-full text-sm font-bold transition-colors flex items-center justify-center gap-2">
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      </div>

      <DeleteListingModal
        isOpen={!!deleteListing}
        onClose={() => setDeleteListing(null)}
        listing={deleteListing}
        onDelete={(listing) => {
          handleDeleteListing(listing)
        }}
      />

      <EditListingModal
        isOpen={!!editListing}
        onClose={() => setEditListing(null)}
        listing={editListing}
        onSave={(entity) => {
          updateListing(entity)
        }}
      />

      <MarkListingSold
        isOpen={!!markListing}
        onClose={() => setMarkListing(null)}
        listing={markListing}
        onMarkAsSold={(listing) => {
          updateListing(listing)
        }}
      />
    </>
  );
};

export default ListingDetailsSidebar;
