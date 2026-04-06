import mongoose, { Schema, model, models } from "mongoose";

const TokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Token = models.Token || model("Token", TokenSchema);
