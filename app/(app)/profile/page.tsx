"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

type Profile = {
  id: string;
  username: string;
  display_name: string;
  bio: string;
  avatar_url: string;
  posts_count: number;
  followers_count: number; // we'll label this "readers"
  following_count: number;
};

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

export default function ProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  const [meId, setMeId] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [postsError, setPostsError] = useState<string | null>(null);

  // Demo profile (layout only). We will overwrite posts_count dynamically.
  const demo = useMemo<Profile>(
    () => ({
      id: "demo",
      username: "authorrachelmaneya",
      display_name: "Rachel Maneya writer",
      bio: "Digital creator\n📚 Student | Writer | book-lover\n@ authorrachelmaneya",
      avatar_url: "/profile.jpg",
      posts_count: 0, // will be replaced by posts.length
      followers_count: 1626,
      following_count: 284,
    }),
    []
  );

  async function loadMyPosts(userId: string) {
    setLoadingPosts(true);
    setPostsError(null);

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      setPostsError(error.message);
      setPosts([]);
    } else {
      setPosts((data as Post[]) ?? []);
    }

    setLoadingPosts(false);
  }

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | null = null;

    (async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      setProfile(demo);
      setLoading(false);

      if (!session) {
        setMeId(null);
        setLoadingPosts(false);
        return;
      }

      setMeId(session.user.id);

      // initial load
      await loadMyPosts(session.user.id);

      // realtime updates when you publish
      channel = supabase
        .channel("profile-posts-realtime")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "posts",
            filter: `user_id=eq.${session.user.id}`,
          },
          async () => {
            await loadMyPosts(session.user.id);
            router.refresh(); // safe
          }
        )
        .subscribe();
    })();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [demo, router]);

  // ✅ AUTO posts count based on posts.length (updates instantly)
  const postsCount = posts.length;

  if (loading || !profile) {
    return (
      <main className="min-h-screen bg-[#fbf7f1] flex items-center justify-center">
        <p className="text-sm text-black/60">Loading profile…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fbf7f1] text-[#1f1b16]">
      <div className="mx-auto max-w-5xl px-6 pt-10 pb-20">
        {/* NEW CENTERED PROFILE HEADER */}
        <section className="rounded-3xl border border-black/10 bg-white p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="h-28 w-28 sm:h-32 sm:w-32 overflow-hidden rounded-full border border-black/10 bg-[#fbf7f1]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.avatar_url}
                alt={profile.username}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Username */}
            <h1 className="mt-5 text-2xl font-semibold">{profile.username}</h1>

            {/* Display name (optional) */}
            <p className="mt-1 text-sm text-black/60">{profile.display_name}</p>

            {/* Stats row */}
            <div className="mt-5 flex flex-wrap justify-center gap-6 text-sm">
              <span>
                <strong className="font-semibold">
                  {loadingPosts ? "…" : postsCount}
                </strong>{" "}
                posts
              </span>

              <span>
                <strong className="font-semibold">
                  {profile.followers_count.toLocaleString()}
                </strong>{" "}
                readers
              </span>
            </div>

            {/* Bio */}
            <div className="mt-5 max-w-2xl text-sm text-black/70 whitespace-pre-line leading-relaxed">
              {profile.bio}
            </div>

            {/* Edit profile */}
            <div className="mt-6 w-full max-w-sm">
              <button className="w-full rounded-2xl bg-black/5 px-5 py-3 text-sm font-semibold hover:bg-black/10">
                Edit profile
              </button>
            </div>
          </div>
        </section>

        {/* POSTS SECTION (hub-style cards) */}
        {!meId ? (
          <div className="mt-10 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <p className="text-sm text-black/60">Log in to see your posts.</p>
          </div>
        ) : loadingPosts ? (
          <div className="mt-10 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <p className="text-sm text-black/60">Loading your posts…</p>
          </div>
        ) : postsError ? (
          <div className="mt-10 rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            {postsError}
          </div>
        ) : posts.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <p className="text-sm text-black/60">No posts yet.</p>
          </div>
        ) : (
          <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {posts.map((p) => (
              <article
                key={p.id}
                className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm"
              >
                {/* Image */}
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
                      <div className="rounded-xl border border-black/10 bg-white px-3 py-1 text-xs text-black/50">
                        No image
                      </div>
                    </div>
                  )}

                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-wide text-black/70 backdrop-blur">
                    YOUR POST
                  </div>

                  <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] text-black/70 backdrop-blur">
                    {timeAgo(p.created_at)}
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-semibold leading-snug">
                    {p.title?.trim() ? p.title : "Untitled"}
                  </h3>

                  <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-black/65">
                    {p.content}
                  </p>

                  <Link
                    href={`/hub/${p.id}`}
                    className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#a85a12] px-5 py-3 text-sm font-semibold text-white hover:bg-[#8f4c10]"
                  >
                    View in Hub
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