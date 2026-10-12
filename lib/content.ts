export function driveCopy(drive: string | null) {
  return drive
    ? {
        status: `${drive} · Applications open`,
        action: "Apply now",
        word: "Apply",
        ring: "Applications open · Join IEEE SRMIST · Recruitments · ",
        label: "Application",
        title: "*Apply* now",
        submit: "Send application",
      }
    : {
        status: "Recruitment closed · Waitlist open",
        action: "Join the waitlist",
        word: "Waitlist",
        ring: "Waitlist open · Join IEEE SRMIST · Recruitments · ",
        label: "Waitlist",
        title: "Join the *waitlist*",
        submit: "Join the waitlist",
      };
}

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
    blurb:
      "Academic research, IEEE paper publications and experimental prototypes.",
    work: [
      "IEEE conference and journal papers",
      "Patents and technical ideation",
      "Research circles and literature reviews",
      "Simulation and prototyping",
    ],
  },
  {
    code: "CES",
    word: "Hardware",
    name: "Consumer Electronics Society",
    blurb: "Embedded systems, IoT and smart hardware engineering.",
    work: [
      "Embedded firmware and microcontrollers",
      "IoT builds",
      "Custom PCB design and prototyping",
      "Sensor and wireless integration",
    ],
  },
  {
    code: "IAS",
    word: "Industry",
    name: "Industry Applications Society",
    blurb:
      "Industrial automation, smart control systems and applied electrical engineering.",
    work: [
      "Industrial automation and PLCs",
      "SCADA and control architectures",
      "Applied electrical and power drives",
      "Smart manufacturing systems",
    ],
  },
  {
    code: "PELS",
    word: "Power",
    name: "Power Electronics Society",
    blurb: "Power conversion, EV powertrains and renewable energy.",
    work: [
      "Power converters and inverters",
      "Electric vehicle powertrains",
      "Renewable and solar integration",
      "Battery management systems",
    ],
  },
  {
    code: "RAS",
    word: "Robotics",
    name: "Robotics and Automation Society",
    blurb: "Robot builds, autonomous navigation and mechatronic design.",
    work: [
      "Robot kinematics and mechatronics",
      "Autonomous navigation and computer vision",
      "ROS and simulation",
      "Competitive robotics",
    ],
  },
  {
    code: "WAD",
    word: "Web & apps",
    name: "Web and App Development",
    blurb:
      "The digital products, platforms and infrastructure behind IEEE SRMIST.",
    work: [
      "Full-stack web development",
      "Cloud deployment and CI/CD",
      "UI/UX and design systems",
      "Tooling and API integrations",
    ],
  },
  {
    code: "WIE",
    word: "Inclusion",
    name: "Women in Engineering",
    blurb: "Diversity, technical mentorship and inclusive leadership.",
    work: [
      "Technical mentorship circles",
      "Women in tech leadership summits",
      "STEM school outreach",
      "Skill-building masterclasses",
    ],
  },
  {
    code: "S&M",
    word: "Marketing",
    name: "Sponsorship and Marketing",
    blurb: "Industry alliances, corporate partnerships and marketing strategy.",
    work: [
      "Corporate sponsorships",
      "Marketing campaigns",
      "MOUs and partner outreach",
      "Alumni and industry networking",
    ],
  },
  {
    code: "CLP",
    word: "Logistics",
    name: "Corporate, Logistics and Publicity",
    blurb: "Event management, on-ground logistics and publicity drives.",
    work: [
      "On-ground event logistics",
      "Campus publicity drives",
      "Guest protocol and hospitality",
      "Venue and infrastructure coordination",
    ],
  },
  {
    code: "M&C",
    word: "Media",
    name: "Media and Content",
    blurb: "Visual identity, design, writing, film and storytelling.",
    work: [
      "Motion graphics and video editing",
      "Graphic design and brand assets",
      "Content writing and editorial copy",
      "Event photography and cinematography",
    ],
  },
];

export const STEPS = [
  {
    title: "Waitlist",
    date: "Now",
    description: "Leave your details and pick up to three domains, in order.",
  },
  {
    title: "Recruitment opens",
    date: "Next drive",
    description:
      "Everyone on the waitlist hears first, and each domain shortlists.",
  },
  {
    title: "Interview",
    date: "After the shortlist",
    description: "A short, friendly chat with the domain leads.",
  },
  {
    title: "Results",
    date: "End of the drive",
    description: "Results go out, and onboarding starts the week after.",
  },
];

export const FAQS = [
  {
    question: "Is recruitment open?",
    answer:
      "Not right now. Recruitment is closed, but the waitlist is open: join it and you'll hear first when the next drive opens.",
  },
  {
    question: "Who can join?",
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
      "Up to three, in order of preference. Each one you pick sees your details when recruitment opens.",
  },
  {
    question: "Is there a fee?",
    answer: "No. The waitlist, applying and joining a domain are all free.",
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
  { label: "Waitlist", href: "/waitlist" },
];
