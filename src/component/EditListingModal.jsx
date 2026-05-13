import React, { useEffect, useState } from 'react';
import { X, Save, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import { validateText, categories } from '@/lib/utils';

export const EditListingModal = ({ isOpen, onClose, listing, onSave }) => {
    const [formData, setFormData] = useState();
    const [errors, setErrors] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [image, setImage] = useState();
    const [savingImage, setSavingImage] = useState(false);
    const [isSaving, setIsSaving] = useState(false);


    useEffect(() => {
        if (listing) {
            setFormData(listing)
        }
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleFile = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
        }
    };

    const handleChange = (val, attr) => {
        const data = { ...formData };
        data[attr] = val;
        setFormData(data);
    };

    const validateFields = (data) => ({
        title: validateText(data.title || '', 'Title', 3),
        description: validateText(data.description || '', 'Description', 20),
        price: validateText(data.price || '', 'Price', 1),
        category: validateText(data.category || '', 'Category', 3),
        sub_category: validateText(data.sub_category || '', 'Sub category', 3),
        listing_duration: validateText(data.listing_duration || '', 'Listing duration', 3),
        image: data.image?.length > 0 ? null : 'Image is required'
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        setErrors(validateFields(formData))
    }

    const transformImageUrl = (url, width, height) => {
        return url.replace("/upload/", `/upload/w_${width},h_${height}/`);
    };

    useEffect(() => {
        if (!image) return;

        const formData = new FormData();
        formData.append("file", image);
        formData.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        );
        formData.append(
            "cloud_name",
            process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        );
        const saveImage = async () => {
            try {
                setSavingImage(true);

                const uploadResponse = await fetch(
                    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                    {
                        method: "POST",
                        body: formData,
                    },
                );
                if (!uploadResponse.ok) {
                    toast.error("Failed to upload image, Try again");
                }
                const data = await uploadResponse.json();
                const transformUrl = transformImageUrl(data.secure_url, 728, 666);
                setFormData((prev) => ({ ...prev, image: [...(prev.image || []), transformUrl] }));
            } catch (error) {
                console.error(error);
            } finally {
                setSavingImage(false);
                setImage(undefined)
            }
        };
        saveImage();
    }, [image]);

    useEffect(() => {
        if (isSubmitting && Object.values(errors).every(err => err === null)) {
            setIsSaving(true)
            const saveUpdate = async () => {
                try {
                    await onSave(formData)
                } catch (error) {
                    toast.error('Something went wrong, please try again')
                } finally {
                    setIsSubmitting(false)
                    setIsSaving(false)
                }
            }
            saveUpdate()
        }
    }, [isSubmitting, errors, formData])

    if (!isOpen || !listing) return null;

    const handleRemoveImage = (index) => {
        const updatedImages = [...formData.image];
        updatedImages.splice(index, 1);
        setFormData({ ...formData, image: updatedImages });
    };
    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/40 z-[200] transition-opacity backdrop-blur-sm flex items-center justify-center p-4"
                onClick={onClose}
            >
                {/* Modal */}
                <div
                    className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 sm:p-8 z-[201] transform transition-all lg:min-w-[800px]"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Edit {listing?.title} Listing?</h2>
                        <button
                            onClick={onClose}
                            className="p-2 border border-gray-100 rounded-full hover:bg-gray-50 text-gray-500 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className='grid grid-cols-2 gap-6'>
                        {/* title */}
                        <div className="">
                            <label className="block font-medium mb-2">
                                Listing Title <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="text"
                                value={formData?.title || ""}
                                onChange={(e) => handleChange(e.target.value, "title")}
                                placeholder="e.g CLRS Algorithms Textbook"
                                className="w-full bg-[#f7f8fb] rounded-xl px-5 py-4 outline-none shadow-sm"
                            />
                            {errors && errors?.title && (
                                <div className="flex items-center gap-2 text-sm text-red-500 mt-2">
                                    <span>{errors?.title}</span>
                                </div>
                            )}
                        </div>
                        {/* category */}
                        <div>
                            <label className="block font-medium mb-2">
                                Category <span className="text-red-500">*</span>
                            </label>

                            <select
                                value={formData?.category}
                                onChange={(e) => handleChange(e.target.value, "category")}
                                className="w-full bg-[#f7f8fb] rounded-xl px-5 py-4 outline-none shadow-sm"
                            >
                                <option value="">Select...</option>
                                {Object.keys(categories).map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            {errors && errors?.category && (
                                <div className="flex items-center gap-2 text-sm text-red-500 mt-2">
                                    <span>{errors?.category}</span>
                                </div>
                            )}
                        </div>
                        {/* sub-category */}
                        <div>
                            <label className="block font-medium mb-2">
                                Sub-category <span className="text-red-500">*</span>
                            </label>

                            <select
                                value={formData?.sub_category}
                                onChange={(e) => handleChange(e.target.value, "sub_category")}
                                className="w-full bg-[#f7f8fb] rounded-xl px-5 py-4 outline-none shadow-sm"
                            >
                                <option disabled value=''>Select...</option>
                                {categories[formData?.category || 'Goods'].map((subCategory) => (
                                    <option key={subCategory} value={subCategory}>
                                        {subCategory}
                                    </option>

                                ))}

                            </select>
                            {errors && errors?.sub_category && (
                                <div className="flex items-center gap-2 text-sm text-red-500 mt-2">
                                    <span>{errors?.sub_category}</span>
                                </div>
                            )}
                        </div>
                        {/* Price */}
                        <div className="">
                            <label className="block font-medium mb-2">
                                Price (₦) <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="text"
                                value={formData?.price || ''}
                                onChange={(e) => handleChange(e.target.value, "price")}
                                placeholder="0.00"
                                className="w-full bg-[#f7f8fb] rounded-xl px-5 py-4 outline-none shadow-sm"
                            />
                            {errors && errors?.price && (
                                <div className="flex items-center gap-2 text-sm text-red-500 mt-2">
                                    <span>{errors?.price}</span>
                                </div>
                            )}
                        </div>
                        {/* description */}
                        <div className="mb-6">
                            <label className="block font-medium mb-2">
                                Description <span className="text-red-500">*</span>
                            </label>

                            <textarea
                                rows="4"
                                value={formData?.description || ""}
                                onChange={(e) => handleChange(e.target.value, "description")}
                                placeholder="Describe your item or service in detail..."
                                className="w-full bg-[#f7f8fb] rounded-xl px-5 py-4 outline-none shadow-sm"
                            />
                            {errors && errors?.description && (
                                <div className="flex items-center gap-2 text-sm text-red-500 mt-2">
                                    <span>{errors?.description}</span>
                                </div>
                            )}
                        </div>
                        {/* duration */}
                        <div className="">
                            <label className="block font-medium mb-2">Change Listing Duration <span className='text-red-500'>*</span></label>
                            <input type="text" value={formData?.listing_duration || ''} onChange={(e) => handleChange(e.target.value, "listing_duration")} placeholder="e.g. 30d" className="w-full bg-[#f7f8fb] rounded-xl px-5 py-4 outline-none shadow-sm" />
                            {errors && errors.listing_duration && (
                                <div className="flex items-center gap-2 text-sm text-red-500 mt-2">
                                    <span>{errors.listing_duration}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* photos */}
                    {formData?.image && (
                        <div className="flex flex-col gap-4 mb-6">
                            {/* Changed to flex-wrap and adjusted alignment for mobile */}
                            <div className="flex flex-wrap gap-4 items-center justify-start">
                                {formData?.image.map((uri, index) => (
                                    /* The 'group' class allows us to show/hide the button on hover if desired */
                                    <div key={index} className="relative group">
                                        <Image
                                            src={uri}
                                            alt="logo"
                                            className="rounded-2xl border border-black/25 w-24 h-24 sm:w-[150px] sm:h-[150px] object-cover"
                                            width={150}
                                            height={150}
                                        />

                                        {/* Close Icon Button */}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                                            aria-label="Remove image"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}

                                {/* The Plus button */}
                                <label
                                    htmlFor="file"
                                    className="cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl w-24 h-24 sm:w-[150px] sm:h-[150px]"
                                >
                                    {savingImage ? (
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                                    ) : (
                                        <PlusCircle className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600" />
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        name="image"
                                        id="file"
                                        onChange={handleFile}
                                        className="hidden"
                                        disabled={savingImage}
                                    />
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Footer Actions */}
                    <div className="flex gap-4 w-full">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3.5 px-4 border border-gray-200 rounded-full text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isSaving}
                            className="flex-1 py-3.5 px-4 bg-red-600 text-white rounded-full text-sm font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                        >
                            {isSaving ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            ) : (
                                "Save"
                            )}
                        </button>
                    </div>
                </div>
            </div >
        </>
    );
};
