"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { addToCart } from "@/lib/cart"; // make sure this is correct for your project

type KitCardProps = {
  id: string;
  name: string;
  type: string;
  price: string;
  index: number;
};

export default function KitCard({ id, name, type, price, index }: KitCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timeout);
  }, [index]);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    setLoading(true);
    await addToCart(id);
    setLoading(false);
    alert(`${name} added to cart!`);
  };

  return (
    <Link href={`/kits/${id}`}>
      <div
        className={`w-[300px] rounded-2xl overflow-hidden shadow-sm transition cursor-pointer hover:shadow-lg hover:scale-105 border border-neutral-200 transform duration-500 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <Image
          src="/kitstockphoto.jpg"
          alt={`${name} (${type})`}
          width={600}
          height={600}
          className="w-full h-auto object-cover"
        />
        <div className="bg-white p-5 text-center">
          <p className="text-md text-black font-semibold mb-2 uppercase">
            {name} ({type})
          </p>
          <p className="text-sm text-pink-500 font-bold mb-4">${price}</p>

          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 cursor-pointer py-2 text-sm rounded-xl transition"
          >
            {loading ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </Link>
  );
}
