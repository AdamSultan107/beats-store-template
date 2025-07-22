import { Music, Instagram, Twitter, Youtube, Mail } from "lucide-react";
import Image from "next/image";
import Logo from "@/public/shadlogo.png";

export default function Footer() {
  return (
    <footer className="bg-white text-black border-t border-neutral-200 font-[Arial_Narrow]">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <a href="/" className="block w-fit">
                <div className="flex items-center gap-2">
                  <Music className="w-6 h-6 text-pink-500" />
                  <span className="text-xl font-bold text-pink-500">YourBeats</span>
                </div>
              </a>
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed">
              Creating amazing music experiences for producers and music lovers worldwide.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="hover:text-pink-300 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-pink-300 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-pink-300 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-pink-300 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Music */}
          <div>
            <h3 className="text-base font-semibold mb-3 text-pink-300">Music</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#tracks" className="hover:text-pink-300">All Tracks</a></li>
              <li><a href="#" className="hover:text-pink-300">Sound Kits</a></li>
              <li><a href="#" className="hover:text-pink-300">Loops</a></li>
              <li><a href="#" className="hover:text-pink-300">Samples</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base font-semibold mb-3 text-pink-300">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-pink-300">Custom Beats</a></li>
              <li><a href="#" className="hover:text-pink-300">Mixing & Mastering</a></li>
              <li><a href="#" className="hover:text-pink-300">Production</a></li>
              <li><a href="#" className="hover:text-pink-300">Licensing</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-base font-semibold mb-3 text-pink-300">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#contact" className="hover:text-pink-300">Contact</a></li>
              <li><a href="#" className="hover:text-pink-300">FAQ</a></li>
              <li><a href="#" className="hover:text-pink-300">Terms of Use</a></li>
              <li><a href="#" className="hover:text-pink-300">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center text-xs text-neutral-500 border-t border-neutral-200 pt-6">
          © 2025 YourBeats. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
