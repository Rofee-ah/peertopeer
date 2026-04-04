import mongoose, { Schema, model, models, Document } from "mongoose";

const ItemSchema = new Schema(
  {
    id: { type: Number, required: true },
    value: { type: String, required: true },
  },
  { _id: false },
);

const PositionSchema =
  new Schema() <
  IJobs >
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    lineManager: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    keyResponsibilities: {
      type: [ItemSchema],
      required: true,
    },
    jobRequirement: {
      type: [ItemSchema],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  };

export const Position =
  models.Position || model < IJobs > ("Position", PositionSchema);
