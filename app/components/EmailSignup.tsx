"use client";

export default function EmailSignup() {
  // ✅ Use ONLY the form action URL (no <script> tags)
  const CONVERTKIT_ACTION_URL = "https://app.kit.com/forms/8950379/subscriptions";

  // Optional
  const WRITER_LINK = "/";

  return (
    <section className="mx-auto mt-10 max-w-2xl rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
      <h3 className="text-center font-serif text-2xl font-semibold">
        Every book begins with a first reader.
      </h3>

      <p className="mt-3 text-center text-sm leading-relaxed text-black/60">
        Follow the journey as this publishing house comes to life.
      </p>

      <form
        action={CONVERTKIT_ACTION_URL}
        method="post"
        className="mx-auto mt-5 flex max-w-md flex-col gap-3"
      >
        {/* ConvertKit usually expects this */}
        <input type="hidden" name="utf8" value="✓" />

        {/* Optional: send them back to your site after subscribing */}
        {/* <input type="hidden" name="redirect_to" value="https://YOURDOMAIN.com/thanks" /> */}

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

      {/* Optional link */}
      {/* 
      <div className="mt-4 text-center">
        <a
          href={WRITER_LINK}
          className="text-sm font-semibold text-[#7a3f0a] underline underline-offset-4 hover:text-[#5f3108]"
        >
          Are you a writer? Submit your work →
        </a>
      </div>
      */}
    </section>
  );
}