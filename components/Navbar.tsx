"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Music } from "lucide-react"
import { FaShoppingCart, FaUser, FaBars } from "react-icons/fa"
import { AiOutlineSearch } from "react-icons/ai"

export default function Navbar() {
  const [cartItems, setCartItems] = useState(0)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-neutral-200 py-4">
      <div className="w-full mx-auto px-4 grid grid-cols-3 items-center">

        {/* Left: Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center gap-2">
            <Music className="h-10 w-10 text-pink-400" />
            <span className="text-4xl font-bold text-pink-400 lowercase">shadx2</span>
          </a>
        </div>

        {/* Center: Nav Links */}
        <div className="hidden md:flex justify-center gap-8">
          <a href="#beats" className="text-sm font-medium text-neutral-800 lowercase hover:text-pink-400 transition">
            beats
          </a>
          <a href="#about" className="text-sm font-medium text-neutral-800 lowercase hover:text-pink-400 transition">
            about me
          </a>
          <a href="#kits" className="text-sm font-medium text-neutral-800 lowercase hover:text-pink-400 transition">
            kits
          </a>
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
                  <Music className="h-6 w-6 text-pink-400" />
                  <span className="text-xl font-bold text-pink-400 lowercase">shadx2</span>
                </div>

                <div className="flex flex-col gap-4">
                  <a href="#beats" className="text-base font-medium text-black cursor-pointer hover:text-pink-400 lowercase p-2">
                    beats
                  </a>
                  <a href="#about" className="text-base font-medium text-black cursor-pointer hover:text-pink-400 lowercase p-2">
                    about me
                  </a>
                  <a href="#kits" className="text-base font-medium text-black cursor-pointer hover:text-pink-400 lowercase p-2">
                    kits
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
