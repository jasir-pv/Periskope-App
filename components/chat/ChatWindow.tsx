
import { useState } from "react";
import ChatWindowHeader from "./ChatWindowHeader";
import { BsCheck2All, BsEmojiSmile } from "react-icons/bs";
import { messages } from "@/lib/data";
import { FiMic, FiPaperclip } from "react-icons/fi";
import { IoSend } from "react-icons/io5";

// interface Message {
//   id: string
//   sender: string
//   content: string
//   phoneNumber?: string
//   time: string
//   isMe: boolean
//   isRead?: boolean
//   date?: string
// }

export default function ChatWindow() {

  const [message, setMessage] = useState('')

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Message sent:', message)
      setMessage('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
      <div className="hidden sm:flex flex-col flex-1 h-screen bg-white ">
        {/* Header */}

        <ChatWindowHeader />


         <div className="flex-1 overflow-y-auto p-2 bg-gray-200 ">
        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.date && (
              <div className="text-center text-xs text-gray-500 my-4">
                {msg.date}
              </div>
            )}
            <div className={`flex mb-4 ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.isMe ? 'bg-green-100 rounded-tr-none' : 'bg-white rounded-tl-none'
                }`}
              >
                {!msg.isMe && msg.sender && (
                  <div className="font-bold text-[10px] font-sans text-gray-700">
                    {msg.sender}
                    {msg.phoneNumber && (
                      <span className="ml-2 text-[10px] font-sans text-gray-500">{msg.phoneNumber}</span>
                    )}
                  </div>
                )}
                {msg.content && (
                  <div className="text-gray-800 font-sans text-xs">{msg.content}</div>
                )}
                <div className={`text-[9px] text-gray-500 mt-1 ${msg.isMe ? 'flex items-center justify-end' : ''}`}>
                  {msg.time}
                  {msg.isMe && msg.isRead && (
                    <BsCheck2All className="ml-1 text-blue-500" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


           <div className="p-2 fixed bottom-0 bg-gray-100 border-t border-gray-200 ">
        <div className="flex items-center">
          <button className="mr-2  text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-200">
            <BsEmojiSmile className="w-4 h-4" />
          </button>
          <button className="mr-2 text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-200">
            <FiPaperclip className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message..."
            className="flex-1 p-2 rounded-full bg-white focus:outline-none text-xs"
          />
          {message ? (
            <button
              onClick={handleSendMessage}
              className="ml-2 text-green-500 rounded-full p-2 hover:text-green-800"
            >
             <IoSend/>
            </button>
          ) : (
            <button className="ml-2 text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-200">
              <FiMic className="w-4 h-4" />
            </button>
          )}
        </div>
        </div>

      </div>
  )
}