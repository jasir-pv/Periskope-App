
"use client"


import ChatWindow from "@/components/chat/ChatWindow";
import { useUser } from "@/components/context/UserContext";
import { redirect } from "next/navigation";


export default function ChatPageClient({ userId }: { userId: string }) {
  const { user, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (!user) redirect("/login");

  return <ChatWindow receiverId={userId} />;
}