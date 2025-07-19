"use client"

import { FaPlay, FaForward, FaBackward } from "react-icons/fa"

export default function AudioPlayer() {
  return (
    <div className="flex items-center gap-4">
      <button>
        <FaBackward className="text-pink-300 cursor-pointer hover:text-pink-600 h-7 w-7" />
      </button>
      <button>
        <FaPlay className="text-pink-300 cursor-pointer hover:text-pink-600 h-8 w-8" />
      </button>
      <button>
        <FaForward className="text-pink-300 cursor-pointer hover:text-pink-600 h-7 w-7" />
      </button>
    <span className="text-lg text-neutral-700 ml-2s" style={{ fontFamily: '"Arial Narrow", Arial, sans-serif' }}>
      Track #1
    </span>
    </div>
  )
}
