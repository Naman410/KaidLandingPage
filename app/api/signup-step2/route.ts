import { type NextRequest, NextResponse } from "next/server"
import createServerSupabaseClient from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { email, childName, childAge, childInterests, selectedFeatures, suggestions } = await request.json()

    // Validate required fields
    if (!email || !childName || childAge === undefined) {
      return NextResponse.json({ error: "Email, child name, and age are required" }, { status: 400 })
    }

    // Validate age range (0-15 years)
    const age = Number.parseInt(String(childAge))
    if (isNaN(age) || age < 0 || age > 15) {
      return NextResponse.json({ error: "Child age must be between 0-15 years" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()

    // Find the user by email
    const { data: existingUser } = await supabase
      .from("waitlist_signups")
      .select("id, step_completed")
      .eq("email", email.toLowerCase())
      .maybeSingle()

    if (!existingUser) {
      return NextResponse.json({ error: "Please complete step 1 first" }, { status: 400 })
    }

    // Start a transaction using supabase functions
    // First, update the waitlist signup to mark step 2 as completed
    const { error: updateError } = await supabase
      .from("waitlist_signups")
      .update({
        step_completed: 2,
      })
      .eq("id", existingUser.id)

    if (updateError) {
      console.error("Error updating signup completion status:", updateError)
      return NextResponse.json({ error: "Error updating your information" }, { status: 500 })
    }

    // Insert child profile
    const { error: childProfileError } = await supabase.from("child_profiles").insert({
      waitlist_signup_id: existingUser.id,
      child_name: childName,
      child_age: age,
      child_interests: childInterests || null,
      suggestions: suggestions || null,
    })

    if (childProfileError) {
      console.error("Error inserting child profile:", childProfileError)
      return NextResponse.json({ error: "Error saving child information" }, { status: 500 })
    }

    // Insert feature preferences if any are selected
    if (selectedFeatures && selectedFeatures.length > 0) {
      const featurePreferences = selectedFeatures.map((feature) => ({
        waitlist_signup_id: existingUser.id,
        feature_name: feature,
      }))

      const { error: featureError } = await supabase.from("feature_preferences").insert(featurePreferences)

      if (featureError) {
        console.error("Error inserting feature preferences:", featureError)
        // Continue anyway since this is not critical
      }
    }

    return NextResponse.json({
      success: true,
      message: "Registration completed successfully! Welcome to the KaiD family! 🎉",
      data: {
        email: email.toLowerCase(),
        childName,
        childAge: age,
        featuresSelected: selectedFeatures ? selectedFeatures.length : 0,
      },
    })
  } catch (error) {
    console.error("Error in KaiD signup step 2:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
