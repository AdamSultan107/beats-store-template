'use client'

import { Button } from "@/components/ui/button"
import { FaPlay, FaShoppingCart, FaHeart } from "react-icons/fa"

const tracks = [
  {
    title: "Electric Dreams",
    genre: "Electronic",
    price: "$19.99",
    duration: "3:24",
    bpm: "128 BPM",
  },
  {
    title: "Neon Nights",
    genre: "Synthwave",
    price: "$24.99",
    duration: "4:12",
    bpm: "140 BPM",
  },
  {
    title: "Bass Foundation",
    genre: "Hip-Hop",
    price: "$15.99",
    duration: "2:45",
    bpm: "110 BPM",
  },
  {
    title: "Ambient Flow",
    genre: "Ambient",
    price: "$22.99",
    duration: "5:33",
    bpm: "85 BPM",
  },
]

export default function TracksSection() {
  return (
    <section className="bg-black text-white py-20 text-center">
      <h2 className="text-5xl font-extrabold mb-4">
        Featured <span className="text-pink-500">Tracks</span>
      </h2>
      <p className="text-lg text-gray-300 mb-12">
        Discover our latest music productions, beats, and instrumentals
      </p>

      <div className="flex flex-wrap justify-center gap-8 px-4">
        {tracks.map((track, index) => (
          <div
            key={index}
            className="bg-neutral-900 p-6 rounded-xl w-full max-w-md flex flex-col items-center text-center"
          >
            <div className="flex items-center justify-center mb-4 bg-gradient-to-br from-pink-500 to-pink-300 p-4 rounded-full">
              <FaPlay className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-1">{track.title}</h3>
            <p className="text-gray-400 mb-2">{track.genre}</p>
            <p className="text-gray-500 text-sm mb-4">
              {track.duration} • {track.bpm}
            </p>
            <p className="text-pink-500 font-bold text-lg mb-4">{track.price}</p>
            <div className="flex items-center gap-4">
              <Button className="bg-pink-500 hover:bg-pink-600 text-white px-6">
                <FaShoppingCart className="mr-2" /> Buy
              </Button>
              <FaHeart className="text-gray-500 hover:text-pink-500 cursor-pointer" />
            </div>
          </div>
        ))}
      </div>

      <Button className="mt-12 bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 text-lg font-semibold">
        Load More Tracks
      </Button>
    </section>
  )
}
