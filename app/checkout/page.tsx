"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";
import { getOrGenerateGuestId } from "@/lib/guest";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type CartItem = {
  id: string;
  kit_id: string;
  kit: {
    name: string;
    price: number;
  };
};

export default function CheckoutPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const guestId =
    typeof window !== "undefined" ? getOrGenerateGuestId() : null;

  useEffect(() => {
    async function fetchCart() {
      if (!guestId) return;

      const { data, error } = await supabase
        .from("cart_items")
        .select("id, kit_id, kit:kits(name, price)")
        .eq("guest_id", guestId);

      if (error) {
        console.error("Failed to fetch cart:", error);
      } else if (data) {
        setCartItems(
          data.map((item: any) => ({
            ...item,
            kit: Array.isArray(item.kit) ? item.kit[0] : item.kit,
          }))
        );
      }

      setLoading(false);
    }

    fetchCart();
  }, [guestId]);

  const total = cartItems.reduce((sum, item) => sum + item.kit.price, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestId || !email) return alert("Missing info");

    setSubmitting(true);

    const cartData = cartItems.map((item) => ({
      kit_id: item.kit_id,
      name: item.kit.name,
      price: item.kit.price,
    }));

    const { error } = await supabase.from("guest_orders").insert([
      {
        guest_id: guestId,
        name: name || null,
        email,
        total,
        cart_data: cartData,
      },
    ]);

    if (error) {
      console.error("Order failed:", error);
      alert("Something went wrong placing your order.");
      setSubmitting(false);
      return;
    }

    await supabase.from("cart_items").delete().eq("guest_id", guestId);
    router.push("/thankyou?status=success");
  };

  return (
    <div className="bg-white min-h-screen text-black font-[Arial_Narrow]">
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-pink-500 mb-8 text-center">
          Checkout
        </h1>

        {loading ? (
          <p className="text-center">Loading cart...</p>
        ) : cartItems.length === 0 ? (
          <p className="text-center text-lg text-neutral-500">Your cart is empty.</p>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-6 mb-10">
              <div>
                <label className="block text-sm font-semibold mb-1">Name (optional)</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-pink-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-pink-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`bg-pink-500 text-white cursor-pointer font-semibold px-6 py-2 rounded-lg ${
                  submitting ? "opacity-60 cursor-not-allowed" : "hover:bg-pink-600"
                }`}
              >
                {submitting ? "Placing Order..." : "Complete Order"}
              </button>
            </form>

            <div>
              <h2 className="text-xl font-bold mb-4">Your Cart</h2>
              <ul className="space-y-2 mb-4">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="border px-4 py-2 rounded flex justify-between"
                  >
                    <span>{item.kit.name}</span>
                    <span className="text-pink-500 font-bold">${item.kit.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <p className="text-lg font-bold text-right">
                Total: <span className="text-pink-500">${total.toFixed(2)}</span>
              </p>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
