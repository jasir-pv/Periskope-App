// 'use client'

// import { supabaseBrowser } from "../client"

// const handleGoogleLogin = async () => {
//   const supabase = supabaseBrowser()
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: 'google',
//     options: {
//       redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/callback`,
//     },
//   })

//   if (error) {
//     console.error('Login error:', error)
//   } else if (data?.url) {
//     window.location.href = data.url 
//   }
// }
