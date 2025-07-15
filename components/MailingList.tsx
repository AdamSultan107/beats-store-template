"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, CheckCircle, Music2, Headphones, Disc3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function MailingList() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Simulate subscription
    setIsSubscribed(true);
    toast({
      title: "Successfully subscribed!",
      description: "You'll receive updates about new tracks and releases.",
    });
    setEmail("");

    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <section className="py-20 bg-white text-black">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="bg-neutral-50">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Stay <span className="text-pink-500">Connected</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Join our mailing list to get exclusive access to new releases, 
                  behind-the-scenes content, and special offers on beats and sound kits.
                </p>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Music2 className="h-6 w-6 text-pink-500" />
                  </div>
                  <h3 className="font-semibold mb-2">New Releases</h3>
                  <p className="text-sm text-gray-600">
                    Be the first to hear new tracks and get early access
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Disc3 className="h-6 w-6 text-pink-500" />
                  </div>
                  <h3 className="font-semibold mb-2">Exclusive Content</h3>
                  <p className="text-sm text-gray-600">
                    Access to unreleased tracks and bonus material
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Headphones className="h-6 w-6 text-pink-500" />
                  </div>
                  <h3 className="font-semibold mb-2">Special Offers</h3>
                  <p className="text-sm text-gray-600">
                    Discounts on beats, sound kits, and merchandise
                  </p>
                </div>
              </div>

              {/* Subscription Form */}
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-white border border-gray-300 text-black placeholder-gray-500"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="px-6 bg-pink-500 hover:bg-pink-600 text-white font-semibold"
                    disabled={isSubscribed}
                  >
                    {isSubscribed ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Subscribed
                      </>
                    ) : (
                      "Subscribe"
                    )}
                  </Button>
                </div>

                <p className="text-xs text-gray-500 mt-3 text-center">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
