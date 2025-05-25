'use client'

import Link from 'next/link'
import React from 'react'


const page = ( ) => {
  return (
    <div className='flex items-center h-screen justify-center bg-green-100'>
        
        <div className='flex flex-col gap-4 w-full max-w-md p-6 bg-green-50 shadow-md rounded-xl items-center justify-center '>
            <div>
            <h1 className='text-gray-800 font-bold text-xl font-sans '>Welcome to Periskope</h1>
            <p className='text-muted mt-1 font-sans'>Create New Account</p>
            </div>

                {/* Labels */}
             <div className='w-full mt-6 '>

                 <label htmlFor="name" className='block text-xs mt-2 text-muted font-medium mb-1 text-'> 
                    Name:
                    </label>
                <input type="text"  id='name' 
                        className='py-2 px-3 text-xs w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
                        placeholder='Enter Your Name' />

                <label htmlFor="email" className='block text-xs mt-2 text-muted font-medium mb-1 text-'> 
                    Email:
                    </label>
                <input type="text"  id='email' 
                        className='py-2 px-3 text-xs w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
                        placeholder='Email' />
                
                  <label htmlFor="email" className='block text-xs mt-2 text-muted font-medium mb-1 text-'> 
                    Password:
                    </label>
                <input type="password"  id='password' 
                        className='py-2 px-3 text-xs w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
                        placeholder='Password' />

                <a href="#" className='text-xs  text-blue-800 hover:text-blue-500'>
              Forgot password?
            </a>
            </div>


              <div className='flex items-center justify-center'>

           
          </div>

          <button className='w-full bg-green-600 text-white py-1 px-4 rounded-md hover:bg-green-800 '>
            Sign Up
          </button>

        <div className='text-center text-sm text-gray-600'>
         Already have account?
          <Link href="/login" className='font-medium ml-1 text-green-600 hover:text-green-500'>
            Login
          </Link>
       </div>
      
        </div>
      

               
            
        </div>



  )
}

export default page