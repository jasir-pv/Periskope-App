import React from 'react'
import { RxAvatar } from 'react-icons/rx'


const ChatWindowHeader = (  ) => {
  return (
    <div> <div className="w-full h-10 flex p-2 gap-1 bg-white  border-b border-gray-300">
      <div className="flex items-center">
        <div className="rounded p-2 mr-2">
               <RxAvatar/> 
        </div>
        <div>
        <h2 className="font-semibold text-xs font-sans">Test El Centro</h2>
        <p className="text-[8px] text-gray-500">Roshnaq Airtel,Jasir,Emil,Johnson etc.</p>
        </div>
      </div>
    </div></div>
  )
}

export default ChatWindowHeader