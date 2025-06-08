import { type NextRequest, NextResponse } from "next/server"
import waitlistService from "@/lib/waitlist-service"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get("email")
    const id = searchParams.get("id")

    if (email) {
      const signup = await waitlistService.getSignupByEmail(email)
      if (!signup) {
        return NextResponse.json({ error: "Signup not found" }, { status: 404 })
      }
      return NextResponse.json(signup)
    } else if (id) {
      const signup = await waitlistService.getSignupById(id)
      if (!signup) {
        return NextResponse.json({ error: "Signup not found" }, { status: 404 })
      }
      return NextResponse.json(signup)
    } else {
      const signups = await waitlistService.getAllSignups()
      return NextResponse.json(signups)
    }
  } catch (error: any) {
    console.error("Error fetching waitlist data:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
