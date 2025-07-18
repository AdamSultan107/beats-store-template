import Image from "next/image"
import {
  FaYoutube,
  FaDiscord,
  FaInstagram,
  FaTwitter,
  FaSpotify,
  FaTiktok,
  FaPatreon
} from "react-icons/fa"
import Logo from "@/public/shadlogo.png"

export default function AboutMe() {
  return (
    <section id="about" className="bg-white text-black px-6 py-16 text-center">
      {/* Header + Image */}
      <div className="flex flex-col items-center space-y-4">
        <Image
          src={Logo}
          alt="shadx2 profile"
          width={120}
          height={120}
          className="rounded-full shadow-md"
        />
        <h1 className="text-4xl font-bold text-pink-300">shadx2</h1>
        <p className="text-lg text-neutral-700 max-w-xl">
          Welcome to the official website of <span className="font-semibold text-pink-300">shadx2</span> —
          a music producer and digital brand dedicated to pushing the boundaries of sound. Whether you're
          looking for beats, kits, or custom production, you're in the right place.
        </p>
      </div>

      {/* Social Icons */}
      <div className="mt-10 flex justify-center gap-6 text-pink-300 text-2xl">
        <FaYoutube className="hover:text-pink-300 cursor-pointer" />
        <FaDiscord className="hover:text-pink-300 cursor-pointer" />
        <FaInstagram className="hover:text-pink-300 cursor-pointer" />
        <FaTwitter className="hover:text-pink-300 cursor-pointer" />
        <FaSpotify className="hover:text-pink-300 cursor-pointer" />
        <FaTiktok className="hover:text-pink-300 cursor-pointer" />
        <FaPatreon className="hover:text-pink-600 cursor-pointer" />
      </div>

      {/* Social Buttons */}
      <div className="mt-12 space-y-4 max-w-md mx-auto">
        <a
          href="#"
          className="block border border-pink-300 rounded-md py-3 px-4 text-sm font-medium text-pink-300 hover:bg-pink-100 transition"
        >
          🎥 &nbsp; Subscribe on YouTube
        </a>
        <a
          href="#"
          className="block border border-pink-300 rounded-md py-3 px-4 text-sm font-medium text-pink-300 hover:bg-pink-100 transition"
        >
          🎮 &nbsp; Join the Discord
        </a>
        <a
          href="#"
          className="block border border-pink-300 rounded-md py-3 px-4 text-sm font-medium text-pink-300 hover:bg-pink-100 transition"
        >
          🌟 &nbsp; Support on Patreon
        </a>
        <a
          href="#"
          className="block border border-pink-300 rounded-md py-3 px-4 text-sm font-medium text-pink-300 hover:bg-pink-100 transition"
        >
          🎧 &nbsp; Stream on Spotify
        </a>
      </div>

      {/* Footer */}
      <p className="mt-16 text-sm text-neutral-500">
        &copy; {new Date().getFullYear()} shadx2. All rights reserved.
      </p>
    </section>
  )
}
