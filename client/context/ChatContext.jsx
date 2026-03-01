"use client";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const server = process.env.NEXT_PUBLIC_SERVER || "http://localhost:5000";
const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [newRequestLoading, setNewRequestLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [selected, setSelected] = useState(null);
  const [createLod, setCreateLod] = useState(false);
  const [loading, setLoading] = useState(false);

  const getHeaders = () => ({
    headers: { token: localStorage.getItem("token") },
  });
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  async function fetchResponse() {
    if (prompt === "") return alert("Write prompt");

    if (!selected) {
      alert("Please select or create a chat on the sidebar first!");
      return;
    }

    setNewRequestLoading(true);
    const currentPrompt = prompt;
    setPrompt("");

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        method: "post",
        data: {
          system_instruction: {
            parts: [
              {
                text: "You are a helpful assistant. Keep your answers brief, direct, and under 3 sentences unless asked otherwise.",
              },
            ],
          },

          contents: [
            {
              parts: [{ text: currentPrompt }],
            },
          ],

          generationConfig: {
            maxOutputTokens: 250, 
            temperature: 0.7, 
          },
        },
      });

      const aiAnswer = response.data.candidates[0].content.parts[0].text;
      const message = { question: currentPrompt, answer: aiAnswer };

      setMessages((prev) => [...prev, message]);

      const backendUrl = server || "http://localhost:5000";

      await axios.post(
        `${backendUrl}/api/chat/${selected}`,
        { question: currentPrompt, answer: aiAnswer },
        getHeaders(),
      );

      setNewRequestLoading(false);
    } catch (error) {
      console.error("Error details:", error);
      alert("Something went wrong");
      setNewRequestLoading(false);
    }
  }

  async function fetchChats() {
    if (typeof window === "undefined" || !localStorage.getItem("token")) return;
    try {
      const { data } = await axios.get(`${server}/api/chat/all`, getHeaders());
      setChats(data);
      if (data.length > 0) setSelected(data[0]._id);
    } catch (error) {
      console.log(error);
    }
  }

  async function createChat() {
    setCreateLod(true);
    try {
      await axios.post(`${server}/api/chat/new`, {}, getHeaders());
      await fetchChats();
      setCreateLod(false);
    } catch (error) {
      toast.error("Failed to create chat");
      setCreateLod(false);
    }
  }
  async function fetchMessages() {
    if (!selected) return;
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${server}/api/chat/${selected}`,
        getHeaders(),
      );
      setMessages(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  async function deleteChat(id) {
    try {
      const { data } = await axios.delete(
        `${server}/api/chat/${id}`,
        getHeaders(),
      );
      toast.success(data.message);
      await fetchChats();
      setMessages([]);
      setSelected(null);
    } catch (error) {
      alert("Something went wrong");
    }
  }

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (selected) fetchMessages();
  }, [selected]);

  return (
    <ChatContext.Provider
      value={{
        fetchResponse,
        messages,
        prompt,
        setPrompt,
        newRequestLoading,
        chats,
        createChat,
        createLod,
        selected,
        setSelected,
        loading,
        setLoading,
        deleteChat,
        fetchChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatData = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("ChatData must be used within a ChatProvider");
  }
  return context;
};
