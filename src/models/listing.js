import mongoose, { Schema, model, models } from "mongoose";

const ListingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  sub_category: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  listing_duration: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  image: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Listing =
  mongoose.models.Listing || model("Listing", ListingSchema);
