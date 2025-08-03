"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const fn = isSignUp ? supabase.auth.signUp : supabase.auth.signInWithPassword;
    const { error } = await fn({ email, password });

    if (error) {
      setError(error.message);
    } else {
      router.push("/kits");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black font-[Arial_Narrow] px-4">
      <form
        onSubmit={handleAuth}
        className="w-full max-w-sm space-y-4 border border-pink-200 p-6 rounded-xl shadow-md"
      >
        <h1 className="text-2xl font-bold text-center text-pink-500">
          {isSignUp ? "Create an Account" : "Log In"}
        </h1>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-pink-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-pink-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg cursor-pointer"
        >
          {isSignUp ? "Sign Up" : "Log In"}
        </button>

        <p className="text-sm text-center text-neutral-600">
          {isSignUp ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-pink-500 font-semibold underline cursor-pointer"
          >
            {isSignUp ? "Log In" : "Sign Up"}
          </button>
        </p>
      </form>
    </div>
  );
}
