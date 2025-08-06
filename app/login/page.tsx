"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";
import Toast from "@/components/Toast";

// Basic log in page or sign up page, user can switch between the two
// Recorded in Supabase auth
export default function AuthPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  // Toast state
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "warning">("success");

  const showToast = (message: string, type: "success" | "warning" = "success") => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        router.push("/");
      }
    };
    checkSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error, data } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      showToast(`${isSignUp ? "Sign Up" : "Login"} failed: ${error.message}`, "warning");
    } else {
      if (isSignUp && data.user && !data.session) {
        showToast("Check your email to confirm sign-up.", "success");
      } else {
        showToast(
          isSignUp
            ? `Account created! You're now registered as ${email}`
            : `Welcome back, ${email}!`,
          "success"
        );
        router.push("/");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      {/* Toast Component */}
      <Toast
        message={toastMessage}
        show={toastVisible}
        type={toastType}
        onClose={() => setToastVisible(false)}
      />

      <form
        onSubmit={handleSubmit}
        className="w-[320px] rounded-2xl border border-pink-200 bg-white p-8 text-center shadow-md"
      >
        <h2 className="mb-6 text-2xl font-bold text-pink-600">
          {isSignUp ? "Sign Up" : "Log In"}
        </h2>

        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded border px-3 py-2 text-sm focus:outline-pink-400"
        />

        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full rounded border px-3 py-2 text-sm focus:outline-pink-400"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-pink-500 py-2 font-semibold text-white transition hover:bg-pink-600"
        >
          {isSignUp ? "Sign Up" : "Log In"}
        </button>

        <p className="mt-4 text-sm">
          {isSignUp ? "Already have an account?" : "Need an account?"}{" "}
          <button
            type="button"
            className="text-pink-500 hover:underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Log In" : "Sign Up"}
          </button>
        </p>
      </form>
    </div>
  );
}
