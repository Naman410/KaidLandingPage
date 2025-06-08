"use client"

import Hero from "@/components/hero"
import VideoSection from "@/components/video-section"
import Features from "@/components/features"
import AppPreview from "@/components/app-preview"
import ContactUs from "@/components/contact-us"
import Footer from "@/components/footer"
import Navigation from "@/components/navigation"

export default function LandingPage() {
  const handleSignupClick = () => {
    window.open("https://kaid.lovable.app/", "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400">
      <Navigation onSignupClick={handleSignupClick} />
      <Hero onSignupClick={handleSignupClick} />
      <VideoSection onSignupClick={handleSignupClick} />
      <AppPreview />
      <Features onSignupClick={handleSignupClick} />
      <ContactUs />
      <Footer />
    </div>
  )
}
