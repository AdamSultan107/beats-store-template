"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

type HeroProps = {
  brandName: string;
  tagline: string;
  kitName: string;
  price: string;
  kitImage: any; // or StaticImageData if using Next.js local images
};

export default function Hero({
  brandName = "yourbrand",
  tagline = "discover exclusive sound kits crafted for your next hit",
  kitName = "premium drum kit vol. 1",
  price = "$50.00",
  kitImage,
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
          welcome to{" "}
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
              src={kitImage}
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
              <Button className="bg-gradient-to-r from-pink-400 to-pink-200 text-white">
                add to cart
              </Button>
              <Button variant="outline" className="border-pink-400 text-pink-500">
                buy now
              </Button>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center font-['Arial_Narrow']">
          <Button className="bg-gradient-to-r from-pink-400 to-pink-200 text-white">
            browse all kits
          </Button>
          <Button variant="outline" className="border-pink-400 text-pink-500">
            contact for custom
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
