"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function WritePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onPickFile(f: File | null) {
    setFile(f);
    if (!f) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(f);
    setPreviewUrl(url);
  }

  async function uploadImage(userId: string, f: File) {
    // create unique filename
    const ext = f.name.split(".").pop() || "jpg";
    const path = `${userId}/${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("post-images")
      .upload(path, f, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("post-images").getPublicUrl(path);
    return data.publicUrl; // public bucket
  }

  async function onPublish(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const clean = content.trim();
    if (!clean) {
      setError("Write something before publishing.");
      return;
    }

    setLoading(true);

    try {
      const { data: auth } = await supabase.auth.getUser();
      const user = auth.user;
      if (!user) {
        setError("You must be logged in.");
        setLoading(false);
        return;
      }

      let image_url: string | null = null;
      if (file) {
        image_url = await uploadImage(user.id, file);
      }

      const { error: insertError } = await supabase.from("posts").insert({
        user_id: user.id,
        title: title.trim() ? title.trim() : null,
        content: clean,
        image_url,
      });

      if (insertError) throw insertError;

      // ✅ Go to hub after publish
      router.push("/hub");
      router.refresh();
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong.");
      setLoading(false);
      return;
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#fbf7f1] text-[#1f1b16]">
      <div className="mx-auto max-w-3xl px-6 pb-20 pt-12">
        <h1 className="font-serif text-4xl font-semibold tracking-tight">
          Write
        </h1>
        <p className="mt-2 text-sm text-black/60">
          A warm corner to draft, polish, and share.
        </p>

        {error ? (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <form
          onSubmit={onPublish}
          className="mt-8 rounded-3xl border border-black/10 bg-white p-6 shadow-sm"
        >
          {/* Image picker */}
          <div className="grid gap-3">
            <label className="text-sm font-semibold text-black/70">
              Add a picture
            </label>

            <div className="rounded-2xl border border-black/10 bg-[#fbf7f1] p-4">
              {previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full rounded-2xl object-cover"
                />
              ) : (
                <div className="rounded-2xl border border-black/10 bg-white px-4 py-10 text-center text-sm text-black/50">
                  No image selected
                </div>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onPickFile(e.target.files?.[0] ?? null)}
                  className="text-sm"
                />
                {file ? (
                  <button
                    type="button"
                    onClick={() => onPickFile(null)}
                    className="rounded-full border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-black/70 hover:bg-black/5"
                  >
                    Remove
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="mt-6 grid gap-2">
            <label className="text-sm font-semibold text-black/70">
              Title 
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give it a title…"
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/20"
              maxLength={120}
            />
          </div>

          {/* Content */}
          <div className="mt-6 grid gap-2">
            <label className="text-sm font-semibold text-black/70">
              Your writing
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing…"
              className="w-full min-h-[220px] resize-y rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm leading-relaxed outline-none focus:border-black/20"
              maxLength={6000}
            />
            <div className="text-right text-xs text-black/40">
              {content.length}/6000
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => router.push("/hub")}
              className="rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-black/70 hover:bg-black/5"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="rounded-2xl bg-[#a85a12] px-6 py-3 text-sm font-semibold text-white hover:bg-[#8f4c10] disabled:opacity-50"
            >
              {loading ? "Publishing…" : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}