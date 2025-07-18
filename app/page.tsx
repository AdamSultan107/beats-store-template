import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TracksSection from "@/components/TracksSection";
import Contact from "@/components/Contact";
import MailingList from "@/components/MailingList";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";


export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <Hero />
      <TracksSection />
      <MailingList />
      <Contact />
      <Footer />
    </>
  )
}
