import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    mood: {
      type: String,
      enum: ["happy", "sad", "stressed", "anxious", "angry", "neutral"],
      default: "neutral",
    },
    moodScore: {
      type: Number,
      default: 0,
    },
    recommendations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recommendation",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Conversation = mongoose.model("Conversation", schema);