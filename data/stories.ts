// data/stories.ts

export type Story = {
  id: string;
  title: string;
  author: string;
  genre: string;
  minutes: number;
  description: string;
  cover: string;
  content: string;

  // optional / extended fields
  tags?: string[];
  excerpt?: string;
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
      "In a world where AI has solved everything, one programmer discovers the one problem machines can't.",
    cover:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=80",
    content: `Chapter 1: The Anomaly

Maya Chen hadn't touched a keyboard in three years...

...someone had dared to share the question.`,
  },

  {
    id: "midnight-confession",
    title: "Midnight Confession",
    author: "Brownstone Publishing House",
    genre: "Romance",
    minutes: 5,
    description:
      "A late-night call reveals a truth that was never meant to be spoken.",
    tags: ["Late Night", "Secrets"],
    excerpt:
      "Some truths only come out when the world is asleep and there’s no one left to impress.",
    cover: "/covers/midnight-confession.jpg",
    content: `Chapter 1: Midnight

He called at 12:47 a.m.

Not because he missed me.
But because silence finally stopped protecting him.

I listened.
And that was my first mistake.`,
  },

  {
    id: "the-room-we-left",
    title: "The Room We Left",
    author: "Brownstone Publishing House",
    genre: "Literary Fiction",
    minutes: 6,
    description:
      "A return to a room that still remembers everything.",
    tags: ["Memory", "Loss"],
    excerpt:
      "Some places hold versions of us we’ll never be again.",
    cover: "/covers/the-room-we-left.jpg",
    content: `Chapter 1: The Room

The room still smelled like us.

Dust.
Old laughter.
Unfinished sentences.`,
  },

  {
    id: "before-the-sun-came-up",
    title: "Before the Sun Came Up",
    author: "Brownstone Publishing House",
    genre: "Drama",
    minutes: 7,
    description:
      "Two people sit with the night long enough to survive the morning.",
    tags: ["Healing", "Late Night"],
    excerpt:
      "The night didn’t fix everything—but it made surviving the morning possible.",
    cover: "/covers/before-the-sun-came-up.jpg",
    content: `Chapter 1: Before Morning

We sat on the curb as the sky started changing colors.

Nothing was solved.
Nothing was promised.

But for the first time in weeks,
I wasn’t afraid of the light.`,
  },
];

export const genres = [
  "All Genres",
  ...Array.from(new Set(stories.map((s) => s.genre))),
];