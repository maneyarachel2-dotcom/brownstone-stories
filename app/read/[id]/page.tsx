// app/read/[id]/page.tsx
import { stories } from "@/data/stories";
import ReaderClient from "./reader-client";

export default async function ReadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: rawId } = await params;
  const id = decodeURIComponent(rawId).trim();

  const story = stories.find((s) => s.id === id);

  if (!story) {
    return (
      <main className="min-h-screen bg-[#fbf7f1] px-6 py-16 text-[#1f1b16]">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-3xl font-semibold">Story not found.</h1>
          <p className="mt-2 text-sm text-black/60">
            Go back and open a story from the library.
          </p>
        </div>
      </main>
    );
  }

  return <ReaderClient story={story} />;
}