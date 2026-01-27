"use client";

import { useMemo, useState } from "react";
import { genres, stories } from "@/data/stories";
import Link from "next/link";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All Genres");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return stories.filter((s) => {
      const matchesGenre = genre === "All Genres" ? true : s.genre === genre;
      const matchesQuery =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.author.toLowerCase().includes(q) ||
        s.genre.toLowerCase().includes(q);

      return matchesGenre && matchesQuery;
    });
  }, [query, genre]);

  return (
    <main className="min-h-screen bg-[#fbf7f1] text-[#1f1b16]">
      {/* Writing Community link */}
      <div className="relative z-50 mx-auto max-w-6xl px-6 pt-6 flex justify-end">
        <Link
          href="/community"
          className="rounded-full bg-[#a85a12] px-4 py-2 text-sm font-semibold text-white hover:bg-[#8f4c10]"
        >
          Writing Community
        </Link>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-20 pt-10">
        {/* Heading */}
        <div className="text-center">
          <h1 className="font-serif text-5xl font-semibold tracking-tight">
            Discover Stories
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-black/60">
            Immerse yourself in handcrafted tales from our curated collection of
            short fiction
          </p>
        </div>

        {/* Search + Filter Row */}
        <div className="mx-auto mt-10 flex max-w-5xl flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, author, or genre..."
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/20"
            />
          </div>

          <div className="w-full md:w-56">
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/20"
            >
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cards */}
        <section className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          {filtered.map((s) => (
            <article
              key={s.id}
              className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm"
            >
              {/* Image */}
              <div className="relative w-full aspect-[3/4] bg-[#fbf7f1] overflow-hidden">
                <img
                  src={s.cover}
                  alt={s.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-black/70">
                  {s.genre.toUpperCase()}
                </div>

                <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] text-black/70">
                  {s.minutes} min
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <h2 className="font-serif text-2xl font-semibold leading-snug">
                  {s.title}
                </h2>
                <p className="mt-2 text-sm text-black/60">by {s.author}</p>

                <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-black/65">
                  {s.description}
                </p>

                <Link
                  href={`/read/${s.id}`}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#a85a12] px-5 py-3 text-sm font-semibold text-white hover:bg-[#8f4c10]"
                >
                  Read Story
                </Link>
              </div>
            </article>
          ))}
        </section>

        <div className="mt-12 text-center text-sm text-black/50">
          Showing {filtered.length} of {stories.length} stories
        </div>
      </div>
    </main>
  );
}