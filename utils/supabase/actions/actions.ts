'use server'

import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

const supabaseServer = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const signInWithGoogle = async () => {
  const supabase = supabaseServer()
  const auth_callback_url = `${process.env.NEXT_PUBLIC_SITE_URL}/callback`

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: auth_callback_url,
    },
  })

  if (error) {
    console.error("Error signing in with Google:", error)
    throw error
  }

  if (data?.url) {
    redirect(data.url)
  }
}