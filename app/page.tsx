import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      {/* <main className="flex min-h-screen items-center justify-center bg-gray-900">
        <h1 className="text-4xl font-bold text-green-400">Tailwind is working!</h1>
      </main> */}
    </>
  )
}
