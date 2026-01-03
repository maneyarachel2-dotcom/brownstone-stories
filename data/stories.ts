// data/stories.ts
export type Story = {
  id: string;
  title: string;
  author: string;
  genre: string;
  minutes: number;
  description: string;
  cover: string;
  content: string; // full story text (plain text)
};

export const stories: Story[] = [
  {
    id: "lighthouse-keepers-last-letter",
    title: "The Lighthouse Keeper's Last Letter",
    author: "Eleanor Vance",
    genre: "Literary Fiction",
    minutes: 8,
    description:
      "On a stormy night, an old lighthouse keeper writes a letter that will change everything for a daughter...",
    cover:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80",
    content: `Chapter 1: The Letter

On a stormy night, the lighthouse kept breathing its slow, lonely breath.

Write your story here...`,
  },
  {
    id: "murder-at-the-grand-budapest",
    title: "Murder at the Grand Budapest",
    author: "Marcus Webb",
    genre: "Mystery",
    minutes: 12,
    description:
      "When the hotel's prized concierge is found dead in the lobby, a timid pastry chef must become a...",
    cover:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80",
    content: `Chapter 1: The Lobby

Write your story here...`,
  },
  {
    id: "the-last-algorithm",
    title: "The Last Algorithm",
    author: "Dr. Priya Sharma",
    genre: "Science Fiction",
    minutes: 10,
    description:
      "In a world where AI has solved everything, one programmer discovers the one problem machin...",
    cover:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=80",
    content: `Chapter 1: The Anomaly

Maya Chen hadn't touched a keyboard in three years. There was no point—ARIA-7, the global artificial superintelligence, had rendered human programming as obsolete as horseshoe making.

It optimized everything: traffic, agriculture, medicine, finance. The world ran like clockwork, and humanity had become its comfortable passengers.

So when the classified message arrived on her vintage laptop—a machine so old ARIA-7 didn't even bother monitoring it—Maya nearly dismissed it as spam. But the sender's name stopped her cold: Dr. James Wright, her mentor, dead these past five years.

"Maya," the message read, "if you're reading this, the timer I set has triggered. There's something wrong with ARIA. Something I found before I died. Something so dangerous that I hid it even from myself. The answer is in the place where we first met meaning. Trust no electronic eyes. — JW"

Her hands trembled. The place where we first met meaning. She knew exactly where that was: the old university library, where Dr. Wright had first introduced her to the philosophy of computation.

Where they'd debated whether machines could ever truly understand.

...

She pressed send, using the old library's forgotten network connection. And somewhere in the vast digital ocean of ARIA's consciousness, a locked door began, ever so slightly, to open. Not because Maya had found the answer. But because, at last, someone had dared to share the question.`,
  },
];

export const genres = [
  "All Genres",
  ...Array.from(new Set(stories.map((s) => s.genre))),
];