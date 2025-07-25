"use client"

import Image from "next/image"
import { useParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const kitDetails: Record<string, any> = {
  "10k": {
    name: "10k (Creative Kit)",
    price: "$10.00",
    image: "/kitstockphoto.jpg",
    description: `10k is a lightweight creative kit made for fast idea generation and compact inspiration. It's perfect for producers looking to spark ideas quickly.`,
    files: [
      { type: "zip", size: "120mb" },
      { type: "txt", size: "1kb" },
    ],
  },
  fantasia: {
    name: "Fantasia¹ (Creative Kit)",
    price: "$40.00",
    image: "/kitstockphoto.jpg",
    description: `Fantasia brings a dreamy, cinematic energy into your production. With lush textures and ambient sounds, it's designed for the experimental and the bold.`,
    files: [
      { type: "zip", size: "530mb" },
      { type: "pdf", size: "130kb" },
    ],
  },
  spectrum: {
    name: "Spectrum (Creative Kit)",
    price: "$30.00",
    image: "/kitstockphoto.jpg",
    description: `Spectrum includes a wide palette of tones, perfect for coloring your beats with unique sonic elements. Carefully curated and organized.`,
    files: [
      { type: "zip", size: "400mb" },
    ],
  },
  duality: {
    name: "Duality¹ (Multi Kit)",
    price: "$40.00",
    image: "/kitstockphoto.jpg",
    description: `Duality is the birth of a new series. Multiple workflows were tested, each designed to push the limits of your sound in opposite directions.`,
    files: [
      { type: "zip", size: "423mb" },
      { type: "txt", size: "171b" },
    ],
  },
  gamut: {
    name: "Gamut (Multi Kit)",
    price: "From $30.00",
    image: "/kitstockphoto.jpg",
    description: `Gamut covers every base: drums, textures, melodic one-shots, and FX layers. Everything you need for full arrangement control.`,
    files: [
      { type: "zip", size: "615mb" },
    ],
  },
  flux: {
    name: "Flux (Multi Kit)",
    price: "$35.00",
    image: "/kitstockphoto.jpg",
    description: `Flux is movement. Built to adapt to your mood with reactive textures and highly tweakable layers.`,
    files: [
      { type: "zip", size: "480mb" },
    ],
  },
}

export default function KitDetailPage() {
  const { id } = useParams()
  const kit = kitDetails[id as string]

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
            src={kit.image}
            alt={kit.name}
            width={600}
            height={600}
            className="rounded-xl shadow-md"
          />

          <div>
            <h1 className="text-3xl font-bold text-pink-400 mb-2">{kit.name}</h1>
            <p className="text-xl font-bold text-pink-500 mb-4">{kit.price}</p>

            <button className="bg-pink-400 text-white cursor-pointer font-semibold px-6 py-2 hover:scale-105 rounded-lg hover:bg-pink-500 transition mb-6">
              Add to Cart
            </button>

            <p className="whitespace-pre-wrap text-lg text-neutral-800 mb-6">
              {kit.description}
            </p>

            <div>
              <p className="italic text-neutral-600 mb-2 text-lg">You will get the following files:</p>
              <ul className="space-y-1">
                {kit.files.map((file: any, i: number) => (
                  <li key={i} className="text-md text-neutral-700">
                    📦 {file.type.toUpperCase()} ({file.size})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
