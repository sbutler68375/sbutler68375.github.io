// All editable site content lives here.
// Leave a path/URL as "" to show a styled placeholder; fill it in to render the real thing.
// Expected image locations (in /public): /images/headshot.jpg, /projects/<slug>/1.png ... 3.png, /resume.pdf

export type SiteImage = { src: string; alt: string; label: string };

export type Project = {
  slug: string;
  title: string;
  description: string;
  why: string;
  stats: string[];
  githubUrl: string;
  images: SiteImage[]; // first is the main screenshot
};

const shots = (slug: string, title: string): SiteImage[] =>
  [1, 2, 3].map((n) => ({
    src: `/projects/${slug}/${n}.jpg`,
    alt: `${title} screenshot ${n}`,
    label: `SCREENSHOT ${n}`,
  }));

export const site = {
  name: "Sean Butler",
  monogram: "SB.",
  tagline: "Data analytics · Data science · AI/data engineering",
  quote: {
    text: "I skate to where the puck is going to be, not where it has been.",
    author: "Wayne Gretzky",
  },
  graduation: "Expected graduation · April 2027",
  email: "seanbutler212@gmail.com",
  emailUrl: "mailto:seanbutler212@gmail.com",
  githubUrl: "https://github.com/sbutler68375",
  linkedinUrl: "https://www.linkedin.com/in/sean-butler-275a27253",
  headshot: { src: "/images/headshot.jpg", alt: "Headshot of Sean Butler", label: "PHOTO" },
  aboutPhoto: { src: "/images/headshot.jpg", alt: "Sean Butler", label: "PHOTO" },
  about: [
    "Lorem ipsum dolor sit amet, I'm a student who loves turning messy data into clear decisions. Consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
  ],
  currently: "Placeholder — what I'm working on right now.",
  resumePdf: "/resume.pdf",
  projects: [
    {
      slug: "churn",
      title: "Customer Churn Prediction",
      description:
        "A machine learning model that predicts which customers are likely to churn, with an executive overview, account-level deep dive, and model diagnostics.",
      why: "Placeholder — why I built this project.",
      stats: ["Python", "scikit-learn", "AUC 0.00"],
      githubUrl: "https://github.com/sbutler68375/churn_predictor",
      images: shots("churn", "Customer Churn Prediction"),
    },
    {
      slug: "hockey",
      title: "Hockey AI Analytics Platform",
      description:
        "A hockey analytics dashboard that uses machine learning to generate team and player ratings from game data.",
      why: "Placeholder — why I built this project.",
      stats: ["Tool", "Tool", "Metric"],
      githubUrl: "https://github.com/sbutler68375/hockey_dashboard",
      images: shots("hockey", "Hockey AI Analytics Platform"),
    },
    {
      slug: "ella-rises",
      title: "Ella Rises",
      description:
        "A full-stack nonprofit platform with a program analytics dashboard and event management to track reach and impact.",
      why: "Placeholder — why I built this project.",
      stats: ["Tool", "Tool", "Metric"],
      githubUrl: "https://github.com/sbutler68375/Intex2025_EllaRises",
      images: shots("ella-rises", "Ella Rises"),
    },
    {
      slug: "open-arms",
      title: "Open Arms",
      description:
        "A full-stack nonprofit platform with admin analytics and a safehouse map that turns operational data into insight.",
      why: "Placeholder — why I built this project.",
      stats: ["Tool", "Tool", "Metric"],
      githubUrl: "https://github.com/sbutler68375/Intex2026_OpenArms",
      images: shots("open-arms", "Open Arms"),
    },
  ] as Project[],
};
