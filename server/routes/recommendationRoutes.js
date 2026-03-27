import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  detectMoodAndGetRecommendations,
  getAllRecommendations,
  getRecommendationsByMood,
  createRecommendation,
} from "../controllers/recommendationControllers.js";

const router = express.Router();

router.post("/detect-mood", isAuth, detectMoodAndGetRecommendations);
router.get("/all", isAuth, getAllRecommendations);
router.get("/mood/:mood", isAuth, getRecommendationsByMood);
router.post("/create", isAuth, createRecommendation);

export default router;
