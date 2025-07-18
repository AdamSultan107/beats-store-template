'use client';

import { Button } from "@/components/ui/button";
import { FaPlay, FaShoppingCart, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

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
];

export default function TracksSection() {
  return (
    <section className="bg-white text-black py-20 text-center px-4">
      <h2 className="text-4xl md:text-5xl text-pink-300 font-extrabold mb-4 font-['Arial_Narrow']">
        featured tracks!
      </h2>
      <p className="text-lg text-neutral-600 font-bold mb-12 font-['Arial_Narrow']">
        discover my latest music productions, beats, and instrumentals
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {tracks.map((track, index) => (
          <motion.div
            key={index}
            className="bg-neutral-100 rounded-2xl shadow-md p-6 flex flex-col items-center transition hover:scale-105 hover:shadow-lg cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-center mb-4 bg-gradient-to-br from-pink-400 to-pink-300 p-4 rounded-full">
              <FaPlay className="text-white text-xl" />
            </div>
            <h3 className="text-lg font-bold mb-1 font-['Arial_Narrow']">{track.title}</h3>
            <p className="text-pink-500 font-semibold text-sm mb-2">{track.genre.toLowerCase()}</p>
            <p className="text-neutral-500 text-sm mb-4">
              {track.duration} • {track.bpm}
            </p>
            <p className="text-pink-500 font-bold text-lg mb-4">{track.price}</p>
            <div className="flex items-center gap-4">
              <Button className="bg-gradient-to-r from-pink-400 to-pink-300 text-white px-6 cursor-pointer">
                <FaShoppingCart className="mr-2" /> buy
              </Button>
              {/* <FaHeart className="text-neutral-400 hover:text-pink-400 text-xl cursor-pointer" /> */}
            </div>
          </motion.div>
        ))}
      </div>

      <Button className="mt-12 bg-gradient-to-r from-pink-400 to-pink-300 text-white px-8 py-4 text-lg font-semibold cursor-pointer">
        load more
      </Button>
    </section>
  );
}
