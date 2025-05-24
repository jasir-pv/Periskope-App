'use client'

import { FiMessageSquare} from 'react-icons/fi';
import { format } from 'date-fns';
import { dummyChats } from '@/lib/data';
import ChatHeader from './ChatHeader';
import { RiChatNewLine } from 'react-icons/ri';
// import { useEffect, useState } from 'react';
// import { supabase } from '@/lib/supabase';


// interface ChatItem {
//   id: string;
//   name: string;
//   lastMessage: string;
//   phoneNumbers: string[];
//   unreadCount: number;
//   timestamp: Date;
//   isVerified?: boolean;
// }

// type Chat = {
//   id: number;
//   user1_id: string;
//   user2_id: string;
// };

const ChatList = () => {

  // const [chats, setChats] =useState<any[] | null>(null);


  // useEffect(() => {
  //   const fetchChats = async () =>{
  //     const { data } = await supabase.from('chats').select('*') 
  //     setChats(data)
  //   }
  //   fetchChats
  // },[])

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return format(date, 'h:mm a');
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return format(date, 'EEEE');
    return format(date, 'dd-MMM-yy');
  };

  return (
    <div className="w-80 md:w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      
      <ChatHeader />

    

      {/* Chat List */}



      <div className="flex-1 overflow-y-auto">
        {dummyChats.map((chat) => (
          <div key={chat.id} className="flex items-center p-2 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
            <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <FiMessageSquare className="text-gray-500" />
            </div>


            <div className="ml-3 flex-1 min-w-0">
              <div className="flex justify-between">
                <h3 className="text-xs font-semibold font-sans text-gray-900 truncate">
                  {chat.name}
                  {chat.isVerified && (
                    <span className="ml-1 text-blue-500">✔</span>
                  )}
                </h3>
                <span className="text-[9px] text-gray-500">{formatDate(chat.timestamp)}</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs font-sans text-gray-500 truncate">
                  {chat.lastMessage || <span className="italic text-gray-400">No messages</span>}
                </p>

                {/* chat count          */}
                {chat.unreadCount > 0 && (
                  <span className=" bg-accent text-white text-[10px] font-medium rounded-full h-4 w-4  flex items-center justify-center">
                    {chat.unreadCount}
                  </span>
                )}
              </div>

              {/* phoneeeeeeeeeeee */}
              <div className="flex flex-wrap gap-1 mt-1">
                {chat.phoneNumbers.map((phone, idx) => (
                  <span key={idx} className="text-[10px] text-gray-400">
                    {phone}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className='bg-green-700 absolute bottom-8 ml-60 
                       rounded-full p-3 text-white'>
        <RiChatNewLine className='stroke-slate-100'/>
      </div>

    </div>
  );
};

export default ChatList;