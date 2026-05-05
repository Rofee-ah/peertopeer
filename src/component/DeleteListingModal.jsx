import React, { useEffect } from 'react';
import { X, AlertTriangle, Trash2 } from 'lucide-react';

const DeleteListingModal = ({ isOpen, onClose, onDelete, listing }) => {
  // Prevent scrolling on body when modal is open
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

  if (!isOpen || !listing) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/40 z-[200] transition-opacity backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div 
          className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 sm:p-8 z-[201] transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Delete Listing?</h2>
            <button 
              onClick={onClose}
              className="p-2 border border-gray-100 rounded-full hover:bg-gray-50 text-gray-500 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="flex flex-col items-center text-center mb-8 mt-2">
            <div className="w-24 h-24 bg-[#fff1f2] rounded-full flex items-center justify-center mb-6">
              <AlertTriangle size={40} className="text-red-500" strokeWidth={2} />
            </div>
            
            <p className="text-gray-500 text-[15px] leading-relaxed max-w-[300px]">
              This action cannot be undone. The listing <span className="font-bold text-gray-900">"{listing.title}"</span> will be permanently deleted.
            </p>
          </div>

          {/* Footer Actions */}
          <div className="flex gap-4 w-full">
            <button 
              onClick={onClose}
              className="flex-1 py-3.5 px-4 border border-gray-200 rounded-full text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                if (onDelete) onDelete(listing);
                else onClose(); // Fallback if no delete handler provided yet
              }}
              className="flex-1 py-3.5 px-4 bg-red-600 text-white rounded-full text-sm font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteListingModal;
