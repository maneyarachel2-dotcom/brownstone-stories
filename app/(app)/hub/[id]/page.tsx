"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Post = {
  id: string;
  title: string | null;
  content: string;
  image_url: string | null;
  created_at: string;
  user_id: string;
};

type PostComment = {
  id: string;
  post_id: string;
  user_id: string;
  text: string;
  rating: number;
  created_at: string;
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

export default function HubPostPage() {
  const params = useParams();
  const id = String(params?.id || "");

  const [post, setPost] = useState<Post | null>(null);
  const [loadingPost, setLoadingPost] = useState(true);
  const [postError, setPostError] = useState<string | null>(null);

  const [meId, setMeId] = useState<string | null>(null);

  const [comments, setComments] = useState<PostComment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [commentText, setCommentText] = useState("");

  // ✅ NEW: rating state
  const [rating, setRating] = useState(0);

  const [commentError, setCommentError] = useState<string | null>(null);
  const [posting, setPosting] = useState(false);

  const canPost = useMemo(
    () => commentText.trim().length > 0 && rating > 0 && !posting,
    [commentText, rating, posting]
  );

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setMeId(data.user?.id ?? null);
    })();
  }, []);

  async function loadPost() {
    setLoadingPost(true);
    setPostError(null);

    const { data, error } = await supabase.from("posts").select("*").eq("id", id).single();

    if (error) {
      setPostError(error.message);
      setPost(null);
    } else {
      setPost(data as Post);
    }

    setLoadingPost(false);
  }

  async function loadComments() {
    setLoadingComments(true);

    const { data, error } = await supabase
      .from("post_comments")
      .select("*")
      .eq("post_id", id)
      .order("created_at", { ascending: false });

    if (error) {
      setCommentError(error.message);
      setComments([]);
    } else {
      setCommentError(null);
      setComments((data as PostComment[]) ?? []);
    }

    setLoadingComments(false);
  }

  useEffect(() => {
    if (!id) return;
    loadPost();
    loadComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function addComment(e: React.FormEvent) {
    e.preventDefault();
    setCommentError(null);

    const text = commentText.trim();
    if (!text) return;

    if (rating === 0) {
      setCommentError("Please select a rating before posting.");
      return;
    }

    if (!meId) {
      setCommentError("You must be logged in to comment.");
      return;
    }

    setPosting(true);

    const { error } = await supabase.from("post_comments").insert({
      post_id: id,
      user_id: meId,
      text,
      rating, // ✅ now defined
    });

    if (error) {
      setCommentError(error.message);
      setPosting(false);
      return;
    }

    setCommentText("");
    setRating(0);
    setPosting(false);
    loadComments();
  }

  async function deleteComment(commentId: string) {
    setCommentError(null);
    const { error } = await supabase.from("post_comments").delete().eq("id", commentId);
    if (error) {
      setCommentError(error.message);
      return;
    }
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  }

  return (
    <main className="min-h-screen bg-[#fbf7f1] text-[#1f1b16]">
      <div className="mx-auto max-w-3xl px-6 pb-20 pt-12">
        <div className="flex items-center justify-between">
          <Link
            href="/hub"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-black/70 hover:bg-black/5"
          >
            ← Back to Hub
          </Link>
        </div>

        {loadingPost ? (
          <p className="mt-10 text-center text-sm text-black/50">Loading…</p>
        ) : postError ? (
          <div className="mt-10 rounded-3xl border border-black/10 bg-white p-8 text-center">
            <div className="text-sm font-semibold text-black">Couldn’t load post</div>
            <div className="mt-2 text-sm text-black/60">{postError}</div>
          </div>
        ) : !post ? (
          <div className="mt-10 rounded-3xl border border-black/10 bg-white p-8 text-center text-sm text-black/60">
            Post not found.
          </div>
        ) : (
          <>
            <div className="mt-6 overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
              <div className="relative w-full aspect-[16/10] bg-[#fbf7f1]">
                {post.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.image_url}
                    alt={post.title ?? "Post image"}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-xs text-black/50">
                      No image
                    </div>
                  </div>
                )}

                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-wide text-black/70 backdrop-blur">
                  COMMUNITY
                </div>

                <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] text-black/70 backdrop-blur">
                  {timeAgo(post.created_at)}
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <h1 className="font-serif text-3xl sm:text-4xl font-semibold leading-[1.1]">
                  {post.title?.trim() ? post.title : "Untitled"}
                </h1>

                <div className="mt-3 text-sm text-black/55">by writer</div>

                <div className="mx-auto mt-6 h-px w-full bg-black/10" />

                <article className="mt-6">
                  <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-black/75">
                    {post.content}
                  </p>
                </article>
              </div>
            </div>

            <section className="mt-8 rounded-3xl border border-black/10 bg-white p-5 sm:p-6 shadow-sm">
              <h2 className="font-serif text-2xl font-semibold">Comments</h2>
              <p className="mt-2 text-sm text-black/55">
                Share feedback, reactions, or encouragement.
              </p>

              {commentError ? (
                <div className="mt-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {commentError}
                </div>
              ) : null}

              <form onSubmit={addComment} className="mt-5 grid gap-3">
                {/* ✅ NEW: rating selector */}
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
                  <div className="text-xs text-black/50">{rating ? `${rating}/5` : "Rate this post"}</div>
                </div>

                <textarea
                  className="w-full resize-y rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/20"
                  placeholder="Write a comment…"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={4}
                  maxLength={800}
                />

                <div className="flex items-center justify-between gap-3">
                  <button
                    disabled={!canPost}
                    className="rounded-2xl bg-[#a85a12] px-6 py-3 text-sm font-semibold text-white hover:bg-[#8f4c10] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {posting ? "Posting…" : "Post Comment"}
                  </button>
                  <span className="text-xs text-black/45">{commentText.length}/800</span>
                </div>
              </form>

              <div className="mt-8">
                <div className="text-xs tracking-widest text-black/40">
                  {loadingComments ? "LOADING…" : `${comments.length} COMMENTS`}
                </div>

                <div className="mt-4 grid gap-3">
                  {!loadingComments && comments.length === 0 ? (
                    <div className="rounded-2xl border border-black/10 bg-[#fbf7f1] p-6 text-center text-sm text-black/55">
                      Be the first to comment.
                    </div>
                  ) : (
                    comments.map((c) => (
                      <div key={c.id} className="rounded-2xl border border-black/10 bg-[#fbf7f1] p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-0.5">
                              {[1, 2, 3, 4, 5].map((n) => (
                                <span
                                  key={n}
                                  className={`text-sm ${n <= c.rating ? "text-[#a85a12]" : "text-black/20"}`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                            <div className="text-xs text-black/45">{timeAgo(c.created_at)}</div>
                          </div>

                          {meId && c.user_id === meId ? (
                            <button
                              onClick={() => deleteComment(c.id)}
                              className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-black/60 hover:bg-black/5"
                            >
                              Delete
                            </button>
                          ) : null}
                        </div>

                        <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-black/70">
                          {c.text}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}