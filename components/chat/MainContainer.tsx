'use client'

import React from 'react'
import ChatHeader from './ChatHeader'
import ChatSidebar from './ChatSidebar'
import SidebarHeader from './SidebarHeader'


type Props = {}

const MainContainer = (props: Props) => {
  return (
    <div className='flex flex-1 ml-12 mr-10 h-full bg-green-100'>

      <div className='w-[450px] bg-white bor'>

      <ChatSidebar/>
      </div>

      <div className='w-full'> 

      <SidebarHeader/>

      </div>
      
    </div>
  )
}

export default MainContainer