import { createClient } from "@supabase/supabase-js"

// Types for our database tables
export type WaitlistSignup = {
  id?: string
  parent_name: string
  email: string
  created_at?: string
  updated_at?: string
  step_completed: number
  source?: string
  user_agent?: string
  ip_address?: string
}

export type ChildProfile = {
  id?: string
  waitlist_signup_id: string
  child_name: string
  child_age: number
  child_interests?: string
  suggestions?: string
  created_at?: string
}

export type FeaturePreference = {
  id?: string
  waitlist_signup_id: string
  feature_name: string
  created_at?: string
}

export type Database = {
  public: {
    Tables: {
      waitlist_signups: {
        Row: WaitlistSignup
        Insert: Omit<WaitlistSignup, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<WaitlistSignup, "id" | "created_at" | "updated_at">>
      }
      child_profiles: {
        Row: ChildProfile
        Insert: Omit<ChildProfile, "id" | "created_at">
        Update: Partial<Omit<ChildProfile, "id" | "created_at">>
      }
      feature_preferences: {
        Row: FeaturePreference
        Insert: Omit<FeaturePreference, "id" | "created_at">
        Update: Partial<Omit<FeaturePreference, "id" | "created_at">>
      }
    }
    Views: {
      complete_signups: {
        Row: {
          id: string
          parent_name: string
          email: string
          created_at: string
          step_completed: number
          child_name: string | null
          child_age: number | null
          child_interests: string | null
          suggestions: string | null
          selected_features: string[] | null
        }
      }
    }
  }
}

// Create a single supabase client for server-side usage
const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return createClient<Database>(supabaseUrl, supabaseKey)
}

// Create a singleton instance for client-side usage
let clientSupabaseInstance: ReturnType<typeof createClient<Database>> | null = null

export const createClientSupabaseClient = () => {
  if (clientSupabaseInstance) return clientSupabaseInstance

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables")
  }

  clientSupabaseInstance = createClient<Database>(supabaseUrl, supabaseAnonKey)
  return clientSupabaseInstance
}

export default createServerSupabaseClient
