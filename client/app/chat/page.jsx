"use client";
import React, { useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { FaRobot } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { LoadingBig, LoadingSmall } from "@/components/Loading";
import RecommendationsPanel from "@/components/RecommendationsPanel";
import { ChatData } from "@/context/ChatContext";

const ChatPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [recommendationsVisible, setRecommendationsVisible] = useState(true);
  const [showDebug, setShowDebug] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const {
    fetchResponse,
    messages,
    prompt,
    setPrompt,
    newRequestLoading,
    loading,
    chats,
    currentMood,
    currentRecommendations,
  } = ChatData();

  console.log("===== CHAT PAGE DEBUG =====");
  console.log("Current Recommendations:", currentRecommendations);
  console.log("Current Mood:", currentMood);
  console.log("Recommendations Length:", currentRecommendations?.length || 0);
  console.log("=========================");

  const submitHandler = (e) => {
    e.preventDefault();
    fetchResponse();
  };

  const messagecontainerRef = useRef(null);

  useEffect(() => {
    if (messagecontainerRef.current) {
      messagecontainerRef.current.scrollTo({
        top: messagecontainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar - Left Section */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Chat Section - Center */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-4 bg-gray-800 text-2xl flex items-center"
        >
          <GiHamburgerMenu />
        </button>

        <main className="flex-1 flex flex-col overflow-hidden px-2">
          <div className="px-1 py-1">
            <Header />
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Messages Area */}
            {loading ? (
              <LoadingBig />
            ) : (
              <div
                className="flex-1 overflow-y-auto scrollbar-hide"
                ref={messagecontainerRef}
              >
                {messages && messages.length > 0 ? (
                  messages.map((e, i) => (
                    <div key={i} className="flex flex-col gap-2 mb-3">
                        {/* User Message */}
                        <div className="p-3 rounded bg-blue-700 text-white flex gap-2">
                          <div className="bg-white p-1 rounded-full text-black text-sm shrink-0 h-7 w-7 flex items-center justify-center">
                            <CgProfile />
                          </div>
                          <div className="pt-1 flex-1">
                            <p className="text-sm">{e.question}</p>
                          </div>
                        </div>

                        {/* AI Message */}
                        <div className="p-3 rounded bg-gray-700 text-white flex gap-2">
                          <div className="bg-white p-1 rounded-full text-black text-sm shrink-0 h-7 w-7 flex items-center justify-center">
                            <FaRobot />
                          </div>
                          <div
                            className="pt-1 prose prose-sm prose-invert max-w-none flex-1"
                            dangerouslySetInnerHTML={{ __html: e.answer }}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-full opacity-50">
                      <p>No chat yet</p>
                    </div>
                  )}

                  {newRequestLoading && <LoadingSmall />}
                </div>
            )}
          </div>

          {/* Input Form Area - Bottom of flex column */}
          {(!chats || chats.length !== 0) && (
            <div className="p-4 bg-gray-900 border-t border-gray-700">
              <form
                onSubmit={submitHandler}
                className="flex justify-center items-center max-w-4xl mx-auto"
              >
                <input
                  className="flex-grow p-4 bg-gray-700 rounded-l text-white outline-none focus:ring-1 focus:ring-blue-500"
                  type="text"
                  placeholder="Enter a prompt here..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="p-4 bg-blue-600 hover:bg-blue-500 transition-colors rounded-r text-2xl text-white"
                >
                  <IoMdSend />
                </button>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* Recommendations Panel - Right Section */}
      <RecommendationsPanel 
        currentMood={currentMood} 
        currentRecommendations={currentRecommendations} 
      />
    </div>
  );
};

export default ChatPage;