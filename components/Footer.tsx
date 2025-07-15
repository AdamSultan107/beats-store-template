import { Music, Instagram, Twitter, Youtube, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border text-black">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Music className="h-6 w-6 text-pink-500" />
              <span className="text-xl font-bold text-pink-500">shadx2</span>
            </div>
            <p className="text-muted-foreground text-gray-600">
              Creating amazing music experiences for producers and music lovers worldwide.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Music */}
          <div>
            <h3 className="font-semibold mb-4">Music</h3>
            <ul className="space-y-2">
              <li><a href="#tracks" className="text-gray-600 hover:text-pink-500 transition-colors">All Tracks</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">Sound Kits</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">Loops</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">Samples</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">Custom Beats</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">Mixing & Mastering</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">Music Production</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">Licensing</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#contact" className="text-gray-600 hover:text-pink-500 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">Terms of Use</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600">
            © 2024 shadx2. All rights reserved. Made with passion for music.
          </p>
        </div>
      </div>
    </footer>
  );
}
