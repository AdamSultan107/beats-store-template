"use client";

import Image from "next/image";
import {
  FaYoutube,
  FaInstagram,
  FaSpotify,
  FaTiktok,
  FaPatreon,
} from "react-icons/fa";
import { motion } from "framer-motion";
import defaultLogo from "@/public/musicstockphoto.jpg";

type AboutProps = {
  brandName?: string;
};

export default function AboutMe({ brandName = "YourBeats" }: AboutProps) {
  return (
    <motion.section
      id="about"
      className="relative min-h-[70vh] bg-white text-black px-6 py-14 text-center overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
     {/* Background pink circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-300 opacity-40 rounded-full blur-xl"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-300 opacity-40 rounded-full blur-xl"></div>

      <div className="relative z-10">
        {/* Animated Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mx-auto mb-8"
        >
          <div className="w-[500px] aspect-[2/1] rounded-full overflow-hidden shadow-xl mx-auto">
            <Image
              src={defaultLogo}
              alt={`${brandName} logo`}
              className="object-cover w-full h-full"
              width={800}
              height={400}
            />
          </div>
        </motion.div>

        {/* Brand Header */}
        <motion.h1
          className="text-5xl font-bold text-pink-300 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {brandName}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-xl text-neutral-700 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Welcome to the official site of{" "}
          <span className="font-semibold text-pink-300">{brandName}</span> — a
          music producer and digital brand dedicated to pushing the boundaries
          of sound. Whether you're looking for beats, kits, or custom
          production, you're in the right place.
        </motion.p>

        {/* Social Icons */}
        <motion.div
          className="mt-10 flex justify-center gap-6 text-pink-300 text-4xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <FaYoutube className="hover:text-pink-400 cursor-pointer" />
          <FaInstagram className="hover:text-pink-400 cursor-pointer" />
          <FaSpotify className="hover:text-pink-400 cursor-pointer" />
          <FaTiktok className="hover:text-pink-400 cursor-pointer" />
          <FaPatreon className="hover:text-pink-500 cursor-pointer" />
        </motion.div>

        {/* Social Buttons */}
        <motion.div
          className="mt-12 space-y-4 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <a
            href="#"
            className="flex items-center gap-4 border border-pink-300 rounded-md py-4 px-6 text-base font-semibold text-pink-300 hover:bg-pink-100 transition"
          >
            <FaYoutube className="text-xl" /> Subscribe on YouTube
          </a>
          <a
            href="#"
            className="flex items-center gap-4 border border-pink-300 rounded-md py-4 px-6 text-base font-semibold text-pink-300 hover:bg-pink-100 transition"
          >
            <FaPatreon className="text-xl" /> Support on Patreon
          </a>
          <a
            href="#"
            className="flex items-center gap-4 border border-pink-300 rounded-md py-4 px-6 text-base font-semibold text-pink-300 hover:bg-pink-100 transition"
          >
            <FaSpotify className="text-xl" /> Listen on Spotify
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
