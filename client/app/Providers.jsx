"use client";

import { ChatProvider } from "@/context/ChatContext";
import { UserProvider } from "@/context/UserContext";

export default function Providers({ children }) {
  return (
    <UserProvider>
      <ChatProvider>{children}</ChatProvider>
    </UserProvider>
  );
}
