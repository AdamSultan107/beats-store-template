'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Music } from "lucide-react"
import { FaShoppingCart, FaUser, FaBars } from "react-icons/fa"
import { AiOutlineSearch } from "react-icons/ai"

export default function Navbar() {
  const [cartItems, setCartItems] = useState(0)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-neutral-200 py-5">
      <div className="container mx-auto px-4 flex items-center">
        {/* Left: Logo */}
        <a href="/" className="flex items-center gap-2 flex-shrink-0">
          <Music className="h-9 w-9 text-pink-500" />
          <span className="text-4xl font-bold text-pink-500">shadx2</span>
        </a>

        {/* Center: Links */}
        <div className="flex justify-center flex-grow gap-10">
          <a href="#tracks" className="text-xl font-semibold text-black hover:text-pink-500 transition-colors">
            Tracks
          </a>
          <a href="#shop" className="text-xl font-semibold text-black hover:text-pink-500 transition-colors">
            Shop
          </a>
          <a href="#about" className="text-xl font-semibold text-black hover:text-pink-500 transition-colors">
            About
          </a>
          <a href="#contact" className="text-xl font-semibold text-black hover:text-pink-500 transition-colors">
            Contact
          </a>
        </div>

        {/* Right: Search & icons */}
        <div className="flex items-center gap-6 flex-shrink-0">
          <div className="hidden md:flex relative">
            <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-7 w-7" />
            <Input
              placeholder="Search tracks, artists..."
              className="pl-12 h-12 w-72 bg-neutral-100 border border-neutral-300 text-lg text-black placeholder-gray-600"
            />
          </div>

          <Button variant="ghost" className="h-14 w-14 text-black hover:text-pink-500 hover:bg-transparent relative">
            <FaShoppingCart className="h-10 w-10" />
            {cartItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartItems}
              </span>
            )}
          </Button>

          <Button variant="ghost" className="h-14 w-14 text-black hover:text-pink-500 hover:bg-transparent">
            <FaUser className="h-10 w-10" />
          </Button>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden h-14 w-14 text-black hover:text-pink-500 hover:bg-transparent">
                <FaBars className="h-10 w-10" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white text-black">
              <div className="flex flex-col gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <Music className="h-7 w-7 text-pink-500" />
                  <span className="text-3xl font-bold text-pink-500">shadx2</span>
                </div>

                <div className="relative">
                  <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-7 w-7" />
                  <Input
                    placeholder="Search tracks, artists..."
                    className="pl-12 h-12 bg-neutral-100 border border-neutral-300 text-lg text-black placeholder-gray-500"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <a href="#tracks" className="text-xl font-semibold text-black hover:text-pink-500 transition-colors p-2">
                    Tracks
                  </a>
                  <a href="#shop" className="text-xl font-semibold text-black hover:text-pink-500 transition-colors p-2">
                    Shop
                  </a>
                  <a href="#about" className="text-xl font-semibold text-black hover:text-pink-500 transition-colors p-2">
                    About
                  </a>
                  <a href="#contact" className="text-xl font-semibold text-black hover:text-pink-500 transition-colors p-2">
                    Contact
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
