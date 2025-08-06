"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import supabase from "@/lib/supabaseClient";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { v4 as uuidv4 } from "uuid";
import Toast from "@/components/Toast";

// Kit props
type Kit = {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string | null;
};

// Dynamic kit detail page; fetching details of your selected kit from Supabase
export default function KitDetailPage() {
  const { id } = useParams();
  const [kit, setKit] = useState<Kit | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  // Toast state
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "warning">("success");

  const showToast = (message: string, type: "success" | "warning" = "success") => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  // Ensure guest_id is stored
  useEffect(() => {
    const storedId = localStorage.getItem("shadx2_guest_id");
    if (!storedId) {
      const newId = uuidv4();
      localStorage.setItem("shadx2_guest_id", newId);
    }
  }, []);

  // Fetch kit details
  useEffect(() => {
    async function fetchKit() {
      const { data, error } = await supabase
        .from("kits")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching kit:", error);
      } else {
        setKit(data);
      }
      setLoading(false);
    }

    if (id) fetchKit();
  }, [id]);

  // Add to cart with duplicate check
  const handleAddToCart = async () => {
    if (!kit) return;

    const guestId = localStorage.getItem("shadx2_guest_id");
    if (!guestId) return alert("Guest ID missing");

    setAdding(true);

    const { data: existing } = await supabase
      .from("cart_items")
      .select("id")
      .eq("guest_id", guestId)
      .eq("kit_id", kit.id)
      .single();

    if (existing) {
      showToast("Item already in cart.", "warning");
      setAdding(false);
      return;
    }

    const { error: insertError } = await supabase.from("cart_items").insert([
      {
        guest_id: guestId,
        kit_id: kit.id
      }
    ]);

    if (insertError) {
      console.error("Failed to add to cart:", insertError);
      alert("Error adding to cart.");
    } else {
      showToast(`${kit.name} added to cart!`, "success");
    }

    setAdding(false);
  };

  if (loading) {
    return (
      <div className="bg-white text-center text-black py-20 font-[Arial_Narrow]">
        <Navbar />
        <p className="text-xl">Loading...</p>
        <Footer />
      </div>
    );
  }

  if (!kit) {
    return (
      <div className="bg-white text-center text-black py-20 font-[Arial_Narrow]">
        <Navbar />
        <p className="text-xl">Kit not found.</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-[Arial_Narrow] text-black">
      <Navbar />

      {/* Toast Component */}
      <Toast
        message={toastMessage}
        show={toastVisible}
        type={toastType}
        onClose={() => setToastVisible(false)}
      />

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

            <button
              onClick={handleAddToCart}
              disabled={adding}
              className={`bg-pink-400 text-white font-semibold px-6 py-2 cursor-pointer rounded-lg transition mb-6 ${
                adding ? "opacity-50 cursor-not-allowed" : "hover:scale-105 hover:bg-pink-500"
              }`}
            >
              {adding ? "Adding..." : "Add to Cart"}
            </button>

            <p className="whitespace-pre-wrap text-lg text-neutral-800 mb-6">
              {kit.description}
            </p>

            <div>
              <p className="italic text-neutral-600 mb-2 text-lg">
                Files will be available after purchase.
              </p>
              {/* Optional: can add in Supabase the file sizes for all kits; can implement upon request */}
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
  );
}
