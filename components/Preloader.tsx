"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music } from "lucide-react";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 2 }}
            className="flex items-center space-x-4"
          >
            <Music className="text-pink-500" width={100} height={100} />
            <span className="text-7xl font-extrabold text-pink-500">YourBeats</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
