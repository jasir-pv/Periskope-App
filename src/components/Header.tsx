'use client'

import React from 'react'

type Props = {}

const Header = (props: Props) => {
  return (
    <div className='p-4 bg-gray-100 border-b border-gray-300'>
        <div className='flex justify-between items-center'>
                <div className='font-semibold'> filter</div>

                <div>
                    <button className='text-gray-600'>Refresh</button>
                    <button>Help</button>
                    <button>rating</button>
                </div>
        </div>

        <div>

        </div>
    </div>
  )
}

export default Header