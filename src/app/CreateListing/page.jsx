"use client";

import React, { useState, useEffect } from "react";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { validateText } from "@/lib/utils";
import { addListing } from "@/redux/slice/ListingSlice";
// import { updateField, loadListing } from '@/redux/slice/ListingSlice';

const variables = {
  title: "",
  category: "",
  subCategory: "",
  description: "",
  price: "",
};
export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [form, setForm] = useState(variables);
  const [errors, setErrors] = useState(variables);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (val, attr) => {
    const data = { ...form };
    data[attr] = val;
    setForm(data);
  };

  useEffect(() => {
    if (Object.values(errors).every((item) => item === null) && isSubmitting) {
      dispatch(addListing(form));
      router.push("/AddPhoto");
    }
  }, [errors]);

  const validateFields = (field) => ({
    title: validateText(field.title || "", "Title"),
    category: validateText(field.category || "", "Category"),
    subCategory: validateText(field.subCategory || "", "Sub Category"),
    description: validateText(field.description || "", "Description"),
    price: validateText(field.price || "", "Price"),
  });

  const handleProceed = () => {
    setErrors(validateFields(form));
    setIsSubmitting(true);
  };

  return (
    <div className="min-h-screen bg-[#f4f6fb] flex flex-col items-center px-4 py-10">
      {/* Dashboard */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 bg-white shadow-md px-6 py-3 rounded-full text-gray-800 font-medium mb-10 hover:shadow-lg transition"
      >
        <Home size={18} className="text-blue-600" />
        Back to Dashboard
      </button>

      {/* Card */}
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg p-6 md:p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            What are you selling?
          </h1>
          <p className="text-gray-500 mt-2">
            Tell us about your item or service
          </p>
        </div>

        {/* Title */}
        <div className="mb-6">
          <label className="block font-medium mb-2">
            Listing Title <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={form.title || ""}
            onChange={(e) => handleChange(e.target.value, "title")}
            placeholder="e.g CLRS Algorithms Textbook"
            className="w-full bg-[#f7f8fb] rounded-xl px-5 py-4 outline-none shadow-sm"
          />
          {errors && errors.title && (
            <div className="flex items-center gap-2 text-sm text-red-500 mt-2">
              <span>{errors.title}</span>
            </div>
          )}
        </div>

        {/* Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-medium mb-2">
              Category <span className="text-red-500">*</span>
            </label>

            <select
              value={form.category}
              onChange={(e) => handleChange(e.target.value, "category")}
              className="w-full bg-[#f7f8fb] rounded-xl px-5 py-4 outline-none shadow-sm"
            >
              <option disabled>Select...</option>
              <option>Goods</option>
              <option>Services</option>
              <option>Both</option>
            </select>
            {errors && errors.category && (
              <div className="flex items-center gap-2 text-sm text-red-500 mt-2">
                <span>{errors.category}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block font-medium mb-2">
              Sub-category <span className="text-red-500">*</span>
            </label>

            <select
              value={form.subCategory}
              onChange={(e) => handleChange(e.target.value, "subCategory")}
              className="w-full bg-[#f7f8fb] rounded-xl px-5 py-4 outline-none shadow-sm"
            >
              <option disabled>Select...</option>
              <option>Fresh Foods</option>
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Books</option>
              <option>Jewellery</option>
              <option>Snacks</option>
            </select>
            {errors && errors.subCategory && (
              <div className="flex items-center gap-2 text-sm text-red-500 mt-2">
                <span>{errors.subCategory}</span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block font-medium mb-2">
            Description <span className="text-red-500">*</span>
          </label>

          <textarea
            rows="4"
            value={form.description}
            onChange={(e) => handleChange(e.target.value, "description")}
            placeholder="Describe your item or service in detail..."
            className="w-full bg-[#f7f8fb] rounded-xl px-5 py-4 outline-none shadow-sm"
          />
          {errors && errors.description && (
            <div className="flex items-center gap-2 text-sm text-red-500 mt-2">
              <span>{errors.description}</span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="mb-8">
          <label className="block font-medium mb-2">
            Price (₦) <span className="text-red-500">*</span>
          </label>

          <input
            type="number"
            value={form.price}
            onChange={(e) => handleChange(e.target.value, "price")}
            placeholder="0.00"
            className="w-full bg-[#f7f8fb] rounded-xl px-5 py-4 outline-none shadow-sm"
          />
          {errors && errors.price && (
            <div className="flex items-center gap-2 text-sm text-red-500 mt-2">
              <span>{errors.price}</span>
            </div>
          )}
        </div>

        {/* Next */}
        <button
          onClick={handleProceed}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-full text-lg font-semibold transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
