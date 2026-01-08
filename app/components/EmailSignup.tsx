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
       Follow the journey as this publishing house comes to life.
        <br />
        <br />
    
        <br />
        <br />
       
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
        
      </div>
    </section>
  );
}