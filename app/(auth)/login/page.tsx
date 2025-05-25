'use client'

import Link from 'next/link'
import React from 'react'
import { supabaseBrowser } from '@/utils/supabase/client';



const page = ( ) => {


  const handleGoogleLogin = async () => {
    const { data, error } = await supabaseBrowser.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    
    console.log(data)
    if (error) {
      console.error("Google login error:", error);
      return;
    }
  };


  return (
    <div className='flex items-center h-screen justify-center bg-green-100'>
        
        <div className='flex flex-col gap-4 w-full max-w-md p-6 bg-green-50 shadow-md rounded-xl items-center justify-center '>
            <div>
            <h1 className='text-gray-800 font-bold text-xl font-sans '>Welcome to Periskope</h1>
            <p className='text-muted mt-1 font-sans'>Please Login Your Account</p>
            </div>

                {/* Labels */}
             <div className='w-full mt-6'>
                <label htmlFor="email" className='block text-xs text-muted font-medium mb-1 text-'> 
                    Email:
                    </label>
                <input type="text"  id='email' 
                        className='p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
                        placeholder='user name or email' />
                
                  <label htmlFor="email" className='block text-xs text-muted font-medium mb-1 text-'> 
                    Password:
                    </label>
                <input type="password"  id='password' 
                        className='p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
                        placeholder='Password' />

                <a href="#" className='text-xs  text-blue-800 hover:text-blue-500'>
              Forgot password?
            </a>
            </div>


              <div className='flex items-center justify-center'>

           
          </div>

          <button className='w-full bg-green-600 text-white py-1 px-4 rounded-md hover:bg-green-800 '>
            Login
          </button>

            <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            <path fill="none" d="M1 1h22v22H1z"/>
          </svg>
          Continue with Google
        </button>

        <div className='text-center text-sm text-gray-600'>
          Don't have an account?
          <Link href="/sign-up" className='font-medium ml-1 text-green-600 hover:text-green-500'>
            Sign up
          </Link>
       </div>
      
        </div>
      

               
            
        </div>



  )
}

export default page