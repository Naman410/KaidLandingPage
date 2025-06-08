"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Music, Palette, BookOpen, ArrowLeft } from "lucide-react"

export default function AppPreview() {
  return (
    <section id="preview" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 drop-shadow-lg">
            Sneak Peek into
            <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              KaiD's Magic! ✨
            </span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto font-bold">
            Experience the colorful, playful world where AI learning becomes an adventure! 🎨🎵📚
          </p>
        </div>

        {/* App Preview Container */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          <div className="bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 rounded-2xl p-6 mb-6">
            {/* Navigation Bar */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 mb-6 shadow-lg">
              <div className="flex items-center">
                <Button variant="ghost" className="text-gray-600 hover:text-purple-600">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Hub
                </Button>
                <div className="flex-1 text-center">
                  <h3 className="text-2xl font-black text-gray-800">🎵 Sound Cave 🎵</h3>
                  <p className="text-gray-600">Create amazing music with AI!</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Music Generator */}
              <Card className="bg-gradient-to-br from-yellow-200 to-yellow-300 border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h4 className="text-2xl font-black text-gray-800 mb-2">🎼 Music Generator 🎼</h4>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-lg font-bold text-gray-800 mb-2 block">What kind of music? 🎭</label>
                      <select className="w-full p-3 rounded-xl border-2 border-gray-300 bg-white text-gray-700 font-medium">
                        <option>Choose a style...</option>
                        <option>🎸 Rock & Roll</option>
                        <option>🎹 Classical</option>
                        <option>🎤 Pop Music</option>
                        <option>🎺 Jazz</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-lg font-bold text-gray-800 mb-2 block">What's the vibe? 🌈</label>
                      <select className="w-full p-3 rounded-xl border-2 border-gray-300 bg-white text-gray-700 font-medium">
                        <option>Pick a mood...</option>
                        <option>😊 Happy & Upbeat</option>
                        <option>😌 Calm & Peaceful</option>
                        <option>🎉 Energetic & Fun</option>
                        <option>🌙 Dreamy & Soft</option>
                      </select>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white font-black py-4 rounded-xl text-lg shadow-lg transform hover:scale-105 transition-all">
                      Create My Music! 🎵
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Music Player */}
              <Card className="bg-gradient-to-br from-blue-200 to-purple-200 border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h4 className="text-2xl font-black text-gray-800 mb-2">🎧 Music Player 🎧</h4>
                  </div>

                  <div className="text-center space-y-6">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                      <Music className="w-12 h-12 text-white" />
                    </div>

                    <p className="text-lg font-bold text-gray-700">Choose your style and mood, then hit create!</p>

                    <div className="bg-white/80 rounded-xl p-4">
                      <p className="text-gray-600 font-medium">Your amazing music will appear here! 🎼</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Sounds */}
            <Card className="mt-6 bg-gradient-to-br from-cyan-200 to-blue-200 border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="text-center">
                  <h4 className="text-2xl font-black text-gray-800 mb-2">🎹 Quick Sounds 🎹</h4>
                  <p className="text-gray-700 font-bold mb-4">Tap these buttons to play fun sounds!</p>

                  <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                    {["🥁", "🎸", "🎹", "🎺", "🎷", "🎻", "🪘", "🎤"].map((emoji, index) => (
                      <Button
                        key={index}
                        className="aspect-square bg-white hover:bg-gray-100 text-2xl rounded-xl shadow-lg transform hover:scale-110 transition-all"
                      >
                        {emoji}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Description */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              This is just one of many magical zones in KaiD! 🌟
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl p-4">
                <Palette className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="font-bold text-purple-800">🎨 Art Studio</p>
                <p className="text-sm text-purple-600">Create amazing artwork with AI!</p>
              </div>
              <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl p-4">
                <Music className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="font-bold text-blue-800">🎵 Sound Cave</p>
                <p className="text-sm text-blue-600">Compose music like a pro!</p>
              </div>
              <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-xl p-4">
                <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="font-bold text-green-800">📚 Story Treehouse</p>
                <p className="text-sm text-green-600">Write magical stories together!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
