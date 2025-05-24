'use client'

import React, { useState } from 'react'
import { BiStats } from 'react-icons/bi'
import { BsFilterLeft } from 'react-icons/bs'
import { CiSettings } from 'react-icons/ci'
import { Fa0 } from 'react-icons/fa6'
import { GrAnnounce } from 'react-icons/gr'
import { IoChatbubbleEllipsesOutline, IoTicket } from 'react-icons/io5'
import { LuPanelLeftOpen } from 'react-icons/lu'
import { MdHomeFilled } from 'react-icons/md'

type Props = {}


const menuItems = [
  { id: 'home', icon: <MdHomeFilled />, label: 'Home' },
  { id: 'chat', icon: <IoChatbubbleEllipsesOutline />, label: 'Chat' },
  { id: 'ticket', icon: <IoTicket />, label: 'Tickets' },
  { id: 'stats', icon: <BiStats />, label: 'Stats' },
  { id: 'announce', icon: <GrAnnounce />, label: 'Announcements' },
  { id: 'filter', icon: <BsFilterLeft />, label: 'Filter' },
  { id: 'settings', icon: <CiSettings />, label: 'Settings' },
]

const Sidebar = (props: Props) => {

  const [active, setActive] = useState('home')

  return (
    <div className='w-12 h-screen p-2 bg-primary-light border-r border-gray-300 flex flex-col justify-between items-center top-0 absolute'>

      <div className=''>
        <img src="./periskopAsset 1.svg" 
              className='w-6 h-6  mt-2 mb-5'
              alt="Logo" />


        <div className='flex flex-col items-center gap-3 text-gray-700 mt-12' >
            {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              title={item.label}
              className={`p-1 flex text-base items-center justify-center rounded-md 
                ${active === item.id ? ' text-green-700 border-b-2' : 'text-gray-700 hover:bg-gray-200'} transition`}
            >
              {item.icon}
            </button>
          ))}


        </div>
      </div>

      <div>
        <button
          className='w-9 h-9 flex items-center justify-center '
          title="Expand"
        >
          <LuPanelLeftOpen />
        </button>
      </div>
      
    </div>
  )
}

export default Sidebar