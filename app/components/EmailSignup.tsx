"use client";

export default function EmailSignup() {
  // ✅ Replace with your ConvertKit form action URL
  // Example format: https://app.convertkit.com/forms/123456/subscriptions
  const CONVERTKIT_ACTION_URL = "https://brownstone-publishing-house.kit.com/20cb77ba1e";

  // ✅ Replace with your writer/submission link (optional)
  const WRITER_LINK = "/"; // change later to /submit or /writers

  return (
    <section className="mx-auto mt-10 max-w-2xl rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
      <h3 className="text-center font-serif text-2xl font-semibold">
        Every book begins with a first reader.
      </h3>

      <p className="mt-3 text-center text-sm leading-relaxed text-black/60">
        This platform is the beginning of a new publishing house.
        <br />
        <br />
        Before the covers are printed, before the books are shelved, before the
        world knows what this will become — you’re here.
        <br />
        <br />
        Read one story, leave a comment about what you felt — and if you want to
        stay close as this grows, leave your email below.
      </p>

      <form
        action={CONVERTKIT_ACTION_URL}
        method="post"
        className="mx-auto mt-5 flex max-w-md flex-col gap-3"
      >
        <input type="hidden" name="utf8" value="✓" />

        <input
          type="email"
          name="email_address"
          required
          placeholder="Your email address"
          className="w-full rounded-2xl border border-black/10 bg-[#fbf7f1] px-4 py-3 text-sm outline-none focus:border-black/25"
        />

        <button
          type="submit"
          className="rounded-2xl bg-[#a85a12] px-6 py-3 text-sm font-semibold text-white hover:bg-[#8f4c10]"
        >
          Stay for the next chapter
        </button>

        <p className="text-center text-xs text-black/45">
          No spam. Just stories and early access.
        </p>
      </form>

      <div className="mt-4 text-center">
        <a
          href={WRITER_LINK}
          className="text-sm font-semibold text-[#7a3f0a] underline underline-offset-4 hover:text-[#5f3108]"
        >
          Are you a writer? Submit your work →
        </a>
      </div>
    </section>
  );
}