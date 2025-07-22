"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import Image from "next/image"
import Logo from "@/public/shadlogo.png"
import { FaShoppingCart, FaUser, FaBars } from "react-icons/fa"
import { AiOutlineSearch } from "react-icons/ai"
import AudioPlayer from "@/components/AudioPlayer"
import { Music } from "lucide-react"

const sections = ["beats", "about", "kits"]

export default function Navbar() {
  const [cartItems, setCartItems] = useState(0)
  const [activeSection, setActiveSection] = useState("")
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [showKitsDropdown, setShowKitsDropdown] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsSheetOpen(false)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0.1 }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const linkClass = (id: string) =>
    `text-medium font-medium lowercase transition ${
      activeSection === id
        ? "text-pink-500 underline underline-offset-4"
        : "text-neutral-800 hover:text-pink-400"
    }`

  const [kitsOpen, setKitsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white py-4">
      {/* Floating Logo Animation */}
      <style jsx>{`
        @keyframes floating {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        .animate-floating {
          animation: floating 2.5s ease-in-out infinite;
        }
      `}</style>

      <div className="w-full mx-auto px-4 grid grid-cols-[auto_1fr_auto] items-center">

        {/* Left: Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center animate-floating">
            <Music className="w-6 h-6 text-pink-500 mr-2" />
            <span className="text-xl font-bold text-pink-500">YourBeats</span>
          </a>
        </div>

        {/* Center: Nav + Audio */}
        <div className="hidden md:flex justify-center items-center font-[Arial_Narrow] relative">
          <div className="flex gap-6 text-[1.15rem]">
            <a
              href="/"
              className={linkClass("home")}
            >
              home
            </a>
            <a
              href="https://www.beatstars.com/shadx2"
              className={linkClass("beats")}
            >
              beats
            </a>
            <a href="/about" className={linkClass("about")}>
              about me
            </a>

            {/* Kits with dropdown */}
            <div className="relative">
              <button
                onClick={() => setKitsOpen(!kitsOpen)}
                className={`flex items-center gap-1 ${linkClass("kits")} focus:outline-none text-pink-300 cursor-pointer`}
              >
                kits <span className="text-pink-300">▾</span>
              </button>

              {kitsOpen && (
                <div className="absolute top-full left-0 mt-2 flex flex-col bg-white shadow-xl rounded-2xl py-4 px-6 w-48 z-50">
                  {[
                    "all kits",
                    "one shot kits",
                    "creative kits",
                    "sample libraries",
                    "bundles",
                  ].map((label, index) => (
                    <a
                      key={index}
                      href="#"
                      className="text-neutral-800 text-sm py-1 px-2 rounded-md transition hover:bg-pink-100 hover:text-pink-300 cursor-pointer"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="ml-16">
            <AudioPlayer />
          </div>
        </div>

        {/* Right: Icons */}
        <div className="flex justify-end items-center gap-4">
          <Button variant="ghost" className="h-10 w-10 p-0 text-neutral-800 cursor-pointer hover:text-pink-400 hover:bg-transparent">
            <AiOutlineSearch className="h-5 w-5" />
          </Button>
          <Button variant="ghost" className="h-10 w-10 p-0 text-neutral-800 cursor-pointer hover:text-pink-400 hover:bg-transparent relative">
            <FaShoppingCart className="h-5 w-5" />
            {cartItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-400 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                {cartItems}
              </span>
            )}
          </Button>
          <Button variant="ghost" className="h-10 w-10 p-0 text-neutral-800 cursor-pointer hover:text-pink-400 hover:bg-transparent">
            <FaUser className="h-5 w-5" />
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden h-10 w-10 p-0 text-neutral-800 hover:text-pink-400 hover:bg-transparent">
                <FaBars className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] sm:w-[400px] bg-white text-black pt-24">
              <SheetTitle className="sr-only">Main Menu</SheetTitle>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <Image src={Logo} alt="Shadx2 Logo" width={32} height={32} className="w-auto h-8" />
                </div>
                <div className="flex flex-col gap-4 text-[1.15rem] font-[Arial_Narrow]">
                  <a href="#beats" className={linkClass("beats") + " p-2"}>beats</a>
                  <a href="#about" className={linkClass("about") + " p-2"}>about me</a>
                  <a href="#kits" className={linkClass("kits") + " p-2"}>kits</a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
