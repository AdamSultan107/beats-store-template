import Image from "next/image"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import KitCard from "@/components/KitCard"

const creativeKits = [
  { name: "10k", type: "Creative-Kit", price: "$10.00" },
  { name: "Fantasia¹", type: "Creative-Kit", price: "$40.00" },
  { name: "Spectrum", type: "Creative-Kit", price: "$30.00" },
]

export default function CreativeKitsPage() {
  return (
    <div className="bg-white min-h-screen font-[Arial_Narrow]">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 pb-30 py-20">
        <h1 className="text-2xl font-bold mb-10 text-black uppercase">Creative Kits</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
          {creativeKits.map((kit, index) => (
            <KitCard key={index} name={kit.name} type={kit.type} price={kit.price} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
