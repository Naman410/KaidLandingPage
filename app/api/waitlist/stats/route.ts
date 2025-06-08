import { NextResponse } from "next/server"
import waitlistService from "@/lib/waitlist-service"

export async function GET() {
  try {
    const stats = await waitlistService.getWaitlistStats()
    return NextResponse.json(stats)
  } catch (error: any) {
    console.error("Error fetching waitlist stats:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
