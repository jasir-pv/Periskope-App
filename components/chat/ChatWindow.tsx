'use client'

import { useEffect, useRef, useState } from "react";
import ChatWindowHeader from "./ChatWindowHeader";
import { BsCheck2All, BsEmojiSmile } from "react-icons/bs";
import { messages as dummyMessages } from "@/lib/data";
import { FiMic, FiPaperclip } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import { supabaseBrowser } from "@/utils/supabase/client";
import { useUser } from "../context/UserContext";

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  is_read: boolean;
  sender: {
    id: string;
    email: string;
    user_metadata: {
      avatar?: string;
      name?: string;
    };
  };
}

export default function ChatWindow({ receiverId }: { receiverId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  // Fetch messages from Supabase or use dummy data
  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Try to fetch from Supabase first
        const { data, error: supabaseError } = await supabaseBrowser
          .from("messages")
          .select(`*, sender:sender_id(*)`)
          .or(`and(sender_id.eq.${user?.id},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${user?.id})`)
          .order("created_at", { ascending: true });

        if (supabaseError) {
          console.error("Error fetching messages from Supabase:", supabaseError);
          // Fallback to dummy data if Supabase fails
          setMessages(dummyMessages as Message[]);
          setError("Couldn't connect to live messages. Showing sample conversation.");
        } else {
          setMessages(data || []);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setMessages(dummyMessages as Message[]);
        setError("Connection error. Showing sample conversation.");
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.id) {
      fetchMessages();
    } else {
      // If no user, just show dummy data
      setMessages(dummyMessages as Message[]);
      setIsLoading(false);
    }
  }, [user?.id, receiverId]);

  // Set up real-time subscription (only when using Supabase)
  useEffect(() => {
    if (error) return; // Skip if we're using dummy data

    const channel = supabaseBrowser
      .channel("room_one")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `or(and(sender_id.eq.${user?.id},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${user?.id}))`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabaseBrowser.removeChannel(channel);
    };
  }, [user?.id, receiverId, error]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user?.id) return;

    try {
      if (error) {
        // If we're using dummy data, just add to local state
        const newMsg: Message = {
          id: Date.now().toString(),
          sender_id: user.id,
          receiver_id: receiverId,
          content: newMessage,
          created_at: new Date().toISOString(),
          is_read: false,
          sender: {
            id: user.id,
            email: user.email || "",
            user_metadata: user.user_metadata || {},
          },
        };
        setMessages((prev) => [...prev, newMsg]);
      } else {
        // Otherwise send to Supabase
        const { error: supabaseError } = await supabaseBrowser
          .from("messages")
          .insert([
            {
              sender_id: user.id,
              receiver_id: receiverId,
              content: newMessage,
            },
          ]);

        if (supabaseError) throw supabaseError;
      }

      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message. Please try again.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="hidden sm:flex flex-col h-screen bg-white">
      {/* Header */}
      <ChatWindowHeader receiverId={receiverId} />

      {/* Error message */}
      {error && (
        <div className="bg-yellow-100 text-yellow-800 text-sm p-2 text-center">
          {error}
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Messages Container */}
      {!isLoading && (
        <div className="flex-1 overflow-y-auto p-2 bg-gray-200">
          {messages.map((msg) => (
            <div key={msg.id} className={`mb-4 ${msg.sender_id === user?.id ? "text-right" : "text-left"}`}>
              <div
                className={`inline-block max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.sender_id === user?.id ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {msg.sender_id !== user?.id && msg.sender && (
                  <div className="font-bold text-xs text-gray-700">
                    {msg.sender.user_metadata?.name || msg.sender.email}
                  </div>
                )}
                <div className="text-sm">{msg.content}</div>
                <div className={`text-xs mt-1 ${msg.sender_id === user?.id ? "text-blue-100" : "text-gray-500"}`}>
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  {msg.sender_id === user?.id && (
                    <BsCheck2All className={`inline ml-1 ${msg.is_read ? "text-blue-300" : "text-gray-400"}`} />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Message Input Area */}
      <div className="p-2 bg-gray-100 border-t border-gray-200">
        <div className="flex items-center w-full">
          <button className="mr-2 text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-200">
            <BsEmojiSmile className="w-4 h-4" />
          </button>
          <button className="mr-2 text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-200">
            <FiPaperclip className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 p-2 rounded-full bg-white focus:outline-none text-xs"
            disabled={isLoading}
          />
          {newMessage ? (
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="ml-2 text-green-500 rounded-full p-2 hover:text-green-800 disabled:text-gray-400"
            >
              <IoSend />
            </button>
          ) : (
            <button className="ml-2 text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-200">
              <FiMic className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}