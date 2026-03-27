import { Chat } from "../models/Chat.js";
import { Conversation } from "../models/Conversation.js";
import { Recommendation } from "../models/Recommendation.js";
import Sentiment from "sentiment";

const sentiment = new Sentiment();

// Map mood scores to mood categories
const getMoodCategory = (score) => {
  if (score >= 3) return "happy";
  if (score >= 1) return "neutral";
  if (score >= -1) return "stressed";
  if (score > -3) return "anxious";
  return "angry";
};

export const createChat = async (req, res) => {
  try {
    const userId = req.user._id;

    const chat = await Chat.create({
      user: userId,
    });

    res.json(chat);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(chats);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const addConversation = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat)
      return res.status(404).json({
        message: "No chat with this id",
      });

    // Analyze sentiment from the question
    const result = sentiment.analyze(req.body.question);
    const moodScore = result.score;
    const mood = getMoodCategory(moodScore);

    // Fetch recommendations based on mood
    const recommendations = await Recommendation.find({ mood }).limit(3);
    const recommendationIds = recommendations.map((r) => r._id);

    const conversation = await Conversation.create({
      chat: chat._id,
      question: req.body.question,
      answer: req.body.answer,
      mood,
      moodScore,
      recommendations: recommendationIds,
    });

    // Populate recommendations before sending response
    await conversation.populate("recommendations");

    const updatedChat = await Chat.findByIdAndUpdate(
      req.params.id,
      { latestMessage: req.body.question },
      { new: true }
    );

    res.json({
      conversation,
      updatedChat,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      chat: req.params.id,
    }).populate("recommendations");

    if (!conversation)
      return res.status(404).json({
        message: "No conversation with this id",
      });

    res.json(conversation);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat)
      return res.status(404).json({
        message: "No chat with this id",
      });

    if (chat.user.toString() !== req.user._id.toString())
      return res.status(403).json({
        message: "Unauthorized",
      });

    await chat.deleteOne();

    res.json({
      message: "Chat Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};