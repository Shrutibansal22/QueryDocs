"use client";
import React from "react";

const MoodIcon = ({ mood }) => {
  const moodEmojis = {
    happy: "😊",
    sad: "😢",
    stressed: "😰",
    anxious: "😟",
    angry: "😠",
    neutral: "😐",
  };

  const moodColors = {
    happy: "bg-yellow-500",
    sad: "bg-blue-500",
    stressed: "bg-orange-500",
    anxious: "bg-purple-500",
    angry: "bg-red-500",
    neutral: "bg-gray-500",
  };

  return (
    <div className={`${moodColors[mood] || moodColors.neutral} rounded-full p-2 text-2xl`}>
      {moodEmojis[mood] || moodEmojis.neutral}
    </div>
  );
};

const RecommendationsPanel = ({ currentMood, currentRecommendations }) => {
  return (
    <div className="w-72 flex flex-col overflow-hidden bg-gradient-to-b from-indigo-900 via-gray-800 to-gray-900 border-l-4 border-indigo-400 shadow-lg p-2">
      
      {/* MOOD SECTION */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 border-2 border-indigo-300 rounded-lg p-2 mb-2">
        <p className="text-xs text-indigo-100 font-bold uppercase tracking-wide mb-1">📊 Your Mood</p>
        <div className="flex items-center justify-between">
          <p className="text-xl font-black text-white capitalize">
            {currentMood || "neutral"}
          </p>
          <div className="text-4xl">
            <MoodIcon mood={currentMood} />
          </div>
        </div>
      </div>

      {/* RECOMMENDATIONS SECTION */}
      {currentRecommendations && currentRecommendations.length > 0 ? (
        <>
          <p className="text-xs text-gray-300 mb-2 font-bold uppercase tracking-wide">💡 Recommendations</p>
          <div className="flex-1 overflow-y-auto space-y-2 scrollbar-hide">
            {currentRecommendations.map((rec, idx) => (
              <div key={idx} className="bg-gray-900 border-2 border-indigo-500 rounded p-2 hover:border-indigo-300 hover:bg-gray-800 transition-all cursor-pointer">
                <p className="font-bold text-indigo-300 text-xs flex items-center gap-1">
                  <span className="text-sm">
                    {rec.type === 'yoga' ? '🧘' : rec.type === 'blog' ? '📖' : rec.type === 'meditation' ? '🧘‍♀️' : '💪'}
                  </span>
                  <span className="line-clamp-1 text-xs">{rec.title}</span>
                </p>
                <p className="text-xs text-gray-300 mt-0.5 line-clamp-1">{rec.description}</p>
                <p className="text-xs text-gray-400 mt-0.5">⏱️ {rec.duration}</p>
                {rec.link && rec.link !== "#" && (
                  <a
                    href={rec.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white text-xs py-0.5 px-2 rounded mt-0.5 transition-colors font-semibold"
                  >
                    Open →
                  </a>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-center text-gray-400 text-xs">
            Send a message to get personalized recommendations
          </p>
        </div>
      )}
    </div>
  );
};

export default RecommendationsPanel;
