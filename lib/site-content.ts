export interface FeaturedItem {
  title: string;
  summary: string;
  href: string;
  label: string;
}

export interface ServiceArea {
  title: string;
  summary: string;
  details: string[];
}

export interface ResearchBrief {
  title: string;
  slug: string;
  category: string;
  summary: string;
  signal: string;
  body: string[];
}

export interface ProjectProfile {
  title: string;
  slug: string;
  type: string;
  summary: string;
  tags: string[];
  body: string[];
}

export interface CaseStudyProfile {
  title: string;
  slug: string;
  studyType: string;
  gameAnalyzed?: string;
  question: string;
  approach: string;
  findings: string;
  body: string[];
}

export interface EducationProgram {
  title: string;
  learningPath: string;
  summary: string;
  topics: string[];
}

export interface ResourceItem {
  title: string;
  slug: string;
  format: string;
  summary: string;
  body: string[];
}

export interface ArticlePreview {
  title: string;
  slug: string;
  series: string;
  summary: string;
  body: string[];
}

export interface InquiryTrack {
  title: string;
  description: string;
}

export const homeFeatured: FeaturedItem[] = [
  {
    title: "Game Breakdowns",
    summary: "Learn to play complex wargames by understanding their core mechanics step-by-step.",
    href: "/blog",
    label: "Guides",
  },
  {
    title: "Mechanics Analysis",
    summary: "Deep dives into what specific wargame rules are doing and why they work the way they do.",
    href: "/research",
    label: "Analysis",
  },
  {
    title: "Interactive Demos",
    summary: "Playable examples that isolate and teach individual wargaming concepts.",
    href: "/wargames",
    label: "Demos",
  },
];

export const serviceAreas: ServiceArea[] = [
  {
    title: "Playing Complex Wargames",
    summary: "Break down intimidating games into understandable pieces. Learn core mechanics first, then add layers.",
    details: [
      "Step-by-step guides for games like Next War, Littoral Commander, and others",
      "Core mechanics tutorials before diving into advanced rules",
      "Example gameplay with clear explanations",
    ],
  },
  {
    title: "Understanding Mechanics",
    summary: "Analyze what wargame rules are actually modeling and why designers made specific choices.",
    details: [
      "Why hex grids vs area movement matters",
      "What combat resolution systems teach about friction and uncertainty",
      "How victory conditions shape player behavior",
    ],
  },
  {
    title: "Wargames as Research Tools",
    summary: "Explore how wargames can be used to think through real-world strategic questions and historical problems.",
    details: [
      "Using matrix games to explore gray-zone conflict",
      "Modeling historical decisions through gameplay",
      "Testing strategic hypotheses in playable systems",
    ],
  },
];

export const researchBriefs: ResearchBrief[] = [
  {
    title: "Why Hex Grids Make Better Wargames Than Squares",
    slug: "why-hex-grids",
    category: "Mechanics Deep Dive",
    summary: "Hexagons solve the adjacency problem that square grids create, making movement and positioning more intuitive and fair.",
    signal: "Focus: game geometry, movement, and tactical positioning.",
    body: [
      "Square grids have a fundamental problem: diagonal movement. Moving diagonally covers more distance than moving orthogonally, which creates weird edge cases and rule patches.",
      "Hexagons fix this. Every adjacent hex is exactly the same distance away. This makes movement costs consistent, positioning more intuitive, and zones of control cleaner.",
      "Most serious wargames use hexes for this reason. Once you understand why, you start seeing how fundamental design decisions cascade through an entire game system.",
    ],
  },
  {
    title: "How Twilight Struggle Models Cold War Tension",
    slug: "twilight-struggle-cold-war-model",
    category: "Game Analysis",
    summary: "Breaking down how Twilight Struggle's mechanics capture the nature of superpower competition without simulating individual battles.",
    signal: "Focus: abstraction, influence systems, and event-driven gameplay.",
    body: [
      "Twilight Struggle doesn't simulate tank divisions or naval battles. Instead, it models influence, control, and the risk of escalation through card-driven events and area control.",
      "The DEFCON track is brilliant design: it creates constant tension between aggressive moves (which lower DEFCON) and the risk of triggering nuclear war (instant loss). This captures Cold War logic better than any combat resolution table could.",
      "This is a masterclass in abstraction. The game asks: 'What was the Cold War really about?' and builds mechanics around that question instead of trying to simulate everything.",
    ],
  },
  {
    title: "What Combat Odds Tables Actually Teach",
    slug: "combat-odds-tables",
    category: "Classic Mechanics",
    summary: "Understanding why classic hex-and-counter games use odds-based combat and what it models about warfare.",
    signal: "Focus: combat resolution, probability, and historical accuracy.",
    body: [
      "Combat Odds Tables (CRT) feel archaic, but they're teaching something specific: concentration of force matters more than raw numbers.",
      "A 3:1 attack has better odds than three separate 1:1 attacks. This models the principle of mass: you want to concentrate your forces at decisive points, not spread them evenly.",
      "Modern games often replace CRTs with card-driven systems or dice pools, but the lesson remains: how you resolve combat shapes what players learn about warfare.",
    ],
  },
];

export const projectProfiles: ProjectProfile[] = [
  {
    title: "Next War Series: How to Play",
    slug: "next-war-how-to-play",
    type: "Game Guide Series",
    summary: "A step-by-step guide to learning the Next War series by GMT Games, starting with core mechanics and building to the full complexity.",
    tags: [
      "Modern warfare",
      "Hex and counter",
      "Operational scale",
    ],
    body: [
      "The Next War series looks intimidating: thick rulebooks, dense maps, hundreds of counters. But underneath is a very logical system.",
      "This guide breaks it down: start with basic movement and combat, then add air power, then logistics, then political rules. Each layer builds on the last.",
      "By the end, you'll understand not just how to play Next War, but why modern operational wargames are designed the way they are.",
    ],
  },
  {
    title: "Matrix Game Primer: A Simple Tool for Complex Questions",
    slug: "matrix-game-primer",
    type: "Educational Design",
    summary: "An introduction to matrix games as flexible tools for exploring strategic questions when you don't have a formal ruleset.",
    tags: [
      "Matrix games",
      "Scenario design",
      "Strategic thinking",
    ],
    body: [
      "Matrix games are the most underrated tool in wargaming. They're simple: players describe actions, argue why they'd work, and a facilitator judges the outcome.",
      "This makes them perfect for exploring questions that don't have existing games: 'How would a crisis in the Taiwan Strait unfold?' or 'What would a cyberattack on infrastructure look like?'",
      "This primer shows you how to design and run a matrix game for any scenario you're curious about.",
    ],
  },
  {
    title: "Learning Littoral Commander: Build Complexity Layer by Layer",
    slug: "littoral-commander-teaching-guide",
    type: "Game Guide",
    summary: "A teaching approach for Littoral Commander that starts with core concepts and gradually layers in detection, missiles, and electronic warfare.",
    tags: [
      "Modern naval warfare",
      "Teaching guide",
      "Game structure",
    ],
    body: [
      "Littoral Commander models modern naval combat in coastal waters. It's a complex system with detection, missiles, electronic warfare, and overlapping sensor ranges.",
      "The trick is to teach the core loop first: detection, targeting, engagement. Start with simple scenarios where everything is visible and missiles always hit.",
      "Once players understand the basic cycle, then you layer in detection rolls, countermeasures, and electronic warfare. Mechanics first, chrome later.",
    ],
  },
];

export const caseStudies: CaseStudyProfile[] = [
  {
    title: "Using Wargames to Understand the Battle of Kursk",
    slug: "kursk-wargame-analysis",
    studyType: "Historical Research",
    gameAnalyzed: "Enemy at the Gates (Lock 'n Load)",
    question: "What does playing Kursk scenarios teach us about the historical battle that reading doesn't?",
    approach: "Played multiple Kursk scenarios across different game systems, analyzing what choices players face and what constraints the games model.",
    findings: "Wargames make visible the operational dilemma: German forces had to attack despite unfavorable conditions because waiting meant letting Soviet defenses strengthen. The games teach through constraint, not narrative.",
    body: [
      "Reading about Kursk tells you what happened. Playing Kursk wargames shows you why certain decisions were made and what alternatives existed.",
      "Every game models the same core problem: the Germans need a decisive breakthrough, but the Soviets have prepared defense-in-depth. The clock is ticking, and the weather won't hold.",
      "What you learn from play: the historical commanders were facing genuinely hard choices with no good options. The game makes their constraints tangible in a way that text cannot.",
    ],
  },
  {
    title: "How Combat Commander Teaches Tactical Uncertainty",
    slug: "combat-commander-uncertainty",
    studyType: "Mechanics Analysis",
    gameAnalyzed: "Combat Commander: Europe",
    question: "What does Combat Commander's card-driven system model that other tactical games miss?",
    approach: "Compared Combat Commander to other squad-level games (ASL, Conflict of Heroes) focusing on how uncertainty and friction are represented.",
    findings: "The card-driven system creates real fog of war: you can't execute your perfect plan because you don't have the cards. This models command friction better than deterministic activations.",
    body: [
      "Most tactical wargames let you do whatever you want on your turn, limited only by action points or movement allowances. Combat Commander says 'not so fast.'",
      "You draw cards that determine what you can do. Maybe you want to fire, but you drew movement cards. Maybe you need to rally, but all you have is artillery.",
      "This is brilliant design. It models the friction of war: plans falling apart, improvisation under pressure, making do with what you have instead of what you wanted.",
    ],
  },
  {
    title: "Modeling Gray Zone Conflict Through Matrix Games",
    slug: "gray-zone-matrix-game",
    studyType: "Applied Research",
    question: "How can we explore modern 'gray zone' competition when no traditional wargame exists for it?",
    approach: "Designed a matrix game around a hypothetical South China Sea scenario, focusing on ambiguous actions and escalation risk.",
    findings: "Matrix games excel at modeling political-military gray zones because they don't require pre-defined rules for every action. Players invent moves, which mirrors the ambiguity of real gray zone competition.",
    body: [
      "Gray zone conflicts don't fit traditional wargames well. They're about ambiguous actions, legal warfare, and slowly shifting norms - not tank battles.",
      "Matrix games are perfect for this. Players propose actions ('We deploy fishing militia to contested waters'), argue why they work, and the facilitator adjudicates.",
      "What emerged from gameplay: gray zone competition is hard to counter because each individual action seems small, but the cumulative effect is strategic. The game made this visible.",
    ],
  },
];

export const educationPrograms: EducationProgram[] = [
  {
    title: "Hex & Counter Fundamentals",
    learningPath: "Beginner Series",
    summary: "Start here if you've never played a hex-and-counter wargame. Learn movement, zones of control, stacking, and combat odds.",
    topics: [
      "Reading counters and maps",
      "Movement and terrain",
      "Combat odds tables and CRTs",
      "Stacking and supply basics",
    ],
  },
  {
    title: "Playing Complex Wargames: A Learning Path",
    learningPath: "Intermediate Series",
    summary: "Step-by-step guides for learning intimidating games like Next War, OCS, COIN, and other heavy systems.",
    topics: [
      "Breaking down complex rulebooks",
      "Learning core mechanics before chrome",
      "Example gameplay walkthroughs",
      "Common mistakes and how to avoid them",
    ],
  },
  {
    title: "Wargame Design Basics",
    learningPath: "Creator Series",
    summary: "Learn to design your own wargames or scenarios. Understand what mechanics model and how to playtest effectively.",
    topics: [
      "Choosing what to abstract",
      "Core mechanic design",
      "Playtesting and iteration",
      "Balancing historical accuracy vs playability",
    ],
  },
];

export const resourceItems: ResourceItem[] = [
  {
    title: "Wargame Complexity Ladder",
    slug: "wargame-complexity-ladder",
    format: "Guide",
    summary: "A recommended learning path from simple intro games to complex simulations, organized by mechanics and complexity.",
    body: [
      "Don't start with Advanced Squad Leader. This guide maps out a progression from gateway games to heavy simulations.",
      "Start simple (Memoir '44, Commands & Colors), move to medium complexity (Combat Commander, Conflict of Heroes), then tackle the heavy stuff (ASL, OCS, Next War).",
      "Each step builds skills that prepare you for the next level of complexity.",
    ],
  },
  {
    title: "Reading a Wargame Rulebook",
    slug: "reading-wargame-rulebooks",
    format: "Tutorial",
    summary: "How to approach dense wargame rulebooks without getting overwhelmed. Focus on structure, not details.",
    body: [
      "Rulebooks are intimidating because they're written for reference, not learning. Here's how to read them effectively:",
      "First pass: read only the bolded section headers to understand the game structure. Second pass: read the basic rules. Third pass: add special rules and exceptions.",
      "Don't try to memorize everything. Use the rulebook as a reference during play and gradually internalize the mechanics.",
    ],
  },
  {
    title: "Wargaming Terms Glossary",
    slug: "wargaming-glossary",
    format: "Reference",
    summary: "Common wargaming terminology explained: ZOC, OOS, EZOC, odds columns, phasing player, and dozens more.",
    body: [
      "Wargames use jargon that's opaque to newcomers. This glossary defines the common terms you'll encounter in rulebooks and discussions.",
      "Organized by category: movement terms, combat terms, supply terms, game structure terms, and design terms.",
      "Keep this open while reading your first few rulebooks. The jargon becomes natural with exposure.",
    ],
  },
  {
    title: "Matrix Game Template",
    slug: "matrix-game-template",
    format: "Worksheet",
    summary: "A simple template for running your first matrix game, including setup, turn structure, and adjudication guidelines.",
    body: [
      "Matrix games are the easiest wargame format to design from scratch. This template walks you through setup.",
      "Define your scenario, set up factions and their goals, establish the basic situation, then let players propose actions and argue for them.",
      "Perfect for exploring scenarios that don't have existing games or for teaching strategic thinking without rulebook overhead.",
    ],
  },
];

export const articlePreviews: ArticlePreview[] = [
  {
    title: "How to Learn Your First Hex-and-Counter Game",
    slug: "first-hex-and-counter-game",
    series: "Beginner Guides",
    summary: "A practical guide to learning your first traditional wargame without feeling overwhelmed by counters, charts, and dense rules.",
    body: [
      "Hex-and-counter games look intimidating. Hundreds of cardboard counters, thick rulebooks, dense charts. But the core is usually simple.",
      "Start with the sequence of play. Understand the turn structure. Then learn movement. Then combat. Ignore special rules until you've played the basics.",
      "Your first game will be slow and you'll make mistakes. That's fine. The goal is understanding the flow, not playing perfectly.",
    ],
  },
  {
    title: "Why Wargames Are Better Teaching Tools Than Books",
    slug: "wargames-as-teaching-tools",
    series: "Theory",
    summary: "Games force you to make decisions under constraints, which teaches strategic thinking in ways that passive reading cannot.",
    body: [
      "Reading about strategy is passive. You nod along with the author's analysis and feel like you understand.",
      "Playing a wargame is active. You have to make choices with incomplete information, face tradeoffs, and live with consequences. Understanding becomes visceral.",
      "This is why wargames are used in military education: they create learning through decision-making, not just knowledge transfer.",
    ],
  },
  {
    title: "What Makes a Good First Wargame?",
    slug: "good-first-wargame",
    series: "Beginner Guides",
    summary: "Not all wargames are suitable for learning. Here's what to look for in a good introductory game.",
    body: [
      "A good first wargame should teach core concepts without overwhelming you with chrome. It should be playable in 2-3 hours. And it should be fun.",
      "Look for games with clean rulesets, clear victory conditions, and interesting decisions. Avoid games with dozens of special rules or fiddly exceptions.",
      "Some excellent starting points: Memoir '44, Commands & Colors series, Battle for Moscow, COIN games (with the short scenario), or anything from the Commands & Colors family.",
    ],
  },
];

export const inquiryTracks: InquiryTrack[] = [
  {
    title: "Suggest a Game to Cover",
    description: "Know a complex wargame that deserves a teaching guide or mechanics breakdown? Let me know what you'd like to see covered.",
  },
  {
    title: "Share Your Experience",
    description: "Have insights from playing a particular wargame? Questions about mechanics? Share your experiences and let's discuss.",
  },
  {
    title: "Collaboration Inquiry",
    description: "Interested in collaborating on wargame analysis, scenario design, or educational content? Get in touch to explore working together.",
  },
];
