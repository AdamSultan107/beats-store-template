"use client"

import { useRef, useState, useEffect } from "react"
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa"

{/* DOWNLOAD AUDIO FILES OF YOUR CHOICE AND PUT THEM HERE. REPLACE THE ORIGINAL TRACKS, THEY ARE NOT FOR COMMERCIAL USE */}
const tracks = [
  { title: "Track #1", src: "/track1.mp3" },
  { title: "Track #2", src: "/track2.mp3" },
  { title: "Track #3", src: "/track3.mp3" },
]

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [trackIndex, setTrackIndex] = useState(0)

  const playCurrentTrack = () => {
    const audio = audioRef.current
    if (audio) {
      audio.load()
      audio.play().catch(err => {
        console.error("Playback failed:", err)
      })
      setIsPlaying(true)
    }
  }

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().catch(err => {
        console.error("Playback failed:", err)
      })
      setIsPlaying(true)
    }
  }

  const nextTrack = () => {
    const nextIndex = (trackIndex + 1) % tracks.length
    setTrackIndex(nextIndex)
    setIsPlaying(false)
  }

  const prevTrack = () => {
    const prevIndex = (trackIndex - 1 + tracks.length) % tracks.length
    setTrackIndex(prevIndex)
    setIsPlaying(false)
  }

  const handleEnded = () => {
    nextTrack()
  }

  useEffect(() => {
    if (isPlaying) {
      playCurrentTrack()
    }
  }, [trackIndex])

  return (
    <div className="flex items-center gap-4">
      <audio
        ref={audioRef}
        src={tracks[trackIndex].src}
        onEnded={handleEnded}
        preload="auto"
      />

      <button onClick={prevTrack}>
        <FaBackward className="text-pink-300 cursor-pointer hover:text-pink-600 h-7 w-7" />
      </button>

      <button onClick={togglePlay}>
        {isPlaying ? (
          <FaPause className="text-pink-300 cursor-pointer hover:text-pink-600 h-8 w-8" />
        ) : (
          <FaPlay className="text-pink-300 cursor-pointer hover:text-pink-600 h-8 w-8" />
        )}
      </button>

      <button onClick={nextTrack}>
        <FaForward className="text-pink-300 cursor-pointer hover:text-pink-600 h-7 w-7" />
      </button>

      <span
        className="text-xl font-bold text-neutral-700"
        style={{ fontFamily: '"Arial Narrow", Arial, sans-serif' }}
      >
        {tracks[trackIndex].title}
      </span>
    </div>
  )
}
