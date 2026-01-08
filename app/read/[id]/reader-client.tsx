"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import type { Story } from "@/data/stories";
import EmailSignup from "@/app/components/EmailSignup";

type Comment = { id: string; rating: number; text: string; createdAt: string };

const commentKey = (id: string) => `brownstone_comments__${id}`;
const prefsKey = `brownstone_reader_prefs__v3`;

type Prefs = {
  fontSize: number; // px
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function minutesToRead(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
}

/** Creates a TOC by finding "Chapter X: Title" lines. */
function buildToc(content: string) {
  const lines = content.split("\n");
  const chapters: { label: string; index: number }[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (/^Chapter\s+\d+\s*:/i.test(line)) {
      chapters.push({ label: line, index: i });
    }
  }
  return chapters.length ? chapters : [{ label: "Story", index: 0 }];
}

export default function ReaderClient({ story }: { story: Story }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [prefs, setPrefs] = useState<Prefs>({ fontSize: 18 });
  const [progress, setProgress] = useState(0);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const lines = useMemo(() => story.content.split("\n"), [story.content]);
  const toc = useMemo(() => buildToc(story.content), [story.content]);

  const paragraphs = useMemo(
    () =>
      story.content
        .split(/\n\s*\n/g)
        .map((p) => p.trim())
        .filter(Boolean),
    [story.content]
  );

  const mins = useMemo(() => minutesToRead(story.content), [story.content]);

  // load comments
  useEffect(() => {
    const raw = localStorage.getItem(commentKey(story.id));
    setComments(raw ? JSON.parse(raw) : []);
  }, [story.id]);

  // load prefs
  useEffect(() => {
    try {
      const raw = localStorage.getItem(prefsKey);
      if (raw) setPrefs(JSON.parse(raw));
    } catch {}
  }, []);

  // save prefs
  useEffect(() => {
    try {
      localStorage.setItem(prefsKey, JSON.stringify(prefs));
    } catch {}
  }, [prefs]);

  // progress bar
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max <= 0 ? 0 : Math.min(1, Math.max(0, window.scrollY / max));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function saveComments(next: Comment[]) {
    setComments(next);
    localStorage.setItem(commentKey(story.id), JSON.stringify(next));
  }

  function add(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return textareaRef.current?.focus();
    if (rating === 0) return;

    const c: Comment = {
      id: crypto.randomUUID(),
      rating,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };

    saveComments([c, ...comments]);
    setText("");
    setRating(0);
    textareaRef.current?.focus();
  }

  function jumpToChapter(lineIndex: number) {
    const targetText = (lines[lineIndex] || "").trim();
    if (!targetText) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const nodes = document.querySelectorAll("[data-reader-paragraph]");
    let found: Element | null = null;

    nodes.forEach((el) => {
      if (found) return;
      const t = (el.textContent || "").trim();
      if (t.startsWith(targetText)) found = el;
    });

    if (found) {
      (found as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <main className="min-h-screen bg-[#fbf7f1] text-[#1f1b16]">
      {/* thin progress bar */}
      <div className="fixed left-0 top-0 z-50 h-[3px] w-full bg-black/10">
        <div className="h-full bg-[#a85a12]" style={{ width: `${progress * 100}%` }} />
      </div>

      {/* top bar */}
      <div className="sticky top-0 z-40 border-b border-black/10 bg-[#fbf7f1]/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-2 px-3 sm:px-5 py-2 sm:py-3">
          {/* Back: mobile shows “Library” only */}
          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl px-2 sm:px-3 py-2 text-sm text-black/70 hover:bg-black/5"
          >
            ← <span className="hidden sm:inline">Back to </span>Library
          </Link>

          <div className="flex-1 text-center">
            <div className="truncate font-serif text-xs sm:text-sm font-semibold">
              {story.title.toUpperCase()}
            </div>
          </div>

          {/* RIGHT SIDE: progress + hamburger */}
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#f3e6d6] px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold text-[#7a3f0a]">
              {Math.round(progress * 100)}%
            </span>

            <button
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-9 w-10 items-center justify-center rounded-xl border border-black/10 bg-white/70 hover:bg-white"
              aria-label="Open menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* page header */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-10 sm:pt-12">
        <div className="mx-auto mb-4 w-fit rounded-full bg-[#f3e6d6] px-4 py-1 text-[11px] font-semibold tracking-wide text-[#7a3f0a]">
          {story.genre.toUpperCase()}
        </div>

        <h1 className="text-center font-serif font-semibold leading-[1.05] text-4xl sm:text-5xl md:text-6xl">
          {story.title}
        </h1>

        <p className="mt-3 text-center text-sm text-black/60">by {story.author}</p>
        <p className="mt-2 text-center text-xs text-black/45">{mins} min read</p>

        <div className="mx-auto mt-7 sm:mt-8 flex max-w-xs items-center gap-3">
          <div className="h-px flex-1 bg-black/10" />
          <div className="h-2 w-2 rounded-full bg-[#a85a12]" />
          <div className="h-px flex-1 bg-black/10" />
        </div>
      </div>

      {/* reading area */}
      <article className="mx-auto max-w-3xl px-4 sm:px-6 pb-10 pt-8 sm:pt-10">
        <div className="leading-relaxed">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              data-reader-paragraph
              className="mx-auto mb-6 max-w-[68ch] whitespace-pre-wrap font-serif text-black/80 tracking-[0.01em]"
              style={{
                fontSize: prefs.fontSize,
                lineHeight: prefs.fontSize <= 18 ? "2.0" : "1.9",
              }}
            >
              {p}
            </p>
          ))}
        </div>

        {/* The End */}
        
        <div className="mx-auto mt-10 flex max-w-md items-center gap-4 text-black/40">
          <div className="h-px flex-1 bg-black/10" />
          <div className="font-serif">The End</div>
          <div className="h-px flex-1 bg-black/10" />
        </div>
        <EmailSignup />
      </article>

      {/* comments */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 pb-20">
        <div className="rounded-3xl border border-black/10 bg-white p-5 sm:p-6 shadow-sm">
          <h2 className="font-serif text-2xl font-semibold">Leave a Comment</h2>
          <p className="mt-2 text-sm text-black/55">
            Comments are saved on this device only (no account).
          </p>

          <form onSubmit={add} className="mt-5 grid gap-3">
            {/* rating */}
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    className={`text-2xl leading-none transition ${
                      n <= rating ? "text-[#a85a12]" : "text-black/20"
                    }`}
                    aria-label={`${n} star`}
                    title={`${n} star`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <div className="text-xs text-black/50">
                {rating ? `${rating}/5` : "Rate this story"}
              </div>
            </div>

            <textarea
              ref={textareaRef}
              className="w-full resize-y rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/20"
              placeholder="Share your thoughts about this story..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              maxLength={600}
            />

            <div className="flex items-center justify-between gap-3">
              <button
                disabled={!text.trim() || rating === 0}
                className="rounded-2xl bg-[#a85a12] px-6 py-3 text-sm font-semibold text-white hover:bg-[#8f4c10] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Post Comment
              </button>
              <span className="text-xs text-black/45">{text.length}/600</span>
            </div>

            {rating === 0 && text.trim().length > 0 && (
              <p className="text-xs text-black/50">
                Please select a rating before posting.
              </p>
            )}
          </form>

          <div className="mt-8">
            <div className="text-xs tracking-widest text-black/40">
              {comments.length} COMMENTS
            </div>

            <div className="mt-4 grid gap-3">
              {comments.length === 0 ? (
                <div className="rounded-2xl border border-black/10 bg-[#fbf7f1] p-6 text-center text-sm text-black/55">
                  Be the first to share your thoughts!
                </div>
              ) : (
                comments.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-2xl border border-black/10 bg-[#fbf7f1] p-4"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <span
                            key={n}
                            className={`text-sm ${n <= c.rating ? "text-[#a85a12]" : "text-black/20"}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>

                      <span className="text-xs text-black/45">
                        {new Date(c.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-relaxed text-black/70">
                      {c.text}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>



      </section>

      {/* HAMBURGER MENU DRAWER */}
      {menuOpen ? (
        <>
          <button
            className="fixed inset-0 z-[80] bg-black/25"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />

          <aside className="fixed right-0 top-0 z-[90] h-full w-[min(380px,88vw)] overflow-y-auto bg-white p-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/10 pb-3">
              <div>
                <div className="text-sm font-semibold text-black">Menu</div>
                <div className="text-xs text-black/50">{story.title}</div>
              </div>

              <button
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-9 w-10 items-center justify-center rounded-xl border border-black/10 hover:bg-black/5"
                aria-label="Close menu"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Font size */}
            <div className="mt-4">
              <div className="text-[11px] font-semibold tracking-wider text-black/50">
                FONT SIZE
              </div>

              <div className="mt-2 flex items-center justify-between gap-3 rounded-2xl border border-black/10 bg-[#fbf7f1] p-3">
                <button
                  onClick={() => setPrefs((p) => ({ fontSize: clamp(p.fontSize - 1, 16, 28) }))}
                  className="h-9 w-10 rounded-xl border border-black/10 bg-white text-lg hover:bg-black/5"
                  aria-label="Decrease font size"
                >
                  −
                </button>

                <div className="text-sm font-semibold">{prefs.fontSize}px</div>

                <button
                  onClick={() => setPrefs((p) => ({ fontSize: clamp(p.fontSize + 1, 16, 28) }))}
                  className="h-9 w-10 rounded-xl border border-black/10 bg-white text-lg hover:bg-black/5"
                  aria-label="Increase font size"
                >
                  +
                </button>
              </div>
            </div>

            {/* TOC */}
            <div className="mt-6">
              <div className="text-[11px] font-semibold tracking-wider text-black/50">
                TABLE OF CONTENTS ({toc.length})
              </div>

              <div className="mt-3 flex flex-col gap-2">
                {toc.map((ch, idx) => (
                  <button
                    key={`${ch.index}-${idx}`}
                    onClick={() => {
                      setMenuOpen(false);
                      setTimeout(() => jumpToChapter(ch.index), 80);
                    }}
                    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-left hover:bg-black/5"
                  >
                    <div className="text-sm font-semibold text-black">{ch.label}</div>
                    <div className="mt-1 text-xs text-black/50">Jump to this chapter</div>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </>
      ) : null}
    </main>
  );
}