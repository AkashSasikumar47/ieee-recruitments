export const DRIVE = {
  opens: "1 Nov",
  closes: "15 Nov 2026",
  status: "Applications open",
};

export type Domain = {
  code: string;
  name: string;
  word: string;
  blurb: string;
  work: string[];
};

export const DOMAINS: Domain[] = [
  {
    code: "R&D",
    word: "Research",
    name: "Research and Development",
    blurb: "Turn ideas into papers, prototypes and patents.",
    work: [
      "Research projects with faculty",
      "Paper writing and reviews",
      "Prototype builds",
    ],
  },
  {
    code: "RAS",
    word: "Robotics",
    name: "Robotics and Automation Society",
    blurb: "Build robots, drones and the code that drives them.",
    work: [
      "Robot builds and competitions",
      "Embedded and control systems",
      "Hands-on workshops",
    ],
  },
  {
    code: "IAS",
    word: "Industry",
    name: "Industry Applications Society",
    blurb: "Bring engineering into real industry problems.",
    work: ["Industry visits and talks", "Applied projects", "Case studies"],
  },
  {
    code: "CES",
    word: "Hardware",
    name: "Consumer Electronics Society",
    blurb: "Design the devices people use every day.",
    work: [
      "Hardware and IoT projects",
      "Product teardown sessions",
      "Tech showcases",
    ],
  },
  {
    code: "PELS",
    word: "Power",
    name: "Power Electronics Society",
    blurb: "Work on energy, power systems and EV tech.",
    work: ["Power and EV projects", "Simulation and design", "Expert sessions"],
  },
  {
    code: "WIE",
    word: "Inclusion",
    name: "Women in Engineering",
    blurb: "Champion women in technology across campus.",
    work: ["Mentorship circles", "Outreach programmes", "Leadership events"],
  },
  {
    code: "WAD",
    word: "Web & apps",
    name: "Web and App Development",
    blurb: "Ship the websites and apps behind IEEE SRMIST.",
    work: [
      "Build our websites and apps",
      "Hackathon tooling",
      "Code reviews and launches",
    ],
  },
  {
    code: "S&M",
    word: "Marketing",
    name: "Sponsorship and Marketing",
    blurb: "Find partners and tell the world what we do.",
    work: ["Sponsor outreach", "Campaigns and launches", "Partnership deals"],
  },
  {
    code: "CLP",
    word: "Writing",
    name: "Content and Literary",
    blurb: "Write the words behind every event and post.",
    work: ["Event copy and scripts", "Newsletters", "Social captions"],
  },
  {
    code: "M&C",
    word: "Design",
    name: "Media and Creatives",
    blurb: "Shoot, design and edit everything you see.",
    work: [
      "Posters and brand design",
      "Photo and video coverage",
      "Reels and motion",
    ],
  },
];

export const STEPS = [
  {
    title: "Apply",
    date: "1–15 Nov",
    description: "Fill in the form and pick up to three domains, in order.",
  },
  {
    title: "Shortlist",
    date: "18 Nov",
    description: "Each domain reads every application and shortlists.",
  },
  {
    title: "Interview",
    date: "20–24 Nov",
    description: "A short, friendly chat with the domain leads.",
  },
  {
    title: "Results",
    date: "28 Nov",
    description: "Results go out, and onboarding starts the week after.",
  },
];

export const FAQS = [
  {
    question: "Who can apply?",
    answer: "Any SRMIST student, from any year, degree or department.",
  },
  {
    question: "Do I need experience?",
    answer:
      "No. We look for curiosity and commitment. Experience helps, but it isn't required.",
  },
  {
    question: "How many domains can I pick?",
    answer:
      "Up to three, in order of preference. Each one you pick reads your application.",
  },
  {
    question: "Is there a fee?",
    answer: "No. Applying and joining a domain is free.",
  },
  {
    question: "What happens in the interview?",
    answer:
      "A short chat with the domain leads about you, your interests and why you want to join.",
  },
  {
    question: "Do I need a resume?",
    answer:
      "It's optional. If you have one, share a Google Drive link that anyone at SRM can open.",
  },
];

export const DEGREES = [
  "B.Tech",
  "B.E.",
  "B.Sc.",
  "B.Com",
  "B.A.",
  "B.Arch",
  "B.B.A.",
  "Other",
];

export const YEARS = ["1st year", "2nd year", "3rd year", "4th year"];

export const SITE_LINKS = [
  { label: "About IEEE", href: "/#about-ieee" },
  { label: "Domains", href: "/#domains" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
  { label: "Apply", href: "/apply" },
];
