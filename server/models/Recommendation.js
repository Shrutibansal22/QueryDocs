import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema(
  {
    mood: {
      type: String,
      enum: ["happy", "sad", "stressed", "anxious", "angry", "neutral"],
      required: true,
    },
    type: {
      type: String,
      enum: ["yoga", "blog", "meditation", "exercise"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      default: "10-15 minutes",
    },
    link: {
      type: String,
      default: "#",
    },
    imageUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const Recommendation =
  mongoose.model("Recommendation", recommendationSchema);
