export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-[#fbf7f1] text-[#1f1b16]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold">
          Writing Community
        </h1>

        <p className="mt-3 text-black/70 max-w-2xl">
          A place to write together, share progress, and get feedback. No pressure.
          Just consistency.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <h2 className="font-serif text-2xl font-semibold">Daily Prompt</h2>
            <p className="mt-2 text-sm text-black/60">
              New prompt every day. Write 10 minutes. Post what you can.
            </p>

            <div className="mt-4 rounded-2xl border border-black/10 bg-[#fbf7f1] p-4">
              <div className="text-xs tracking-widest text-black/40">TODAY</div>
              <p className="mt-2 text-sm text-black/75 leading-relaxed">
                “Write a scene where a character wants something badly—but can’t ask for it.”
              </p>
            </div>

            <button className="mt-5 rounded-2xl bg-[#a85a12] px-5 py-3 text-sm font-semibold text-white hover:bg-[#8f4c10]">
              Submit a response
            </button>
          </section>

          <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <h2 className="font-serif text-2xl font-semibold">Community Board</h2>
            <p className="mt-2 text-sm text-black/60">
              Share updates, wins, questions, and drafts.
            </p>

            <ul className="mt-4 grid gap-3">
              <li className="rounded-2xl border border-black/10 bg-[#fbf7f1] p-4">
                <div className="text-xs tracking-widest text-black/40">THREAD</div>
                <div className="mt-1 font-semibold">Introduce yourself</div>
                <p className="mt-1 text-sm text-black/70">
                  What are you writing? What do you want help with?
                </p>
              </li>

              <li className="rounded-2xl border border-black/10 bg-[#fbf7f1] p-4">
                <div className="text-xs tracking-widest text-black/40">THREAD</div>
                <div className="mt-1 font-semibold">Weekly goals</div>
                <p className="mt-1 text-sm text-black/70">
                  Post your goal. Come back and update.
                </p>
              </li>
            </ul>

            <button className="mt-5 rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold hover:bg-black/5">
              Start a post
            </button>
          </section>
        </div>

        <div className="mt-10 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="font-serif text-2xl font-semibold">How it works</h2>
          <ol className="mt-3 list-decimal pl-5 text-sm text-black/70 space-y-2">
            <li>Pick a prompt or start your own thread.</li>
            <li>Write small. Post messy. Progress beats perfection.</li>
            <li>Give feedback kindly: what worked, what you felt, one suggestion.</li>
          </ol>
        </div>
      </div>
    </main>
  );
}