import Image from "next/image"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import KitCard from "@/components/KitCard"

const kits = [
  { id: "10k", name: "10k", type: "Creative-Kit", price: "$10.00" },
  { id: "fantasia", name: "Fantasia¹", type: "Creative-Kit", price: "$40.00" },
  { id: "spectrum", name: "Spectrum", type: "Creative-Kit", price: "$30.00" },
  { id: "duality", name: "Duality¹", type: "Multi-Kit", price: "$40.00" },
  { id: "gamut", name: "Gamut", type: "Multi-Kit", price: "from $30.00" },
  { id: "flux", name: "Flux", type: "Multi-Kit", price: "$35.00" },
]

export default function KitsPage() {
  return (
    <div className="bg-white min-h-screen font-[Arial_Narrow]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 pb-30 py-20">
        <h1 className="text-2xl font-bold mb-10 text-black uppercase">All Kits</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
            {kits.map((kit, index) => (
                <KitCard
                key={kit.id}
                id={kit.id}
                name={kit.name}
                type={kit.type}
                price={kit.price}
                index={index}
            />
    ))}
    </div>

      </div>

      <Footer />
    </div>
  )
}
