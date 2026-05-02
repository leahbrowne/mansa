import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type User = {
  id: string
  clerk_id: string | null
  name: string | null
  email: string | null
  mansa_balance: number
  referral_code: string | null
  referred_by: string | null
  cuisine_preferences: string[] | null
  created_at: string
}

export type Restaurant = {
  id: string
  name: string | null
  cuisine_type: string | null
  heritage_statement: string | null
  address: string | null
  lat: number | null
  lng: number | null
  verification_status: 'listed' | 'certified' | 'pending'
  ownership_badge: string | null
  qr_code: string | null
  monthly_plan: 'free' | 'grow' | 'pro'
  is_demo: boolean
  created_at: string
}

export type Transaction = {
  id: string
  user_id: string | null
  restaurant_id: string | null
  type: 'earn' | 'redeem' | 'referral' | 'authenticate'
  mansas: number
  spend_amount: number | null
  created_at: string
}

export type Event = {
  id: string
  name: string | null
  description: string | null
  event_date: string | null
  location: string | null
  organiser: string | null
  is_featured: boolean
  created_at: string
}
