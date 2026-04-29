import mongoose from "mongoose";
import { Recommendation } from "./models/Recommendation.js";
import dotenv from "dotenv";

dotenv.config();

const recommendationsData = [
  // Happy mood
  {
    mood: "happy",
    type: "yoga",
    title: "Sun Salutation Flow",
    description:
      "Energizing yoga flow to celebrate and amplify your positive energy",
    duration: "15-20 minutes",
    link: "https://www.youtube.com/watch?v=yogasunflow",
  },
  {
    mood: "happy",
    type: "blog",
    title: "Sustaining Happiness: Science-Backed Tips",
    description:
      "Learn how to maintain your positive mood throughout the day with evidence-based techniques",
    duration: "5-7 minutes read",
    link: "https://example.com/happiness-blog",
  },
  {
    mood: "happy",
    type: "meditation",
    title: "Gratitude Meditation",
    description:
      "A guided meditation to deepen appreciation for the good things in your life",
    duration: "10 minutes",
    link: "https://www.youtube.com/watch?v=gratitudemeditation",
  },

  // Sad mood
  {
    mood: "sad",
    type: "yoga",
    title: "Heart-Opening Yoga",
    description:
      "Gentle yoga poses to open your heart and release emotional tension",
    duration: "20-25 minutes",
    link: "https://www.youtube.com/watch?v=heartopening",
  },
  {
    mood: "sad",
    type: "blog",
    title: "Coping with Sadness: A Gentle Guide",
    description:
      "Compassionate strategies and self-care tips for navigating difficult emotions",
    duration: "8-10 minutes read",
    link: "https://example.com/sadness-guide",
  },
  {
    mood: "sad",
    type: "meditation",
    title: "Self-Compassion Meditation",
    description:
      "A soothing guided meditation to practice kindness towards yourself during difficult times",
    duration: "15 minutes",
    link: "https://www.youtube.com/watch?v=selfcompassion",
  },

  // Stressed mood
  {
    mood: "stressed",
    type: "yoga",
    title: "Stress-Relief Yin Yoga",
    description: "Slow, restorative yoga poses to calm your nervous system",
    duration: "25-30 minutes",
    link: "https://www.youtube.com/watch?v=yinyoga",
  },
  {
    mood: "stressed",
    type: "exercise",
    title: "5-Minute Quick Walk",
    description: "A simple walking routine to reduce stress and clear your mind",
    duration: "5 minutes",
    link: "https://www.youtube.com/watch?v=quickwalk",
  },
  {
    mood: "stressed",
    type: "blog",
    title: "Stress Management Techniques That Work",
    description:
      "Practical tools and strategies to manage stress and build resilience",
    duration: "6-8 minutes read",
    link: "https://example.com/stress-management",
  },

  // Anxious mood
  {
    mood: "anxious",
    type: "meditation",
    title: "Grounding & Breathing Meditation",
    description:
      "A guided meditation focusing on breath work to calm anxiety and ground you in the present",
    duration: "12 minutes",
    link: "https://www.youtube.com/watch?v=groundingbreathing",
  },
  {
    mood: "anxious",
    type: "yoga",
    title: "Gentle Grounding Yoga",
    description:
      "Earth-grounding yoga poses to build stability and reduce anxiety",
    duration: "18-20 minutes",
    link: "https://www.youtube.com/watch?v=groundingyoga",
  },
  {
    mood: "anxious",
    type: "blog",
    title: "Understanding and Managing Anxiety",
    description:
      "Evidence-based approaches to understand and navigate anxiety more effectively",
    duration: "7-9 minutes read",
    link: "https://example.com/anxiety-guide",
  },

  // Angry mood
  {
    mood: "angry",
    type: "exercise",
    title: "High-Energy Workout",
    description:
      "Channel your anger into a productive workout to release tension",
    duration: "20 minutes",
    link: "https://www.youtube.com/watch?v=highenergyworkout",
  },
  {
    mood: "angry",
    type: "meditation",
    title: "Forgiveness & Release Meditation",
    description:
      "A guided meditation to process anger and practice forgiveness for inner peace",
    duration: "14 minutes",
    link: "https://www.youtube.com/watch?v=forgivenessmeditation",
  },
  {
    mood: "angry",
    type: "blog",
    title: "Transforming Anger Into Growth",
    description:
      "Learn to understand your anger and use it as fuel for positive change",
    duration: "6-8 minutes read",
    link: "https://example.com/anger-transformation",
  },

  // Neutral mood
  {
    mood: "neutral",
    type: "yoga",
    title: "Balanced Flow Yoga",
    description: "A well-rounded yoga practice for overall wellness",
    duration: "20 minutes",
    link: "https://www.youtube.com/watch?v=balancedflow",
  },
  {
    mood: "neutral",
    type: "meditation",
    title: "Mindfulness Meditation",
    description:
      "A foundational meditation practice to cultivate awareness and presence",
    duration: "10 minutes",
    link: "https://www.youtube.com/watch?v=mindfulnessmeditation",
  },
  {
    mood: "neutral",
    type: "blog",
    title: "Building a Sustainable Wellness Routine",
    description:
      "Tips for creating a consistent self-care practice that fits your lifestyle",
    duration: "7-9 minutes read",
    link: "https://example.com/wellness-routine",
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.Db_url, {
      dbName: "ChatbotDB",
    });
    console.log("Connected to MongoDB");

    // Clear existing recommendations
    await Recommendation.deleteMany({});
    console.log("Cleared existing recommendations");

    // Insert new recommendations
    const result = await Recommendation.insertMany(recommendationsData);
    console.log(`Successfully seeded ${result.length} recommendations`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
