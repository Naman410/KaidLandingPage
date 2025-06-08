"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Music, ImageIcon, BookOpen, Gamepad2, BarChart3, Mic, Globe } from "lucide-react"

interface FeaturesProps {
  onSignupClick: () => void
}

const features = [
  {
    icon: MessageCircle,
    emoji: "🤖",
    title: "D.I.A. Chat Assistant",
    description:
      "Your child's friendly AI companion that helps them learn and explore AI concepts through fun conversations!",
    color: "from-purple-400 to-purple-500",
    bgColor: "from-purple-100 to-purple-200",
  },
  {
    icon: Music,
    emoji: "🎵",
    title: "Sound Cave",
    description:
      "Create amazing music, beats, and melodies with AI-powered composition tools designed for young creators!",
    color: "from-blue-400 to-blue-500",
    bgColor: "from-blue-100 to-blue-200",
  },
  {
    icon: ImageIcon,
    emoji: "🎨",
    title: "Art Studio",
    description: "Generate incredible artwork and illustrations using kid-friendly AI image creation tools!",
    color: "from-pink-400 to-pink-500",
    bgColor: "from-pink-100 to-pink-200",
  },
  {
    icon: BookOpen,
    emoji: "📚",
    title: "Story Treehouse",
    description: "Write and illustrate magical stories together with AI - where imagination meets technology!",
    color: "from-green-400 to-green-500",
    bgColor: "from-green-100 to-green-200",
  },
  {
    icon: Gamepad2,
    emoji: "🐾",
    title: "Train-a-Pet Game",
    description: "Learn AI training concepts by teaching adorable virtual pets new tricks and behaviors!",
    color: "from-orange-400 to-orange-500",
    bgColor: "from-orange-100 to-orange-200",
  },
  {
    icon: BarChart3,
    emoji: "🎓",
    title: "Learning Tracks",
    description: "Structured learning paths with fun lessons, quizzes, and achievements to master AI step by step!",
    color: "from-indigo-400 to-indigo-500",
    bgColor: "from-indigo-100 to-indigo-200",
  },
  {
    icon: Mic,
    emoji: "🎤",
    title: "Voice Magic",
    description:
      "Talk naturally with KaiD using voice commands - making AI interaction as easy as having a conversation!",
    color: "from-teal-400 to-teal-500",
    bgColor: "from-teal-100 to-teal-200",
  },
  {
    icon: Globe,
    emoji: "🌍",
    title: "World Languages",
    description: "Learn and create in multiple languages, making AI education accessible to children everywhere!",
    color: "from-red-400 to-red-500",
    bgColor: "from-red-100 to-red-200",
  },
]

export default function Features({ onSignupClick }: FeaturesProps) {
  return (
    <section id="features" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 drop-shadow-lg">
            Amazing Features for
            <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              Future AI Wizards! ✨
            </span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto font-bold">
            Discover magical AI zones where creativity meets learning in the most fun way possible! 🎭🎨🎵
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 hover:scale-105 bg-gradient-to-br ${feature.bgColor} border-0 shadow-xl`}
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <div className="text-4xl mb-2 animate-bounce">{feature.emoji}</div>
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-black text-gray-800 mb-3 group-hover:text-purple-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed font-medium">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-black text-gray-800 mb-4">Ready to Start the Adventure? 🚀</h3>
            <p className="text-lg text-gray-600 mb-6 font-bold">
              Join thousands of families already using the most exciting AI learning platform for kids!
            </p>
            <div className="flex justify-center items-center space-x-4 text-2xl mb-6">
              <span className="animate-bounce">🎨</span>
              <span className="animate-bounce animation-delay-200">🎵</span>
              <span className="animate-bounce animation-delay-400">📚</span>
              <span className="animate-bounce animation-delay-600">🤖</span>
              <span className="animate-bounce animation-delay-800">✨</span>
            </div>
            <div className="flex justify-center">
              <Button
                onClick={onSignupClick}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 sm:px-10 py-6 text-lg sm:text-xl font-black rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Start Your KaiD Adventure Now! 🚀
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
