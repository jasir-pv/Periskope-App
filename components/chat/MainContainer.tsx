'use client'

import React from 'react'
import ChatList from './ChatList'
import ChatWindow from './ChatWindow'



const MainContainer = () => {

  return (
    <div className='flex flex-1 ml-12 mr-10 h-screen bg-green-100 overflow-auto'>

      <div className=' flex h-screen bg-white'>

      <ChatList/>
      </div>

      <div className=' flex flex-col flex-1 '> 

      <ChatWindow/>

      </div>
      
    </div>
  )
}

export default MainContainer