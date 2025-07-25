"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

type Kit = {
  id: string
  name: string
  price: number
  description: string
  image_url: string | null
}

export default function KitDetailPage() {
  const { id } = useParams()
  const [kit, setKit] = useState<Kit | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchKit() {
      const { data, error } = await supabase
        .from("kits")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        console.error("Error fetching kit:", error)
      } else {
        setKit(data)
      }
      setLoading(false)
    }

    if (id) fetchKit()
  }, [id])

  if (loading) {
    return (
      <div className="bg-white text-center text-black py-20 font-[Arial_Narrow]">
        <Navbar />
        <p className="text-xl">Loading...</p>
        <Footer />
      </div>
    )
  }

  if (!kit) {
    return (
      <div className="bg-white text-center text-black py-20 font-[Arial_Narrow]">
        <Navbar />
        <p className="text-xl">Kit not found.</p>
        <Footer />
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen font-[Arial_Narrow] text-black">
      <Navbar />
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Image
            src={kit.image_url || "/kitstockphoto.jpg"}
            alt={kit.name}
            width={600}
            height={600}
            className="rounded-xl shadow-md"
          />

          <div>
            <h1 className="text-3xl font-bold text-pink-400 mb-2">{kit.name}</h1>
            <p className="text-xl font-bold text-pink-500 mb-4">${kit.price.toFixed(2)}</p>

            <button className="bg-pink-400 text-white cursor-pointer font-semibold px-6 py-2 hover:scale-105 rounded-lg hover:bg-pink-500 transition mb-6">
              Add to Cart
            </button>

            <p className="whitespace-pre-wrap text-lg text-neutral-800 mb-6">
              {kit.description}
            </p>

            <div>
              <p className="italic text-neutral-600 mb-2 text-lg">
                Files will be available after purchase.
              </p>
              <ul className="space-y-1">
                <li className="text-md text-neutral-700">
                  📦 ZIP (file size and content vary)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
