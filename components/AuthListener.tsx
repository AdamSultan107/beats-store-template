"use client";

import { useEffect, useRef, useState } from "react";
import supabase from "@/lib/supabaseClient";
import Toast from "@/components/Toast";

export default function AuthListener() {
  const hasToastedRef = useRef(false);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "warning">("success");

  const showToast = (message: string, type: "success" | "warning" = "success") => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user && !hasToastedRef.current) {
        showToast(`You're now logged in as ${session.user.email}`, "success");
        hasToastedRef.current = true;
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <Toast
      message={toastMessage}
      show={toastVisible}
      type={toastType}
      onClose={() => setToastVisible(false)}
    />
  );
}
