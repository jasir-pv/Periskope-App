'use client'

import React, { useState } from 'react'
import { LuPanelLeftOpen, LuPanelRightOpen } from 'react-icons/lu'
import {MdHome, MdOutlineRefresh, MdEdit, MdOutlineSettings, 
  MdPeopleAlt,MdOutlineMailOutline,MdOutlinePhoto, MdMenu} from 'react-icons/md'

import {
  RiDashboardLine,
  RiShareForwardLine,
  RiListSettingsLine,
} from 'react-icons/ri'
import { FaArrowLeft } from 'react-icons/fa'
import { CiAt } from 'react-icons/ci'

type Props = {}

const sidebarItems = [
  { id: 'back', icon: <LuPanelRightOpen />, label: 'Back' },
  { id: 'refresh', icon: <MdOutlineRefresh />, label: 'Refresh' },
  { id: 'edit', icon: <MdEdit />, label: 'Edit' },
  { id: 'menu', icon: <MdMenu />, label: 'Menu' },
  { id: 'dashboard', icon: <RiDashboardLine />, label: 'Dashboard' },
  { id: 'share', icon: <RiShareForwardLine />, label: 'Share' },
  { id: 'users', icon: <MdPeopleAlt />, label: 'Users' },
  { id: 'mail', icon: <CiAt />, label: 'Mail' },
  { id: 'media', icon: <MdOutlinePhoto />, label: 'Media' },
  { id: 'settings', icon: <RiListSettingsLine />, label: 'Settings' },
]

const RightBar = (props: Props) => {

  const [activeItem, setActiveItem] = useState<string>('dashboard')


  return (
    <div className=' fixed right-0 w-10 h-screen p-2 bg-primary-light border-l border-gray-300 
    flex flex-col items-center justify-center '>
       <div className="flex flex-col gap-4">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            title={item.label}
            className={`p-1 text-xs flex items-center justify-center rounded-md transition 
              ${
                activeItem === item.id
                  ? 'text-green-700 border-b-2'
                  : 'text-gray-400 hover:bg-gray-100 hover:text-black'
              }`}
          >
            {item.icon}
          </button>
        ))}
      </div>

    </div>
  )
}

export default RightBar