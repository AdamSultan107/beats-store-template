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
}

export default function KitsPage() {
  const [kits, setKits] = useState<Kit[]>([]);

  useEffect(() => {
  async function fetchKits() {
    const { data, error } = await supabase.from("kits").select("*");

    console.log("KITS DATA:", data);
    console.log("KITS ERROR:", error);

    if (error) {
      console.error("Failed to fetch kits:", error.message);
    } else {
      setKits(data || []);
    }
  }

  fetchKits();
}, []);

  return (
    <div>
    <Navbar />
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-black text-center">All Kits</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
        {kits.map((kit, index) => (
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
    </div>
    <Footer />
    </div>
  );
}
