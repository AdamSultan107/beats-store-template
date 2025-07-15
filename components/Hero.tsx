"use client";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative flex items-center justify-center bg-white text-black py-100 px-4">
      {/* Background pink circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-600 opacity-30 rounded-full blur-xl"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-600 opacity-20 rounded-full blur-xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative text-center max-w-2xl mx-auto"
      >
        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-pink-500 to-pink-300 bg-clip-text text-transparent">
            shadx2
          </span>
        </h1>

        <p className="text-2xl font-bold text-black mb-8">
          Discover amazing music, beats, and sound kits from your favorite producer
        </p>

        {/* Music player mockup */}
        <div className="bg-gray-100 rounded-xl shadow-md max-w-md mx-auto mb-8 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-300 rounded-lg flex items-center justify-center">
              <Music className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold">Latest Track</h3>
              <p className="text-sm text-gray-500">shadx2 Production</p>
            </div>
          </div>

          {/* Player controls */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <Button variant="ghost" size="icon">
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button 
              variant="default" 
              size="icon" 
              className="h-12 w-12 bg-gradient-to-r from-pink-500 to-pink-300 text-white"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            <Button variant="ghost" size="icon">
              <SkipForward className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Volume2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-300 rounded-full h-2 mb-2">
            <div className="bg-gradient-to-r from-pink-500 to-pink-300 h-2 rounded-full w-1/3 transition-all duration-300"></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>1:23</span>
            <span>3:45</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-gradient-to-r from-pink-500 to-pink-300 text-white" size="lg">
            Browse Tracks
          </Button>
          <Button variant="outline" className="border-pink-500 text-pink-500" size="lg">
            Shop Sound Kits
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
