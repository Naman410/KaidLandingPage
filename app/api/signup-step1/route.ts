import { type NextRequest, NextResponse } from "next/server"
import createServerSupabaseClient from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { parentName, email } = await request.json()

    // Validate input
    if (!parentName || !email) {
      return NextResponse.json({ error: "Parent name and email are required" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from("waitlist_signups")
      .select("id, step_completed")
      .eq("email", email.toLowerCase())
      .maybeSingle()

    // If user exists and has completed step 2, return success
    if (existingUser && existingUser.step_completed === 2) {
      return NextResponse.json({
        success: true,
        message: "You've already completed the signup process!",
        data: {
          parentName,
          email: email.toLowerCase(),
          alreadyCompleted: true,
        },
      })
    }

    // If user exists but hasn't completed step 2, update their info
    if (existingUser) {
      const { error: updateError } = await supabase
        .from("waitlist_signups")
        .update({
          parent_name: parentName,
          user_agent: request.headers.get("user-agent") || undefined,
          ip_address: request.ip || undefined,
        })
        .eq("id", existingUser.id)

      if (updateError) {
        console.error("Error updating existing signup:", updateError)
        return NextResponse.json({ error: "Error updating your information" }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        message: "Welcome back! Let's complete your signup.",
        data: {
          parentName,
          email: email.toLowerCase(),
          id: existingUser.id,
        },
      })
    }

    // Create new user
    const { data: newSignup, error: insertError } = await supabase
      .from("waitlist_signups")
      .insert({
        parent_name: parentName,
        email: email.toLowerCase(),
        step_completed: 1,
        source: "landing_page",
        user_agent: request.headers.get("user-agent") || undefined,
        ip_address: request.ip || undefined,
      })
      .select("id")
      .single()

    if (insertError) {
      console.error("Error inserting new signup:", insertError)

      // Check if it's a unique constraint error
      if (insertError.code === "23505") {
        return NextResponse.json({ error: "This email is already registered" }, { status: 409 })
      }

      return NextResponse.json({ error: "Error saving your information" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Step 1 completed successfully",
      data: {
        parentName,
        email: email.toLowerCase(),
        id: newSignup.id,
      },
    })
  } catch (error) {
    console.error("Error in KaiD signup step 1:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
