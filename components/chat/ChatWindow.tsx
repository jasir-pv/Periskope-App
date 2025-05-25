'use client'

import { useEffect, useRef, useState } from "react";
import ChatWindowHeader from "./ChatWindowHeader";
import { BsCheck2All, BsEmojiSmile } from "react-icons/bs";

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

export const dummyMessages: Message[] = [
  {
    id: '1',
    sender_id: 'user-1',
    receiver_id: 'user-2',
    content: 'Hello, how are you?',
    created_at: new Date().toISOString(),
    is_read: false,
    sender: {
      id: 'user-1',
      email: 'alice@example.com',
      user_metadata: {
        name: 'Alice',
      },
    },
  },
  {
    id: '2',
    sender_id: 'user-2',
    receiver_id: 'user-1',
    content: 'I am fine, thank you!',
    created_at: new Date().toISOString(),
    is_read: false,
    sender: {
      id: 'user-2',
      email: 'bob@example.com',
      user_metadata: {
        name: 'Bob',
      },
    },
  },
  {
    id: '3',
    sender_id: 'user-1',
    receiver_id: 'user-2',
    content: 'What are you doing today?',
    created_at: new Date().toISOString(),
    is_read: false,
    sender: {
      id: 'user-1',
      email: 'alice@example.com',
      user_metadata: {
        name: 'Alice',
      },
    },
  },
  {
    id: '4',
    sender_id: 'user-2',
    receiver_id: 'user-1',
    content: 'Just working on a new project.',
    created_at: new Date().toISOString(),
    is_read: false,
    sender: {
      id: 'user-2',
      email: 'bob@example.com',
      user_metadata: {
        name: 'Bob',
      },
    },
  },
  {
    id: '5',
    sender_id: 'user-1',
    receiver_id: 'user-2',
    content: 'Sounds interesting!',
    created_at: new Date().toISOString(),
    is_read: false,
    sender: {
      id: 'user-1',
      email: 'alice@example.com',
      user_metadata: {
        name: 'Alice',
      },
    },
  },
  {
    id: '6',
    sender_id: 'user-2',
    receiver_id: 'user-1',
    content: 'Yes, it is. Want to hear more?',
    created_at: new Date().toISOString(),
    is_read: false,
    sender: {
      id: 'user-2',
      email: 'bob@example.com',
      user_metadata: {
        name: 'Bob',
      },
    },
  },
  {
    id: '7',
    sender_id: 'user-1',
    receiver_id: 'user-2',
    content: 'Sure, tell me all about it.',
    created_at: new Date().toISOString(),
    is_read: false,
    sender: {
      id: 'user-1',
      email: 'alice@example.com',
      user_metadata: {
        name: 'Alice',
      },
    },
  },
  {
    id: '8',
    sender_id: 'user-2',
    receiver_id: 'user-1',
    content: 'It’s a chat app using Supabase!',
    created_at: new Date().toISOString(),
    is_read: false,
    sender: {
      id: 'user-2',
      email: 'bob@example.com',
      user_metadata: {
        name: 'Bob',
      },
    },
  },
  {
    id: '9',
    sender_id: 'user-1',
    receiver_id: 'user-2',
    content: 'That’s awesome. Real-time too?',
    created_at: new Date().toISOString(),
    is_read: false,
    sender: {
      id: 'user-1',
      email: 'alice@example.com',
      user_metadata: {
        name: 'Alice',
      },
    },
  },
  {
    id: '10',
    sender_id: 'user-2',
    receiver_id: 'user-1',
    content: 'Yes! Real-time messages and presence!',
    created_at: new Date().toISOString(),
    is_read: false,
    sender: {
      id: 'user-2',
      email: 'bob@example.com',
      user_metadata: {
        name: 'Bob',
      },
    },
  },
];


export default function ChatWindow({ receiverId }: { receiverId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const { data, error: supabaseError } = await supabaseBrowser
          .from("messages")
          .select(`*, sender:sender_id(*)`)
          .or(`and(sender_id.eq.${user?.id},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${user?.id})`)
          .order("created_at", { ascending: true });

        if (supabaseError) {
          console.error("Error fetching messages from Supabase:", supabaseError);
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
      setMessages(dummyMessages as Message[]);
      setIsLoading(false);
    }
  }, [user?.id, receiverId]);

  useEffect(() => {
    if (error) return;
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user?.id) return;

    try {
      if (error) {
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
      <ChatWindowHeader  />


      {error && (
        <div className="bg-yellow-100 text-yellow-800 text-sm p-2 text-center">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

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