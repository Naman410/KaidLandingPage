"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, Brain, Heart, Star, Zap } from "lucide-react"

interface HeroProps {
  onSignupClick: () => void
}

export default function Hero({ onSignupClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden px-4 py-32 pt-40">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-60 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-300 rounded-full opacity-60 animate-float-delayed"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-blue-300 rounded-full opacity-60 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-18 h-18 bg-purple-300 rounded-full opacity-60 animate-float-delayed"></div>

        {/* Floating emojis */}
        <div className="absolute top-32 left-1/4 text-4xl animate-bounce-slow">🎨</div>
        <div className="absolute top-48 right-1/4 text-4xl animate-bounce-slow animation-delay-1000">🎵</div>
        <div className="absolute bottom-32 left-1/3 text-4xl animate-bounce-slow animation-delay-2000">📚</div>
        <div className="absolute bottom-48 right-1/3 text-4xl animate-bounce-slow animation-delay-3000">🤖</div>
      </div>

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Main headline with playful styling */}
        <div className="mb-8">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg mb-6">
            <Star className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="text-purple-700 font-bold">AI Learning Made Magical!</span>
            <Star className="w-5 h-5 text-yellow-500 ml-2" />
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight drop-shadow-lg">
            Welcome to
            <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
              KaiD's World! 🌟
            </span>
          </h1>
        </div>

        {/* Subtitle with playful design */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 mb-12 shadow-xl max-w-4xl mx-auto">
          <p className="text-2xl md:text-3xl text-gray-800 mb-6 leading-relaxed font-bold">
            A magical AI studio where kids aged 5-10 create amazing music, art, and stories! 🎭
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Safe • Educational • Fun • Voice-Powered • Parent-Approved ✨
          </p>
        </div>

        {/* CTA Button - More prominent and centered */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            onClick={onSignupClick}
            size="lg"
            className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 hover:from-yellow-500 hover:via-pink-500 hover:to-purple-600 text-white px-8 sm:px-16 py-8 text-2xl font-black rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 border-4 border-white"
          >
            🚀 Start Your Adventure! ✨
          </Button>
        </div>

        {/* Trust indicators with playful design */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl max-w-2xl mx-auto">
          <p className="text-gray-600 mb-4 font-bold">Trusted by Amazing Parents Worldwide! 🌍</p>
          <div className="flex justify-center items-center space-x-6 text-3xl">
            <div className="animate-bounce">👨‍👩‍👧‍👦</div>
            <div className="animate-bounce animation-delay-200">🌟</div>
            <div className="animate-bounce animation-delay-400">🎓</div>
            <div className="animate-bounce animation-delay-600">🔒</div>
            <div className="animate-bounce animation-delay-800">❤️</div>
          </div>
          <p className="text-sm text-gray-500 mt-4">COPPA Compliant • Child-Safe AI • Parent Dashboard</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite;
          animation-delay: 3s;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-3000 { animation-delay: 3s; }
      `}</style>
    </section>
  )
}
