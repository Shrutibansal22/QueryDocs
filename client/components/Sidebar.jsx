"use client";
import styles from "../components/styles/sidebar.module.css"
import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { ChatData } from "@/context/ChatContext";
import { UserData } from "@/context/UserContext";
import { LoadingSpinner } from "./Loading"

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { chats, createChat, createLod, setSelected, deleteChat } = ChatData();
  const { logoutHandler } = UserData();

  const deleteChatHandler = (id) => {
    if (confirm("Are you sure you want to delete this chat?")) {
      deleteChat(id);
    }
  };

  const clickEvent = (id) => {
    setSelected(id);
    if (window.innerWidth < 768) toggleSidebar();
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-gray-800 p-4 transition-transform transform md:relative md:translate-x-0 md:w-1/4 md:block ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button
        className="md:hidden p-2 mb-4 bg-gray-700 rounded text-2xl text-white"
        onClick={toggleSidebar}
      >
        <IoIosCloseCircle />
      </button>

      <div className="text-2xl font-bold mb-6 tracking-tight text-white">ChatBot</div>
      
      <div className="mb-4">
        <button
          onClick={createChat}
          className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors flex justify-center items-center"
        >
          {createLod ? <LoadingSpinner /> : "New Chat +"}
        </button>
      </div>

      <div>
        <p className="text-xs font-bold uppercase text-gray-500 mb-4 px-2">Recent</p>

        <div className={`max-h-[calc(100vh-250px)] overflow-y-auto ${styles.thinScrollbar}`}>
          {chats && chats.length > 0 ? (
            chats.map((e) => (
              <div
                key={e._id}
                className="group w-full flex justify-between items-center bg-gray-700 hover:bg-gray-600 rounded mt-2 px-3 py-2 cursor-pointer transition-all"
                onClick={() => clickEvent(e._id)}
              >
                <span className="text-sm truncate mr-2">
                  {e.latestMessage ? e.latestMessage.slice(0, 30) : "New Conversation"}...
                </span>
                <button
                  className="opacity-0 group-hover:opacity-100 p-1.5 text-red-400 hover:text-red-600 transition-opacity"
                  onClick={(event) => {
                    event.stopPropagation(); 
                    deleteChatHandler(e._id);
                  }}
                >
                  <MdDelete size={20} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 px-2">No chats yet</p>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 p-4 w-full bg-gray-800">
        <button
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;