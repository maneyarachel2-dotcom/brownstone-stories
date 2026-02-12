"use client";

import { stories } from "@/data/stories";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f5f3ef] text-black">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-24">

        {/* HEADER */}
        <section>
          <h1 className="text-[80px] leading-none font-extrabold tracking-tight">
            <span className="text-[#a85a12]">SHORT </span>
            <span className="text-black">STORIES</span>
          </h1>

          <p className="mt-6 text-3xl text-black/70">
            Read something that moves you
          </p>

          <div className="mt-10 border-t border-black/20"></div>
        </section>

        {/* STORIES */}
        <section className="mt-14 space-y-20">

          {Array.from({ length: Math.ceil(stories.length / 3) }).map(
            (_, rowIndex) => {
              const rowStories = stories.slice(
                rowIndex * 3,
                rowIndex * 3 + 3
              );

              return (
                <div key={rowIndex}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {rowStories.map((s) => (
                      <Link
                        key={s.id}
                        href={`/read/${s.id}`}
                        className="group block"
                      >
                        {/* IMAGE */}
                        <div className="overflow-hidden rounded-xl">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={s.cover}
                            alt={s.title}
                            className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        </div>

                        {/* TEXT */}
                        <div className="mt-4">
                          <p className="text-sm text-black/50">
                            {s.author}
                          </p>

                          <h2 className="mt-1 text-lg font-medium leading-snug transition group-hover:text-[#a85a12]">
                            {s.title}
                          </h2>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Divider between rows */}
                  {rowIndex !==
                    Math.ceil(stories.length / 3) - 1 && (
                    <div className="mt-16 border-t border-black/20"></div>
                  )}
                </div>
              );
            }
          )}

        </section>

        {/* FOOTER */}
        
      </div>
    </main>
  );
}