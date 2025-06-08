"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface NavigationProps {
  onSignupClick: () => void
}

export default function Navigation({ onSignupClick }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-white/20">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 relative">
              <Image
                src="/images/kaid-logo.png"
                alt="KaiD Robot Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              KaiD
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#video" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Watch Video
            </a>
            <a href="#features" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Features
            </a>
            <a href="#preview" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Preview
            </a>
            <a href="#contact" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Contact
            </a>
            <Button
              onClick={onSignupClick}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-2 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Try KaiD Now ✨
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              <a
                href="#video"
                className="text-gray-700 hover:text-purple-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Watch Video
              </a>
              <a
                href="#features"
                className="text-gray-700 hover:text-purple-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#preview"
                className="text-gray-700 hover:text-purple-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Preview
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-purple-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <Button
                onClick={() => {
                  setIsMenuOpen(false)
                  onSignupClick()
                }}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full"
              >
                Try KaiD Now ✨
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
