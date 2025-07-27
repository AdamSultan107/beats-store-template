"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import KitCard from "@/components/KitCard"
import supabase from "@/lib/supabaseClient"

export default function CreativeKitsPage() {
  const [kits, setKits] = useState<any[]>([])

  useEffect(() => {
    const fetchCreativeKits = async () => {
      const { data, error } = await supabase
        .from("kits")
        .select("*")
        .ilike("type", "%creative%") // case-insensitive match

      if (error) {
        console.error("Error fetching creative kits:", error)
      } else {
        setKits(data)
      }
    }

    fetchCreativeKits()
  }, [])

  return (
    <div className="bg-white min-h-screen font-[Arial_Narrow]">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 pb-30 py-20">
        <h1 className="text-2xl font-bold mb-10 text-black uppercase">Creative Kits</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
          {kits.map((kit, index) => (
            <KitCard
              key={kit.id}
              id={kit.id}
              index={index}
              name={kit.name}
              type={kit.type}
              price={`${Number(kit.price).toFixed(2)}`}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
