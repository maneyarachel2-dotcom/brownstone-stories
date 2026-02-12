"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

type Post = {
  id: string;
  title: string | null;
  content: string;
  image_url: string | null;
  created_at: string;
  user_id: string;
};

function timeAgo(iso: string) {
  const d = new Date(iso).getTime();
  const diff = Date.now() - d;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function clampText(text: string, max = 140) {
  const t = text.trim().replace(/\s+/g, " ");
  return t.length > max ? t.slice(0, max).trim() + "…" : t;
}

export default function HubPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(60);

    if (!error && data) setPosts(data as Post[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="min-h-screen bg-[#fbf7f1] text-[#1f1b16]">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-14">
        {/* Heading */}
        <div className="text-center">
          <h1 className="font-serif text-5xl font-semibold tracking-tight">
            Community Hub
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-black/60">
            Read what people are writing. Leave love. Give feedback.
          </p>
        </div>

        {loading ? (
          <p className="mt-10 text-center text-sm text-black/50">Loading…</p>
        ) : posts.length === 0 ? (
          <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-black/10 bg-white p-10 text-center text-sm text-black/60">
            No posts yet. Be the first to write something.
          </div>
        ) : (
          <section className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <article
                key={p.id}
                className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm"
              >
                {/* Image (FULL FIT) */}
                <div className="relative w-full aspect-[3/4] bg-[#fbf7f1] overflow-hidden">
                  {p.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image_url}
                      alt={p.title ?? "Post image"}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-xs text-black/50">
                        No image
                      </div>
                    </div>
                  )}

                  {/* “COMMUNITY” pill (like your genre pill) */}
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-wide text-black/70 backdrop-blur">
                    COMMUNITY
                  </div>

                  {/* time chip (like minutes) */}
                  <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] text-black/70 backdrop-blur">
                    {timeAgo(p.created_at)}
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <h2 className="font-serif text-2xl font-semibold leading-snug">
                    {p.title?.trim() ? p.title : "Untitled"}
                  </h2>

                  <p className="mt-2 text-sm text-black/60">
                    by writer
                  </p>

                  <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-black/65">
                    {clampText(p.content, 160)}
                  </p>

                  {/* Optional: if you later build /post/[id], link there */}
                  <Link href={`/hub/${p.id}`} className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#a85a12] px-5 py-3 text-sm font-semibold text-white hover:bg-[#8f4c10]">
  Read Post
</Link>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
