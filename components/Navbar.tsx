"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import Image from "next/image"
import Logo from "@/public/shadlogo.png"
import { FaShoppingCart, FaUser, FaBars } from "react-icons/fa"
import { AiOutlineSearch } from "react-icons/ai"
import AudioPlayer from "@/components/AudioPlayer"

const sections = ["beats", "about", "kits"]

export default function Navbar() {
  const [cartItems, setCartItems] = useState(0)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActiveSection(visible.target.id)
      },
      {
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0.1,
      }
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

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-neutral-200 py-4">
      <div className="w-full mx-auto px-4 grid grid-cols-[auto_1fr_auto] items-center">

        {/* Left: Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <Image src={Logo} alt="Shadx2 Logo" width={150} height={150} />
          </a>
        </div>

        {/* Center: Nav + AudioPlayer side by side */}
        <div className="hidden md:flex justify-center items-center" style={{ fontFamily: "Arial Narrow, Arial, sans-serif" }}>
          {/* Nav Links */}
          <div className="flex gap-6" style={{ fontFamily: "Arial Narrow, Arial, sans-serif", fontSize: "1.15rem" }}>
            <a href="#beats" className={linkClass("beats")} style={{ fontFamily: "Arial Narrow, Arial, sans-serif", fontSize: "1.15rem" }}>beats</a>
            <a href="#about" className={linkClass("about")} style={{ fontFamily: "Arial Narrow, Arial, sans-serif", fontSize: "1.15rem" }}>about me</a>
            <a href="#kits" className={linkClass("kits")} style={{ fontFamily: "Arial Narrow, Arial, sans-serif", fontSize: "1.15rem" }}>kits</a>
          </div>
          {/* Audio Player */}
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
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden h-10 w-10 p-0 text-neutral-800 hover:text-pink-400 hover:bg-transparent">
                <FaBars className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] sm:w-[400px] bg-white text-black">
              <SheetTitle className="sr-only">Main Menu</SheetTitle>
              <div className="flex flex-col gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <Image src={Logo} alt="Shadx2 Logo" width={32} height={32} className="w-auto h-8" />
                </div>
                <div className="flex flex-col gap-4">
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
