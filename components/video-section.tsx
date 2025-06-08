"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Star, Play } from "lucide-react"

interface VideoSectionProps {
  onSignupClick: () => void
}

export default function VideoSection({ onSignupClick }: VideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLIFrameElement>(null)

  const handlePlayClick = () => {
    setIsPlaying(true)
    // Add YouTube API parameter to start playing
    if (videoRef.current) {
      const currentSrc = videoRef.current.src
      videoRef.current.src = currentSrc + "&autoplay=1"
    }
  }

  return (
    <section id="video" className="py-20 px-4 bg-gradient-to-br from-purple-300 via-pink-200 to-blue-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 drop-shadow-lg">
            Discover the Magic!
            <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              See KaiD in Action ✨
            </span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto font-bold mb-8">
            Watch how KaiD brings AI learning to life for kids with fun, interactive experiences that spark creativity
            and imagination!
          </p>
        </div>

        {/* Tablet Frame */}
        <div className="relative max-w-4xl mx-auto">
          {/* Tablet Body */}
          <div className="bg-gradient-to-r from-blue-400 to-purple-400 rounded-[40px] p-4 md:p-8 shadow-2xl transform rotate-0 relative">
            {/* Tablet Screen */}
            <div className="bg-black rounded-[24px] overflow-hidden relative aspect-[16/10] shadow-inner">
              {/* Video Overlay (shows before play) */}
              {!isPlaying && (
                <div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm flex flex-col items-center justify-center cursor-pointer z-10"
                  onClick={handlePlayClick}
                >
                  <div className="bg-white/90 rounded-full p-5 shadow-xl transform hover:scale-110 transition-all duration-300 mb-4">
                    <Play className="w-12 h-12 text-purple-600 fill-purple-600" />
                  </div>
                  <p className="text-white text-xl md:text-2xl font-bold drop-shadow-lg">Click to Play Video</p>
                </div>
              )}

              {/* YouTube Embed */}
              <iframe
                ref={videoRef}
                className="w-full h-full"
                src="https://www.youtube.com/embed/Sm3c2wSPJXo?rel=0"
                title="KaiD Introduction Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Tablet Home Button */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full border-4 border-blue-300 bg-white/50"></div>

            {/* Tablet Camera */}
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-900"></div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-8 -left-8 w-16 h-16 bg-yellow-300 rounded-full opacity-70 animate-float"></div>
          <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-pink-300 rounded-full opacity-70 animate-float-delayed"></div>
          <div className="absolute top-1/2 -right-12 text-4xl animate-bounce-slow">✨</div>
          <div className="absolute bottom-1/4 -left-12 text-4xl animate-bounce-slow animation-delay-1000">🎮</div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-xl text-white/90 font-bold mb-6">
            Ready to bring this magical AI learning experience to your child?
          </p>
          <Button
            onClick={onSignupClick}
            size="lg"
            className="bg-gradient-to-r from-yellow-400 to-purple-500 hover:from-yellow-500 hover:to-purple-600 text-white px-10 py-6 text-xl font-black rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-white"
          >
            <Star className="w-5 h-5 mr-2" />
            Try KaiD Now!
            <Star className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
