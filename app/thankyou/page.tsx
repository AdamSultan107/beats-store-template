"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import supabase from "@/lib/supabaseClient";
import { getOrGenerateGuestId } from "@/lib/guest";

type Order = {
  id: string;
  name: string | null;
  email: string;
  total: number;
  cart_data: {
    kit_id: string;
    name: string;
    price: number;
  }[];
};

type KitDownload = {
  name: string;
  signedUrl: string;
};

export default function ThankYouPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [downloads, setDownloads] = useState<KitDownload[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  useEffect(() => {
    const fetchOrder = async () => {
      const { data: auth } = await supabase.auth.getUser();
      const user = auth.user;

      let fetchedOrder: Order | null = null;

      if (user) {
        const { data } = await supabase
          .from("user_orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();
        fetchedOrder = data;
      } else {
        const guestId = getOrGenerateGuestId();
        const { data } = await supabase
          .from("guest_orders")
          .select("*")
          .eq("guest_id", guestId)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();
        fetchedOrder = data;
      }

      if (fetchedOrder) {
        setOrder(fetchedOrder);

        const kitIds = fetchedOrder.cart_data.map((kit) => kit.kit_id);
        const { data: kitsData, error } = await supabase
          .from("kits")
          .select("id, name, file_path")
          .in("id", kitIds);

        if (!error && kitsData) {
          const signedLinks: KitDownload[] = [];
          const EXPIRATION_SECONDS = 60 * 60; // 1 hour
          const expirationTime = Date.now() + EXPIRATION_SECONDS * 1000;
          localStorage.setItem("shadx2_download_expires_at", expirationTime.toString());

          for (const kit of kitsData) {
            if (!kit.file_path) {
              console.error(`❌ No file_path for kit ${kit.name}`);
              continue;
            }

            const cleanPath = kit.file_path.trim();

            const { data: signed, error: urlError } = await supabase.storage
              .from("kits")
              .createSignedUrl(cleanPath, EXPIRATION_SECONDS);

            if (!signed?.signedUrl || urlError) {
              console.error(`❌ Failed to create signed URL for: ${cleanPath}`, urlError);
            } else {
              signedLinks.push({ name: kit.name, signedUrl: signed.signedUrl });
            }
          }

          setDownloads(signedLinks);
        }
      }

      setLoading(false);
    };

    fetchOrder();
  }, []);

  // ⏱️ Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      const expiresAt = parseInt(localStorage.getItem("shadx2_download_expires_at") || "0", 10);
      const now = Date.now();
      const diff = expiresAt - now;

      if (diff <= 0) {
        setTimeLeft("Link expired");
        clearInterval(interval);
      } else {
        const minutes = Math.floor(diff / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white min-h-screen text-black font-[Arial_Narrow] flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="text-4xl font-bold text-pink-500 mb-6">
          {status === "paid" ? "Payment Successful!" : "Thank You!"}
        </h1>

        {loading ? (
          <p className="text-neutral-500">Loading your order...</p>
        ) : order ? (
          <>
            <p className="text-lg text-neutral-700 mb-4">
              Confirmation sent to <strong>{order.email}</strong>.
            </p>
            <p className="text-lg text-neutral-700 mb-6">
              Total: <span className="font-bold text-pink-500">${order.total.toFixed(2)}</span>
            </p>

            <div className="w-full max-w-xl text-left">
              <h2 className="text-xl font-bold mb-2">Your Kits:</h2>
              {timeLeft && (
                <p className="text-sm text-neutral-500 mb-4">
                  Download links expire in: <span className="font-semibold">{timeLeft}</span>
                </p>
              )}
              <ul className="space-y-2 mb-6">
                {downloads.map((kit) => (
                  <li
                    key={kit.name}
                    className="flex justify-between items-center border p-3 rounded-lg"
                  >
                    <span>{kit.name}</span>
                    {timeLeft !== "Link expired" ? (
                      <a
                        href={kit.signedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-pink-500 hover:underline"
                      >
                        Download
                      </a>
                    ) : (
                      <span className="text-sm text-gray-400 italic">Expired</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/kits"
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-2 rounded-lg transition"
            >
              Continue Browsing
            </Link>
          </>
        ) : (
          <p className="text-neutral-500">No order found.</p>
        )}
      </main>
      <Footer />
    </div>
  );
}