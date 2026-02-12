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
    id: "The Comfort of What Always Hurt",
    title: "The Comfort of What Always Hurt",
    author: "Rachel Maneya",
    genre: "Romance",
    minutes: 5,
    description:
      "On a stormy night, an old lighthouse keeper writes a letter that will change everything for a daughter...",
    cover: "/covers/comfort of what always hurt.png",
    content: `Chapter 1
She didn’t mean to get used to disappointment.

But over time, it became the safest thing she knew.

In every relationship, there was a moment she could predict with painful accuracy:

the pause in his voice,

the sudden distance in his eyes,

the slow fading of effort.

It always came.

And strangely, she found comfort in the pattern.

At least disappointment never lied.

So, when Noah came into her life - gentle, patient, promising her things she didn’t believe in -she braced herself.

She didn’t show it.

He thought she was calm.

But inside, she was a woman holding her breath.

She waited for the slip.

The forgotten call.

The shift in tone.

The moment she’d lose him like she lost the others.

And when it happened, it wasn’t dramatic.

Just a Tuesday night.

He said he’d pick her up at seven, and by nine she was still sitting on her couch in her dress, staring at her phone.

There it was.

The familiar sting.

The quiet ache.

The whisper in her chest saying, of course. Of course he didn’t come.

Disappointment wrapped around her like an old blanket.

Cold, but familiar.

Heavy, but predictable.

She didn’t cry.

Not because she was strong,

but because she was tired.

This was the part she understood.

This was the part she could survive.

At 9:17, a knock hit the door.

She froze.

When she opened it, Noah stood there, breathless, eyes wild with panic.

“My car died,” he said, voice cracking. “I— I ran here. I didn’t want you to think I left you hanging.”

Her throat tightened.

She wasn’t prepared for this part.

The part where someone actually showed up.

The part where disappointment was interrupted.

“I thought…” she began, but the rest fell apart in her chest.

“That I didn’t care?” he whispered.

He stepped closer, gently cupping her face.

“You don’t have to expect the worst from me.”

But she did.

She always did.

It was how she protected herself.

And yet —

his thumb brushed away a tear she didn’t realize had fallen,

and suddenly she hated how comforting disappointment had become.

How it had trained her to accept less.

How it made her flinch at kindness.

“I’m trying,” she said.

Her voice was barely a breath.

“I know,” he replied.

“And I’ll keep showing up… until you stop expecting me to disappear.”

Something inside her cracked open.

Not fully.

Not magically.

Just enough.

Enough for her to let him in.

Enough for hope to take one small step forward.

Enough to realize that maybe the story she kept reliving wasn’t the only one she could write.

For the first time in a long time, disappointment didn’t feel like home.

It felt like a place she was finally ready to leave.
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

