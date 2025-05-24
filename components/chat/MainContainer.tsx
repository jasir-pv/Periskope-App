'use client'

import React from 'react'
import ChatList from './ChatList'
import ChatWindow from './ChatWindow'



const MainContainer = () => {
  
  return (
    <div className='flex flex-1 ml-12 mr-10 h-full bg-green-100'>

      <div className='w-[450px] bg-white bor'>

      <ChatList/>
      </div>

      <div className='w-full'> 

      <ChatWindow/>

      </div>
      
    </div>
  )
}

export default MainContainer