'use client'

import React from 'react'
import ChatList from './ChatList'
import ChatWindow from './ChatWindow'
import { redirect } from 'next/navigation'
import { useUser } from '../context/UserContext'



const MainContainer = ( { params }: { params: { userId: string } } ) => {


    const { user, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (!user) redirect("/login");

  return (
    <div className='flex flex-1 ml-12 mr-10 h-screen bg-green-100 overflow-auto'>

      <div className=' flex h-screen bg-white'>

      <ChatList/>
      </div>

      <div className=' flex flex-col flex-1 '> 

      <ChatWindow receiverId={params.userId}/>

      </div>
      
    </div>
  )
}

export default MainContainer