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

export type CompleteSignup = {
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

// Create a Supabase client
const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

export class WaitlistService {
  private supabase = createSupabaseClient()

  // Get all waitlist signups
  async getAllSignups(): Promise<CompleteSignup[]> {
    const { data, error } = await this.supabase
      .from("complete_signups")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  }

  // Get a single signup by ID
  async getSignupById(id: string): Promise<CompleteSignup | null> {
    const { data, error } = await this.supabase.from("complete_signups").select("*").eq("id", id).single()

    if (error) throw error
    return data
  }

  // Get a signup by email
  async getSignupByEmail(email: string): Promise<CompleteSignup | null> {
    const { data, error } = await this.supabase
      .from("complete_signups")
      .select("*")
      .eq("email", email.toLowerCase())
      .maybeSingle()

    if (error) throw error
    return data
  }

  // Create a new signup (step 1)
  async createSignup(signup: {
    parentName: string
    email: string
    userAgent?: string
    ipAddress?: string
  }): Promise<string> {
    const { data, error } = await this.supabase
      .from("waitlist_signups")
      .insert({
        parent_name: signup.parentName,
        email: signup.email.toLowerCase(),
        step_completed: 1,
        source: "landing_page",
        user_agent: signup.userAgent,
        ip_address: signup.ipAddress,
      })
      .select("id")
      .single()

    if (error) throw error
    return data.id
  }

  // Complete signup (step 2)
  async completeSignup(data: {
    waitlistSignupId: string
    childName: string
    childAge: number
    childInterests?: string
    suggestions?: string
    selectedFeatures?: string[]
  }): Promise<void> {
    // Update the waitlist signup to mark step 2 as completed
    const { error: updateError } = await this.supabase
      .from("waitlist_signups")
      .update({
        step_completed: 2,
      })
      .eq("id", data.waitlistSignupId)

    if (updateError) throw updateError

    // Insert child profile
    const { error: childProfileError } = await this.supabase.from("child_profiles").insert({
      waitlist_signup_id: data.waitlistSignupId,
      child_name: data.childName,
      child_age: data.childAge,
      child_interests: data.childInterests || null,
      suggestions: data.suggestions || null,
    })

    if (childProfileError) throw childProfileError

    // Insert feature preferences if any are selected
    if (data.selectedFeatures && data.selectedFeatures.length > 0) {
      const featurePreferences = data.selectedFeatures.map((feature) => ({
        waitlist_signup_id: data.waitlistSignupId,
        feature_name: feature,
      }))

      const { error: featureError } = await this.supabase.from("feature_preferences").insert(featurePreferences)

      if (featureError) throw featureError
    }
  }

  // Get waitlist statistics
  async getWaitlistStats() {
    const signups = await this.getAllSignups()

    const totalSignups = signups.length
    const completedSignups = signups.filter((s) => s.step_completed === 2).length
    const conversionRate = totalSignups > 0 ? Math.round((completedSignups / totalSignups) * 100) : 0

    // Calculate average age
    const validAges = signups.filter((s) => s.child_age !== null).map((s) => s.child_age) as number[]
    const averageAge =
      validAges.length > 0 ? Math.round((validAges.reduce((sum, age) => sum + age, 0) / validAges.length) * 10) / 10 : 0

    // Count feature preferences
    const featureCounts: Record<string, number> = {}
    signups.forEach((signup) => {
      if (signup.selected_features) {
        signup.selected_features.forEach((feature: string) => {
          featureCounts[feature] = (featureCounts[feature] || 0) + 1
        })
      }
    })

    // Sort features by popularity
    const topFeatures = Object.entries(featureCounts)
      .map(([feature, count]) => ({ feature, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Calculate age distribution
    const ageCounts: Record<number, number> = {}
    validAges.forEach((age) => {
      ageCounts[age] = (ageCounts[age] || 0) + 1
    })

    const ageDistribution = Object.entries(ageCounts)
      .map(([age, count]) => ({ age: Number.parseInt(age), count }))
      .sort((a, b) => a.age - b.age)

    return {
      totalSignups,
      completedSignups,
      conversionRate,
      averageAge,
      topFeatures,
      ageDistribution,
    }
  }
}

export default new WaitlistService()
