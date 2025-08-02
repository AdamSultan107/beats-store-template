"use client";

import React, { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
  duration?: number;
  type?: "success" | "warning";
}

export default function Toast({
  message,
  show,
  onClose,
  duration = 3000,
  type = "success",
}: ToastProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (show) {
      setFadeOut(false);
      const fadeTimer = setTimeout(() => setFadeOut(true), duration - 300); // start fading before removal
      const removeTimer = setTimeout(onClose, duration);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  const bgColor = type === "warning" ? "bg-yellow-500" : "bg-pink-500";

  return (
    <div
      className={`fixed top-20 left-1/2 -translate-x-1/2 text-white px-6 py-3 text-base rounded-lg shadow-md z-50 font-[Arial_Narrow] transition-opacity duration-300 ${
        bgColor
      } ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
      {message}
    </div>
  );
}
