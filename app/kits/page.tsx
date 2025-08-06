"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import KitCard from "@/components/KitCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Kit = {
  id: string;
  name: string;
  type: string;
  price: number;
  description: string;
  tagline: string;
  image_url: string;
  created_at: string;
  keywords?: string;
};

// All kits page; fetching all kits from Supabase
export default function KitsPage() {
  const [kits, setKits] = useState<Kit[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchKits() {
      const { data, error } = await supabase.from("kits").select("*");

      if (error) {
        console.error("Failed to fetch kits:", error.message);
      } else {
        setKits(data || []);
      }
    }

    fetchKits();
  }, []);

  // Basic search functionality using keywords, name, and type, entered as values in Supabase
  // This can be extended to include more fields as needed
  const filteredKits = kits.filter((kit) => {
    const target = `${kit.name} ${kit.type} ${kit.keywords || ""}`.toLowerCase();
    return target.includes(search.toLowerCase());
  });

  return (
    <div className="bg-white min-h-screen font-[Arial_Narrow] text-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center text-pink-500">All Kits</h1>

        {/* Search Input */}
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search kits by name, type, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-pink-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {filteredKits.length === 0 ? (
          <p className="text-center text-neutral-600 text-lg">No kits match your search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
            {filteredKits.map((kit, index) => (
              <KitCard
                key={kit.id}
                id={kit.id}
                name={kit.name}
                type={kit.type}
                price={kit.price.toFixed(2)}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
