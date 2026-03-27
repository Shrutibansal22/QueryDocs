import Sentiment from "sentiment";
import { Recommendation } from "../models/Recommendation.js";

const sentiment = new Sentiment();

// Map mood scores to mood categories
const getMoodCategory = (score) => {
  if (score >= 3) return "happy";
  if (score >= 1) return "neutral";
  if (score >= -1) return "stressed";
  if (score > -3) return "anxious";
  return "angry";
};

export const detectMoodAndGetRecommendations = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        message: "Question is required",
      });
    }

    // Analyze sentiment from the question
    const result = sentiment.analyze(question);
    const moodScore = result.score;
    const mood = getMoodCategory(moodScore);

    // Fetch recommendations based on mood
    const recommendations = await Recommendation.find({ mood }).limit(3);

    res.json({
      mood,
      moodScore,
      recommendations,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllRecommendations = async (req, res) => {
  try {
    const recommendations = await Recommendation.find();
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getRecommendationsByMood = async (req, res) => {
  try {
    const { mood } = req.params;

    const validMoods = [
      "happy",
      "sad",
      "stressed",
      "anxious",
      "angry",
      "neutral",
    ];
    if (!validMoods.includes(mood)) {
      return res.status(400).json({
        message: "Invalid mood",
      });
    }

    const recommendations = await Recommendation.find({ mood });
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createRecommendation = async (req, res) => {
  try {
    const { mood, type, title, description, duration, link, imageUrl } =
      req.body;

    const recommendation = await Recommendation.create({
      mood,
      type,
      title,
      description,
      duration,
      link,
      imageUrl,
    });

    res.status(201).json(recommendation);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
