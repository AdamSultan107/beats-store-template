"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Instagram, Twitter, Youtube } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 bg-white text-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              Get in <span className="text-pink-500">Touch</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Questions about licensing, collaborations, or custom beats?
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4 bg-neutral-50 p-8 rounded-2xl shadow-md"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-white"
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white"
                />
              </div>
              <Input
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="bg-white"
              />
              <Textarea
                name="message"
                placeholder="Your message..."
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="bg-white"
              />
              <Button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white cursor-pointerfont-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>

            {/* Info / Social */}
            <div className="space-y-6 text-left">
              <div>
                <h3 className="text-xl font-semibold mb-3">Contact Info</h3>
                <p className="text-gray-700 mb-1">
                  <strong>Business:</strong> business@shadx2.com
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Collabs:</strong> collab@shadx2.com
                </p>
                <p className="text-gray-700">
                  <strong>Support:</strong> support@shadx2.com
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Follow shadx2</h3>
                <div className="flex flex-col gap-3">
                  <Button
                    variant="outline"
                    className="justify-start border-pink-500 cursor-pointer text-pink-500 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                  >
                    <Instagram className="h-4 w-4 mr-2 text-pink-500" />
                    Instagram
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start border-pink-500 cursor-pointer text-pink-500 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                  >
                    <Twitter className="h-4 w-4 mr-2 text-pink-500" />
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start border-pink-500 cursor-pointer text-pink-500 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                  >
                    <Youtube className="h-4 w-4 mr-2 text-pink-500" />
                    YouTube
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
