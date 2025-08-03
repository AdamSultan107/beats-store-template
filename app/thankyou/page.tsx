"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ThankYouPage() {
  return (
    <div className="bg-white min-h-screen text-black font-[Arial_Narrow] flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="text-4xl font-bold text-pink-500 mb-6">Thank You!</h1>
        <p className="text-lg text-neutral-700 mb-8">
          Your order has been placed successfully. You’ll receive a confirmation email shortly.
        </p>
        <Link
          href="/kits"
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          Continue Browsing
        </Link>
      </main>
      <Footer />
    </div>
  );
}
