"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import defaultKitImage from "@/public/musicstockphoto.jpg";


type HeroProps = {
  brandName: string;
  tagline: string;
  kitName: string;
  price: string;
};

export default function Hero({
  brandName = "Your Brand",
  tagline = "Discover exclusive sound kits crafted for your next hit",
  kitName = "Premium Drum Kit Vol. 1",
  price = "$50.00",
}: HeroProps) {

  return (
    <section className="relative flex items-center justify-center bg-white text-black py-32 px-4">
      {/* Background pink circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-200 opacity-30 rounded-full blur-xl"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-200 opacity-20 rounded-full blur-xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative text-center max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 font-['Arial_Narrow']">
          Welcome to {" "}
          <span className="bg-gradient-to-r from-pink-400 to-pink-200 bg-clip-text text-transparent">
            {brandName}
          </span>
        </h1>

        <p className="text-xl md:text-2xl font-bold text-black mb-12 font-['Arial_Narrow']">
          {tagline}
        </p>

        {/* Kit preview */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10">
          <div className="w-[300px] h-[300px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src={defaultKitImage}
              alt="Featured Sound Kit"
              className="object-cover w-full h-full"
              width={400}
              height={400}
            />
          </div>

          <div className="text-left max-w-md font-['Arial_Narrow']">
            <h2 className="text-2xl font-bold mb-2">{kitName}</h2>
            <p className="text-xl text-neutral-700 font-bold mb-4">{price}</p>
            <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-gradient-to-r from-pink-400 to-pink-200 text-white cursor-pointer transition-all duration-200 hover:from-pink-500 hover:to-pink-300 hover:-translate-y-0.5">
              Add to Cart
            </Button>

            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center font-['Arial_Narrow']">
          <Button className="bg-gradient-to-r from-pink-400 to-pink-200 text-white cursor-pointer transition-all duration-200 hover:from-pink-500 hover:to-pink-300 hover:scale-105">
            Browse All Kits
          </Button>
          <Button variant="outline" className="border-pink-400 cursor-pointer text-pink-500 hover:bg-pink-50 hover:text-pink-700 hover:scale-105 transition-all duration-200">
            Contact for Custom
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
