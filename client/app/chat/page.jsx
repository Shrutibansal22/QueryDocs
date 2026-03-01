"use client";
import React, { useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { FaRobot } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { LoadingBig, LoadingSmall } from "@/components/Loading";
import { ChatData } from "@/context/ChatContext";

const ChatPage = () => {
  const [isOpen, setIsOpen] = useState(false);
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
  } = ChatData();

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
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-4 bg-gray-800 text-2xl flex items-center"
        >
          <GiHamburgerMenu />
        </button>

        <main className="flex-1 p-6 overflow-hidden flex flex-col">
          <Header />

          {loading ? (
            <LoadingBig />
          ) : (
            <div
              className="flex-1 p-4 overflow-y-auto mb-20 md:mb-0 thin-scrollbar"
              ref={messagecontainerRef}
            >
              {messages && messages.length > 0 ? (
                messages.map((e, i) => (
                  <div key={i} className="flex flex-col gap-4 mb-4">
                    {/* User Message */}
                    <div className="p-4 rounded bg-blue-700 text-white flex gap-3">
                      <div className="bg-white p-2 rounded-full text-black text-xl shrink-0 h-10 w-10 flex items-center justify-center">
                        <CgProfile />
                      </div>
                      <div className="pt-1">{e.question}</div>
                    </div>

                    {/* AI Message */}
                    <div className="p-4 rounded bg-gray-700 text-white flex gap-3">
                      <div className="bg-white p-2 rounded-full text-black text-xl shrink-0 h-10 w-10 flex items-center justify-center">
                        <FaRobot />
                      </div>
                      <div
                        className="pt-1 prose prose-invert max-w-none"
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
        </main>
      </div>

      {/* Input Form Area */}
      {(!chats || chats.length !== 0) && (
        <div className="fixed bottom-0 right-0 p-4 bg-gray-900 w-full md:w-[75%] lg:w-[80%]">
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
    </div>
  );
};

export default ChatPage;