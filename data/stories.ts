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
    id: "Everyone-Forgot-him",
    title: "Everyone forgot him",
    author: "Rachel Maneya",
    genre: "Romance",
    minutes: 5,
    description:
      "On a stormy night, an old lighthouse keeper writes a letter that will change everything for a daughter...",
    cover: "/covers/everyone forgot him.jpg",
    content: `Chapter 1
I woke up in a white dress...

[TRUNCATED FOR BREVITY — keep your full original content here exactly as you had it]
`,
  },

  {
    id: "tomorrow-i-think",
    title: "Tomorrow, I Think",
    author: "Rachel Maneya",
    genre: "Literary Romance",
    minutes: 6,
    description:
      "A quiet conversation at a kitchen table unearths a past that never fully stayed buried.",
    tags: ["Second Chances", "Unspoken Love", "Timing"],
    excerpt:
      "He doesn’t look at me when he says my name. That’s how I know something is wrong.",
    cover: "/covers/tomorrow-i-think.jpg",
    content: `He doesn’t look at me when he says my name...

[KEEP YOUR FULL CONTENT HERE]
`,
  },

  {
    id: "when-the-past-found-us",
    title: "When the Past Found Us",
    author: "Brownstone Publishing House",
    genre: "Literary Fiction",
    minutes: 8,
    description:
      "On a rainy night, a knock at the door forces a child to confront a truth she was never meant to know.",
    tags: ["Childhood", "Family Secrets", "Memory"],
    excerpt:
      "I knew I had a mom. Dad told me once. He said she died. But she didn’t look dead to me.",
    cover: "/covers/when the past found us.jpg",
    content: `“This is the last episode. After this, you’re going straight to bed,” my dad says firmly...

[KEEP YOUR FULL CONTENT HERE]
`,
  },

  // -------- NEW STORIES --------

  {
    id: "7",
    title: "The Night We Stayed",
    author: "Rachel Maneya",
    genre: "Literary Fiction",
    minutes: 7,
    description:
      "Two strangers wait out a storm and uncover something neither of them expected.",
    cover: "/covers/everyone forgot him.jpg",
    content: `The storm started just after midnight.

Neither of us meant to stay.

But when the power went out and the roads flooded, leaving felt more dangerous than remaining.

We didn’t speak much at first.

Just listened to the rain.

And waited.`,
  },

  {
    id: "8",
    title: "What We Don’t Say",
    author: "Rachel Maneya",
    genre: "Drama",
    minutes: 6,
    description:
      "In the silence between them, the truth grows louder.",
    cover: "/covers/everyone forgot him.jpg",
    content: `There are words we almost say.

They sit at the back of the throat,
burning.

We swallow them anyway.

Because sometimes silence feels safer
than honesty.`,
  },

  {
    id: "9",
    title: "Before the Morning",
    author: "Rachel Maneya",
    genre: "Romance",
    minutes: 5,
    description:
      "One final conversation before everything changes.",
    cover: "/covers/everyone forgot him.jpg",
    content: `We both knew it wouldn’t last.

That was the strange comfort of it.

When morning came,
we would go our separate ways.

But tonight—
we belonged to the same sky.`,
  },
{
    id: "9",
    title: "Before the Morning",
    author: "Rachel Maneya",
    genre: "Romance",
    minutes: 5,
    description:
      "One final conversation before everything changes.",
    cover: "/covers/everyone forgot him.jpg",
    content: `We both knew it wouldn’t last.

That was the strange comfort of it.

When morning came,
we would go our separate ways.

But tonight—
we belonged to the same sky.`,
  },
{
    id: "9",
    title: "Before the Morning",
    author: "Rachel Maneya",
    genre: "Romance",
    minutes: 5,
    description:
      "One final conversation before everything changes.",
    cover: "/covers/everyone forgot him.jpg",
    content: `We both knew it wouldn’t last.

That was the strange comfort of it.

When morning came,
we would go our separate ways.

But tonight—
we belonged to the same sky.`,
  },

{
    id: "9",
    title: "Before the Morning",
    author: "Rachel Maneya",
    genre: "Romance",
    minutes: 5,
    description:
      "One final conversation before everything changes.",
    cover: "/covers/everyone forgot him.jpg",
    content: `We both knew it wouldn’t last.

That was the strange comfort of it.

When morning came,
we would go our separate ways.

But tonight—
we belonged to the same sky.`,
  },

];

  


export const genres = [
  "All Genres",
  ...Array.from(new Set(stories.map((s) => s.genre))),
];

