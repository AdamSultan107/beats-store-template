'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function MailingList() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribed(true);
    toast({
      title: "Subscribed!",
      description: "You're now on the list for updates and offers.",
    });
    setEmail("");

    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <section className="py-20 bg-white text-black">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl text-pink-300 font-bold mb-4">
            join the newsletter
          </h2>
          <p className="text-gray-600 mb-8">
            get updates on new beats, kits, and exclusive offers fast.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="relative w-full sm:w-auto flex-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="email"
                placeholder="email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 bg-white border border-gray-300 text-black placeholder-gray-500"
              />
            </div>
            <Button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 cursor-pointertext-white px-6 py-2"
              disabled={isSubscribed}
            >
              {isSubscribed ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Subscribed
                </>
              ) : (
                "subscribe"
              )}
            </Button>
          </form>

          <p className="text-xs text-gray-500 mt-3">
            never spam, unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
