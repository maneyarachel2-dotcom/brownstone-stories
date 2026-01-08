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
I woke up in a white dress.

Not the white wedding dress I was promised—but a long, shapeless gown that clung to me like a confession. The fabric was stiff in places, damp in others. When I tried to move, it whispered against my skin, and that’s when I saw it—

blood.

Not fresh. Not dry. Somewhere in between, like it had been waiting for me to wake up.

My head felt wrong. Heavy. Hollow. As if someone had scooped something out of me and put it back without caring if it fit. Thoughts drifted in slowly, bumping into each other, slipping through cracks I couldn’t see.

I tried to sit up.

The room swayed, tilting just enough to make me nauseous, and I realized I didn’t know how I’d gotten here. I didn’t know how long I’d been asleep. I didn’t even know if I was supposed to remember.

A voice cut through the fog.

“Good,” it said. “You’re awake.”

A nurse stood beside the bed, smiling the way people do when they’ve practiced it too many times. Her badge caught the light. Her eyes didn’t.

I opened my mouth to ask a question—any question—but the only thing that came out was a name.

“Where’s Lucian?”

The smile faltered.

Just for a second.

And in that second, I understood something was wrong.`,
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
  content: `He doesn’t look at me when he says my name.

That’s how I know something is wrong.

We’re sitting at opposite ends of the kitchen table, a distance that feels intentional now. The clock above the fridge ticks too loudly. I can hear traffic outside, someone laughing on the sidewalk, life continuing like this moment isn’t about to split something open.

“You didn’t have to come,” I say.

“I wanted to.” His fingers tighten around the mug he hasn’t touched. “That’s the problem.”

I wait. I’ve learned that if I interrupt him, he’ll retreat. He always does—folds himself back into politeness, into careful words.

He exhales. Long. Measured.

“I ran into someone today.”

My chest tightens, but I keep my face neutral. “Okay.”

“At the bookstore on Fifth.” A pause. “She asked about you.”

That’s when he finally looks up.

Not guilty. Not nervous.

Afraid.

“What did you tell her?” I ask.

“The truth.”

My pulse stutters. “Which truth?”

He presses his lips together, considering. “That you were important to me.”

Another pause. Sharper this time. “That you still are.”

I don’t speak. I don’t trust myself to.

“She smiled when I said your name,” he continues. “Like she already knew how this story ends.”

The word *ends* lands between us, heavy.

“She said something else,” he adds.

I swallow. “What?”

“That you always come back when you think you’re ready.” His gaze doesn’t waver now. “And that I never am.”

The clock ticks. Tick. Tick.

“That’s not fair,” I say, though I’m not sure who I’m defending.

He nods once. “I know.”

Silence stretches again, taut as wire.

Then he reaches into his jacket and sets something on the table. Gently. Like it might bruise.

A folded piece of paper.

“I found this in an old book of mine,” he says. “It’s in your handwriting.”

My breath catches before I can stop it.

“I don’t remember writing it,” he continues. “But I remember how it felt to read it.”

I don’t touch the paper.

“What does it say?” I ask.

He stands.

“I think,” he says quietly, pulling on his coat, “you should read it alone.”

He hesitates at the door, hand on the knob.

“If you still want to talk after,” he adds, “you know where to find me.”

The door closes.

The apartment feels smaller without him.

After a moment, I reach for the paper.

My handwriting is unmistakable.

So is the date.

Tomorrow.`,
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
  content: `“This is the last episode. After this, you’re going straight to bed,” my dad says firmly, arms crossed as he stands in the doorway.

I groan under my breath but stay quiet.

“I’m not joking, Zaria. You have school tomorrow.” He leans forward slightly, his stare hardening, voice leaving no room for argument.

“Okay,” I mutter, slumping back into the couch as I turn to the TV, my lips pressed into a little pout.

I hate when Dad makes me go to bed early. It’s sooo unfair. I’m not even sleepy.

Now I don’t even feel like watching Cam and Sat, and it’s my favorite show. Two silly roommates going on adventures… normally I’d be laughing, but not tonight. Dad ruined the mood.

He walks into the living room and sits beside me, holding out a bowl of popcorn.

I glance at him, my voice softening into a whine. “Please, Dad… can I watch just two more episodes? I promise I’ll go to bed after that.”

He puts the bowl on the coffee table and shoves a hand of popcorn into his mouth. With a mouthful of popcorn, he gives me that look—the one that says he means it, and I better not ask again. Then he leans back into the couch, like the conversation’s already over.

The rain outside gets louder, tapping against the windows of our apartment. The walls are thin, and the whole place feels kinda damp when it rains, like the carpet never really dries. I hug my knees to my chest. It’s almost eight, but it feels later, with the dark sky pressing in on the glass.

A few minutes later, Dad is fast asleep, and another episode is about to start. My chest buzzes with excitement, but I hardly dare to move or even breathe, scared he’ll wake up and send me to bed.

Just as the theme song begins, there’s a knock at the door. Dad stirs awake, and my heart sinks. Ugh. Couldn’t they have picked a worse time?

He pushes himself off the couch slowly, every step heavy with sleep. “Who in the hell would be at the door this late at night?” he grumbles as he makes his way toward it.

There’s a long pause after the door creaks open. I get up from my seat to see who it is.

A woman stands there, soaking wet, staring at my father with something that looks like yearning.

I hear her voice—soft, deliberate—as she steps into the living room.

I don’t recognize her. Long hair, blue jeans, a cropped top… something about her makes me uneasy.

“Hi, baby,” she says, with a smile that doesn’t reach her eyes.

My heart starts thumping really fast. I squeeze my arms to my chest and take a tiny step back. Dad’s eyebrows pull together. Uh-oh.

“Dad…?” I whisper.

“You probably don’t remember me, but it’s Mom, Zaza,” she says.

My dad moves fast—faster than I’ve ever seen him move. He steps between us as she reaches for me, grabs my arm, and lifts me up. “Okay, it’s time to go to bed,” he says firmly.

I try to wiggle free, but he’s too strong. My stomach twists, and my eyes sting. I don’t understand why she’s here… or why Dad looks so serious.

He carries me to my bedroom and locks the door behind him when he leaves.

I stand there for a moment, everything inside me tangled and heavy. My legs feel strange as I drag myself to the bed and stare at the ceiling.

The arguing in the other room fades. The rain keeps falling, like it always does.

But something inside my chest has changed.

I have a mom.

I knew I had a mom. Dad told me once, when I had to do a family project for school. I remember asking him, and he got really quiet. Then he just said she died. That’s all.

But she doesn’t look dead to me.

She looks alive.

Alive and standing in our living room.

And if she’s alive… then why did Dad lie?

I press my face into the pillow and squeeze my eyes shut, but all I see is her smile—the one that didn’t reach her eyes.`,
},

 

  
];

export const genres = [
  "All Genres",
  ...Array.from(new Set(stories.map((s) => s.genre))),
];