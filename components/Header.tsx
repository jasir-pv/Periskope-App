'use client'

import { supabaseBrowser } from '@/utils/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { FaQuestionCircle, FaStar, FaSyncAlt } from 'react-icons/fa'
import { MdNotificationsOff, MdOutlineSort } from 'react-icons/md'
import { RiChatSmileAiFill, RiExpandUpDownLine } from 'react-icons/ri'
import { VscDesktopDownload } from 'react-icons/vsc'
import { WiStars } from 'react-icons/wi'


const Header = () => {

  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabaseBrowser.auth.getSession();
      
      if (!session) {
        router.push("/login");
      }
    };

    checkSession();
  }, [router]);


  return (
    <div className='ml-12 p-2 bg-primary-light border-b border-gray-100 flex justify-between w-full items-center'>
        <div className='flex flex-row  items-center gap-2 ml-4'>
                <RiChatSmileAiFill  className='text-muted'/>           
                <h2 className='text-xs text-muted font-sans font-semibold'>Chats</h2>
        </div>

          <div className='flex gap-4'>
            <Link href="/login">
            <div className='flex items-center text-[10px] gap-1 text-muted bg-green-100 p-1 border'>
                <FaSyncAlt /> 
              <button> Login</button>
              <button 
        onClick={async () => {
          await supabaseBrowser.auth.signOut();
          router.push("/login");
        }}
      >
        Sign Out
      </button>
              </div>
            </Link>
              <div className='flex items-center text-[10px] gap-1 text-muted p-1 border'>
                <FaSyncAlt /> 
              <button> Refresh</button>
              </div>

             <div className='flex items-center text-[10px] gap-1 text-muted p-1 border'>
                <FaQuestionCircle /> 
              <button> Help</button>
              </div>
             <div className='flex items-center text-[10px] gap-1 text-muted p-1 border'>
                <FaStar className='text-yellow-400'/> 
              <button> 5/8 Phones</button>
              <RiExpandUpDownLine />
              </div>


              <div className='flex items-center text-xs gap-1 text-muted p-1 border'>
                 <VscDesktopDownload /> 
              </div>

              <div className='flex items-center text-xs gap-1 text-muted p-1 border'>
                <MdNotificationsOff  /> 
              </div>

              <div className='flex items-center text-xs gap-1 text-muted p-1 border'>
                <WiStars />
                <MdOutlineSort /> 
              </div>
          </div>

    </div>
  )
}

export default Header