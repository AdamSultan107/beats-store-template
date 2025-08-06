"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

type CartItem = {
  id: string;
  kit_id: string;
  kit: {
    name: string;
    price: number;
    image_url: string | null;
  };
};

export default function CartPage() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Get cart items from Supabase
  const fetchCartItems = async () => {
    const guestId = localStorage.getItem("shadx2_guest_id");
    if (!guestId) return;

    const { data, error } = await supabase
      .from("cart_items")
      .select("id, kit_id, kit:kits(name, price, image_url)")
      .eq("guest_id", guestId);

    if (error) {
      console.error("Error loading cart:", error);
    } else {
      setCartItems(
        (data || []).map((item: any) => ({
          ...item,
          kit: Array.isArray(item.kit) ? item.kit[0] : item.kit,
        }))
      );
    }

    setLoading(false);
  };

  // Remove an item from the cart
  const handleRemove = async (itemId: string) => {
    await supabase.from("cart_items").delete().eq("id", itemId);
    fetchCartItems();
  };

  // Clear the cart, show a confirmation modal then a toast notification
  const handleClearCart = async () => {
    const guestId = localStorage.getItem("shadx2_guest_id");
    if (!guestId) return;

    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("guest_id", guestId);

    if (error) {
      console.error("Error clearing cart:", error);
    } else {
      fetchCartItems();
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    return item.kit?.price ? sum + item.kit.price : sum;
  }, 0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="bg-white text-black font-[Arial_Narrow] min-h-screen relative">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-16">
        {showToast && (
          <div className="mb-6 text-center">
            <div className="inline-block bg-pink-500 text-white font-semibold py-2 px-4 rounded-xl shadow transition">
              Your cart has been cleared.
            </div>
          </div>
        )}
        <h1 className="text-3xl font-bold mb-10 text-center">Your Cart</h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : cartItems.length === 0 ? (
          <p className="text-center text-neutral-500">Your cart is currently empty.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border rounded-xl p-4 shadow-sm"
              >
                <Image
                  src={item.kit.image_url || "/kitstockphoto.jpg"}
                  alt={item.kit.name}
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
                <div className="flex-grow">
                  <p className="text-lg font-semibold">{item.kit.name}</p>
                  <p className="text-pink-500 font-bold">${item.kit.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-sm text-pink-500 hover:text-pink-700 font-semibold cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="flex justify-between items-center pt-6 border-t mt-8">
              <p className="text-xl font-bold">Total:</p>
              <p className="text-xl text-pink-500 font-bold">${totalPrice.toFixed(2)}</p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowConfirmModal(true)}
                className="text-sm text-red-500 cursor-pointer hover:text-red-700 font-semibold"
              >
                Clear Cart
              </button>
            </div>

            <div className="text-center mt-8 space-y-4">
              <Link href="/checkout">
                <button className="bg-pink-500 hover:bg-pink-600 cursor-pointer text-white px-6 py-2 rounded-lg transition">
                  Proceed to Checkout
                </button>
              </Link>
              <Link href="/kits">
                <button className="border border-pink-400 cursor-pointer text-pink-500 hover:bg-pink-100 px-6 py-2 rounded-lg transition ml-4">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />

      {/* Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center shadow-lg font-[Arial_Narrow]">
            <h2 className="text-lg font-semibold text-neutral-800 mb-4">
              Clear Cart?
            </h2>
            <p className="text-sm text-neutral-600 mb-6">
              Are you sure you want to remove all items from your cart?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-sm text-neutral-600 border border-neutral-300 rounded-lg hover:bg-neutral-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  setShowConfirmModal(false);
                  await handleClearCart();
                }}
                className="px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg cursor-pointer"
              >
                Yes, Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
