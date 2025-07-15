import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import TracksSection from "@/components/TracksSection";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TracksSection />
      <Contact />
    </>
  )
}
