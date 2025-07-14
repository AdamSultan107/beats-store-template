import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Music, Search, ShoppingCart, Menu, User } from "lucide-react";

export function Navigation() {
  const [cartItems, setCartItems] = useState(0);

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-neutral-700">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Music className="h-8 w-8 text-pink-500" />
            <span className="text-2xl font-bold text-pink-500">shadx2</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#tracks" className="text-white hover:text-pink-500 transition-colors">
              Tracks
            </a>
            <a href="#shop" className="text-white hover:text-pink-500 transition-colors">
              Shop
            </a>
            <a href="#about" className="text-white hover:text-pink-500 transition-colors">
              About
            </a>
            <a href="#contact" className="text-white hover:text-pink-500 transition-colors">
              Contact
            </a>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search tracks, artists..." 
                className="pl-10 w-64 bg-neutral-800 border border-neutral-700 text-white placeholder-gray-400"
              />
            </div>
            
            <Button variant="ghost" size="icon" className="text-white hover:text-pink-500">
              <ShoppingCart className="h-5 w-5" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Button>

            <Button variant="ghost" size="icon" className="text-white hover:text-pink-500">
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-white hover:text-pink-500">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-6 mt-6">
                  <div className="flex items-center gap-2">
                    <Music className="h-6 w-6 text-pink-500" />
                    <span className="text-xl font-bold text-pink-500">shadx2</span>
                  </div>
                  
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      placeholder="Search tracks, artists..." 
                      className="pl-10 bg-neutral-800 border border-neutral-700 text-white placeholder-gray-400"
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <a href="#tracks" className="text-white hover:text-pink-500 transition-colors p-2">
                      Tracks
                    </a>
                    <a href="#shop" className="text-white hover:text-pink-500 transition-colors p-2">
                      Shop
                    </a>
                    <a href="#about" className="text-white hover:text-pink-500 transition-colors p-2">
                      About
                    </a>
                    <a href="#contact" className="text-white hover:text-pink-500 transition-colors p-2">
                      Contact
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}