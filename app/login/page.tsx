"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    const cleanEmail = email.trim();

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      setLoading(false);

      if (error) return setMsg(error.message);

      router.replace("/hub");
      return;
    }

    // signup
    const { error } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        // if email confirmations are ON, user must confirm before login
        // you can still redirect after confirmation if you want later
      },
    });

    setLoading(false);

    if (error) return setMsg(error.message);

    // If email confirmation is OFF, they’re logged in right away:
    const { data } = await supabase.auth.getSession();
    if (data.session) router.replace("/community");
    else
      setMsg(
        "Account created. Check your email to confirm, then come back and log in."
      );
  }

  return (
    <main className="min-h-screen bg-[#fbf7f1] text-[#1f1b16]">
      <div className="mx-auto max-w-md px-6 pt-20 pb-24">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-4xl font-semibold">
            {mode === "login" ? "Login" : "Create account"}
          </h1>

          <Link href="/" className="text-sm text-black/60 hover:underline">
            Back
          </Link>
        </div>

        <p className="mt-2 text-sm text-black/60">
          {mode === "login"
            ? "Welcome back. Log in to join the community."
            : "Sign up to post, comment, and join the community."}
        </p>

        {/* Tabs */}
        <div className="mt-6 flex rounded-2xl border border-black/10 bg-white p-1">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 rounded-2xl px-4 py-2 text-sm font-semibold ${
              mode === "login"
                ? "bg-[#a85a12] text-white"
                : "text-black/60 hover:bg-black/5"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`flex-1 rounded-2xl px-4 py-2 text-sm font-semibold ${
              mode === "signup"
                ? "bg-[#a85a12] text-white"
                : "text-black/60 hover:bg-black/5"
            }`}
          >
            Sign up
          </button>
        </div>

        {/* Form */}
        <div className="mt-5 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <form onSubmit={onSubmit} className="grid gap-4">
            <div>
              <label className="text-sm font-semibold text-black/70">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/20"
                placeholder="you@example.com"
                type="email"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-black/70">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/20"
                placeholder="Minimum 6 characters"
                type="password"
                minLength={6}
                required
              />
            </div>

            <button
              disabled={loading}
              className="mt-2 rounded-2xl bg-[#a85a12] px-5 py-3 text-sm font-semibold text-white hover:bg-[#8f4c10] disabled:opacity-50"
            >
              {loading
                ? "Please wait…"
                : mode === "login"
                ? "Login"
                : "Create account"}
            </button>

            {msg ? <p className="text-xs text-red-600">{msg}</p> : null}
          </form>
        </div>
      </div>
    </main>
  );
}
