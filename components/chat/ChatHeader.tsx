'use client'

import React from 'react'
import { GoFileDirectoryFill } from 'react-icons/go'
import { IoFilterOutline } from 'react-icons/io5'


const ChatHeader = ( ) => {
  return (
   <div className="p-2 h-10 bg-white flex items-center border-b justify-center">
     <div className="flex text-muted items-center justify-center gap-1  ">
        <div className='flex items-center gap-1 text-green-500'>
        <GoFileDirectoryFill />
        <h3 className="text-[10px] font-semibold font-sans "> Custom Filter</h3>
        </div>

        <button className="p-1 border text-[10px] bg-white rounded-sm"> Save</button>

        <button className="p-1 border text-[10px] bg-white rounded-sm">Search</button>

         <button className="flex items-center gap-1 p-1 border text-[10px] bg-white rounded-sm"> <IoFilterOutline /> Filterd</button>

     </div>
    </div>
  )
}

export default ChatHeader