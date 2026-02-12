"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AppNav() {
  const pathname = usePathname();
  const router = useRouter();

  const linkClass = (href: string) =>
    `rounded-full px-3 py-2 text-sm font-semibold ${
      pathname === href
        ? "bg-black/5 text-black"
        : "text-black/70 hover:bg-black/5"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#fbf7f1]/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-end px-6 py-3">
        <nav className="flex items-center gap-2">
          <Link href="/hub" className={linkClass("/hub")}>
            Read
          </Link>

          {/* ✍🏽 Writing page */}
         <Link href="/write" className={linkClass("/write")}>
  Write
</Link>

          <Link href="/profile" className={linkClass("/profile")}>
            My Profile
          </Link>

          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.replace("/login");
            }}
            className="rounded-full border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-black/70 hover:bg-black/5"
          >
            Sign out
          </button>
        </nav>
      </div>
    </header>
  );
}