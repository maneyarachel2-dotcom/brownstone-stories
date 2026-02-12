"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function CommunityPage() {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace("/login");
      else setOk(true);
    });
  }, [router]);

  if (!ok) return null;

  return (
    <main className="min-h-screen bg-[#fbf7f1] text-[#1f1b16]">
      <div className="mx-auto max-w-4xl px-6 pt-16 pb-24">
        <h1 className="font-serif text-4xl font-semibold">Writing Community</h1>
        <p className="mt-2 text-sm text-black/60">You’re logged in.</p>
      </div>
    </main>
  );
}
