'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { BiStats } from 'react-icons/bi'
import { BsFilterLeft } from 'react-icons/bs'
import { CiSettings } from 'react-icons/ci'
import { GrAnnounce } from 'react-icons/gr'
import { IoChatbubbleEllipsesOutline, IoTicket } from 'react-icons/io5'
import { LuPanelLeftOpen } from 'react-icons/lu'
import { MdHomeFilled } from 'react-icons/md'



const menuItems = [
  { id: 'home', icon: <MdHomeFilled />, label: 'Home', path:'/' },
  { id: 'chat', icon: <IoChatbubbleEllipsesOutline />, label: 'Chat', path:'/message' },
  { id: 'ticket', icon: <IoTicket />, label: 'Tickets',path:'/ticket' },
  { id: 'stats', icon: <BiStats />, label: 'Stats' , path: '/stats' },
  { id: 'announce', icon: <GrAnnounce />, label: 'Announcements', path:'/announcement' },
  { id: 'filter', icon: <BsFilterLeft />, label: 'Filter' , path: '/filter'},
  { id: 'settings', icon: <CiSettings />, label: 'Settings' , path: '/settings'},
]

type SidebarProps = {
  expand: boolean;
  setExpand: (expand: boolean) => void;
};

const Sidebar = ( { expand, setExpand }: SidebarProps ) => {

  const [active, setActive] = useState('home')
 const router = useRouter()

  return (
    <div className={` ${expand ? 'w-60': ''}w-12 h-screen p-2 bg-primary-light border-r border-gray-200 flex flex-col justify-between items-center top-0 absolute `}>

      <div className=''>
        <Image src="/periskopAsset 1.svg" 
              className='mt-2 mb-5'
              width={24}
              height={24}
              alt="Logo" />


        <div className={`flex flex-col ${expand ? 'items-start pl-2' : 'items-center'} gap-3 text-gray-700 mt-12 w-full`} >
            {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() =>
                { setActive(item.id) 
                   router.push(item.path)
                }}
              title={item.label}
               className={`flex items-center gap-2 w-full p-2 rounded-md transition-all 
                    ${active === item.id ? 'text-green-700 bg-green-100' : 'text-gray-700 hover:bg-gray-200'}`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {expand && <span className="text-sm font-medium">{item.label}</span>}
                </button>
          ))}


        </div>
      </div>

      <div>
        <button
        onClick={() => setExpand(!expand)}
          className='w-9 h-9 flex items-center justify-center '
           title={expand ? "Collapse" : "Expand"}
        >
          <LuPanelLeftOpen className={`${expand ? 'rotate-180 transition-transform' : ''}`} />
        </button>
      </div>
      
    </div>
  )
}

export default Sidebar