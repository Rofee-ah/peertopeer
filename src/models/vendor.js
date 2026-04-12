import mongoose, { Schema, model, models } from "mongoose";

const VendorSchema = new Schema({
  businessName: {
    type: String,
    unique: true,
  },
  focus: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  department: {
    type: String,
  },
  logo: {
    type: String,
  },
  listing: [
    {
      title: { type: String, required: true },
      category: { type: String, required: true },
      sub_category: { type: String, required: true },
      price: { type: String, required: true },
      listing_duration: { type: String },
      description: { type: String, required: true },
      image: [String],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Vendor = mongoose.models.Vendor || model("Vendor", VendorSchema);
