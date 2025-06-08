"use client"

import { Heart, Shield, Globe, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 relative mr-4">
                <Image
                  src="/images/kaid-logo.png"
                  alt="KaiD Robot Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <h3 className="text-3xl font-black">KaiD</h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md text-lg font-medium leading-relaxed">
              A magical, voice-first, Pixar-style AI studio where children learn about AI, create amazing content, and
              develop into confident AI-native individuals! ✨
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-sm text-gray-400 bg-gray-800 rounded-full px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                COPPA Compliant
              </div>
              <div className="flex items-center text-sm text-gray-400 bg-gray-800 rounded-full px-4 py-2">
                <Heart className="w-4 h-4 mr-2" />
                Child-Safe AI
              </div>
              <div className="flex items-center text-sm text-gray-400 bg-gray-800 rounded-full px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                Parent Approved
              </div>
            </div>
            <Button
              onClick={() => window.open("https://kaid.lovable.app/", "_blank")}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-2 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Try KaiD Now ✨
            </Button>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-black mb-6 text-blue-300">Get in Touch</h4>
            <div className="space-y-4 text-gray-300">
              <p className="flex items-center text-lg font-medium">
                <Globe className="w-5 h-5 mr-3 text-blue-400" />
                help.kaid@gmail.com
              </p>
              <p className="text-sm leading-relaxed">
                We'd love to hear from you! Reach out with questions, feedback, or partnership inquiries. Let's make AI
                learning magical together! 🌟
              </p>
              <div className="flex space-x-2 text-2xl">
                <span className="animate-bounce">🎨</span>
                <span className="animate-bounce animation-delay-200">🎵</span>
                <span className="animate-bounce animation-delay-400">📚</span>
                <span className="animate-bounce animation-delay-600">🤖</span>
              </div>
              <div className="pt-4">
                <a
                  href="https://kaid.lovable.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-blue-200 underline font-medium"
                >
                  Visit KaiD App →
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-lg">
            © {new Date().getFullYear()} KaiD. All rights reserved. Made with ❤️ for the next generation of AI-native
            kids! 🚀✨
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Empowering young minds to create, learn, and grow with AI technology in a safe and magical environment.
          </p>
        </div>
      </div>
    </footer>
  )
}
