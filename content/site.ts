/**
 * EDIT THIS FILE to update the website. The details come from Ismail's resume (D:\resume).
 *
 * Any text wrapped in [square brackets] is a detail still to fill in.
 * While you run the site locally (npm run dev) it shows with a dashed amber outline so you can find it.
 * On the published site (npm run build) unfilled details are hidden, so nothing looks unfinished.
 *
 * The "Resume" buttons download public/Ismail-Ihthisham-Resume.pdf. Replace that file when your resume changes.
 */

export type Project = {
  code: string;
  name: string;
  /** A shorter name for the floating code behind the robot. */
  short: string;
  file: string;
  kind: string;
  tagline: string;
  problem: string;
  built: string;
  contribution: string;
  challenge: string;
  result: string;
  stack: string[];
};

export const site = {
  name: "Ismail Ihthisham",
  firstName: "Ismail",
  lastName: "Ihthisham",
  role: "Software Engineer",
  /**
   * The live address of this website. Link previews on LinkedIn, WhatsApp etc. need it to find
   * public/og-image.jpg, so update it if the address ever changes.
   */
  url: "https://ismail-ihthisham.netlify.app",
  /** A small badge at the top, e.g. "Open to new opportunities". Leave empty to hide it. */
  status: "",
  /** Typed one after another under the name. */
  roles: ["Software Engineer", "Backend Developer", "Full-Stack Developer"],
  statement: "I build secure backend systems and full-stack applications.",
  summary:
    "Software engineer building secure payment and transaction-based applications with Java, Spring Boot, Python and React.",
  /** The short opening paragraph of the About section. */
  about: [
    "I'm a software engineer with 2 years of experience building secure payment and transaction-based applications, from a US fintech platform to a financial kiosk running on ATM hardware.",
  ],
  /** Shown as tag rows under the About paragraph. */
  focus: ["API design", "Authentication & authorization", "System integration", "Reliable transaction flows"],
  learning: ["FastAPI", "Django", "Microservices", "AWS", "CI/CD", "Kafka", "Redis"],

  /** The small cards next to the robot at the top of the page. */
  stats: [
    { label: "Years of experience", value: "2" },
    { label: "Projects shipped", value: "5" },
    { label: "Focus", value: "Backend + full-stack", text: true },
  ],

  /** The logo row in the hero, under the intro. Each icon is public/logos/<icon>.svg. */
  tools: [
    { name: "Java", icon: "java" },
    { name: "Spring Boot", icon: "spring" },
    { name: "Python", icon: "python" },
    { name: "React", icon: "react" },
    { name: "C# / .NET", icon: "csharp" },
    { name: "MySQL", icon: "mysql" },
    { name: "Docker", icon: "docker" },
  ],

  /** The card beside the About text. */
  facts: [
    { label: "Role", value: "Software Engineer (Junior) at Raasoft" },
    { label: "Based in", value: "Mangaluru, India" },
    { label: "Studied", value: "B.E. Computer Science, VTU (2023)" },
  ],

  contact: {
    email: "ishamudy777@gmail.com",
    location: "Mangaluru, Karnataka, India",
    github: "https://github.com/Isham77",
    linkedin: "https://linkedin.com/in/ismail-ihthisham",
  },

  services: [
    {
      icon: "monitor",
      title: "Backend APIs",
      text: "REST APIs in Java and Spring Boot, secured with Spring Security, with clean authentication and session handling.",
      tags: ["Java", "Spring Boot", "Spring Security"],
    },
    {
      icon: "package",
      title: "Full-stack applications",
      text: "React, Redux and Vue.js front ends wired to the APIs behind them, from the first screen to production.",
      tags: ["React", "TypeScript", "Vue.js"],
    },
    {
      icon: "cpu",
      title: "Payments and integrations",
      text: "Transaction-safe payment flows and system integration, from fintech payment APIs to ATM hardware.",
      tags: ["Python", "C# / .NET", "WebView2"],
    },
  ],

  /* The site lays out as many projects as you list. */
  projects: [
    {
      code: "01",
      name: "Financial Kiosk & ATM Integration",
      short: "Financial Kiosk",
      file: "kiosk.tsx",
      kind: "Raasoft",
      tagline: "A standalone financial kiosk that runs real-time cash transactions on ATM hardware.",
      problem: "Cash transactions at a standalone kiosk have to stay exact, and the web app has to reach ATM hardware it can't call directly.",
      built: "End-to-end flows for real-time cash transactions: bill denomination exchange, ticket generation on successful payment, and ticket redemption.",
      contribution: "Core developer from the project's initial phase.",
      challenge: "An in-house NPM security package that acts as middleware, connecting the app to ATM device DLL methods through a WebView2 bridge to the C#/.NET host.",
      result: "Transaction-safe flows that keep every cash operation accurate and prevent monetary discrepancies.",
      stack: ["React", "TypeScript", "C#", ".NET", "WebView2"],
    },
    {
      code: "02",
      name: "Payment & Reconciliation Platform",
      short: "Payments Platform",
      file: "payments.py",
      kind: "Raasoft",
      tagline: "A payment and reconciliation SaaS used by US auto dealerships.",
      problem: "Dealerships take payments through text and email payment links, apply surcharges, and reconcile every transaction.",
      built: "Payment flows integrated with backend payment APIs.",
      contribution: "Worked on the Python platform's payment flows.",
      challenge: "Transaction status handling across the payment APIs.",
      result: "[A result you can share, if any]",
      stack: ["Python", "REST APIs"],
    },
    {
      code: "03",
      name: "Hybrid Client Service Application",
      short: "Hybrid Client App",
      file: "app.vue",
      kind: "Raasoft",
      tagline: "A client's promotional mobile app, built from scratch and now in production.",
      problem: "The client needed a promotional mobile app that could be released quickly and maintained easily.",
      built: "API-driven components with secure session management, plus mobile-specific routing and back-navigation handling.",
      contribution: "Built the app from scratch and chose its architecture.",
      challenge: "Chose a WebView architecture over full native or Flutter, for faster release cycles and simpler maintenance.",
      result: "Live in production.",
      stack: ["Vue.js", "JavaScript", "WebView", "REST APIs"],
    },
    {
      code: "04",
      name: "AI Job Search & Application Agent",
      short: "AI Job Agent",
      file: "agent.py",
      kind: "Personal project",
      tagline: "A Python pipeline that finds, ranks and applies to jobs automatically.",
      problem: "Searching and applying across many job boards by hand is slow and repetitive.",
      built: "A data pipeline that collects jobs from 8 sources, including Naukri, Indeed, LinkedIn and the Greenhouse, Lever, Workday and SmartRecruiters APIs, then deduplicates, filters and ranks them with batched LLM scoring.",
      contribution: "Personal project.",
      challenge: "Automated application forms with Playwright (field detection, dropdowns, file upload), and automatic discovery of new company career boards from apply links.",
      result: "7,500+ listings processed in a single 45-minute run, coverage grown from 40 to 60+ companies, and every job tracked in SQLite with an HTML dashboard.",
      stack: ["Python", "Playwright", "SQLite", "REST APIs", "LLM (Claude)"],
    },
    {
      code: "05",
      name: "Full-Stack Social Media Platform",
      short: "Social Platform",
      file: "SocialApi.java",
      kind: "Personal project",
      tagline: "A social platform with secured Spring Boot APIs and a React front end.",
      problem: "A social platform needs user profiles, content and media behind secure accounts.",
      built: "RESTful Spring Boot APIs for user profiles and content, consumed by a React and Redux front end.",
      contribution: "Personal project.",
      challenge: "Endpoints secured with Spring Security authentication and authorization, a MySQL data model for profiles and content, and Cloudinary for media storage.",
      result: "[A result you can share, if any]",
      stack: ["Java", "Spring Boot", "Spring Security", "MySQL", "React", "Redux", "Tailwind CSS", "Cloudinary"],
    },
  ] as Project[],

  /* The clickable diagram: how the kiosk app reaches the ATM hardware. */
  system: {
    nodes: [
      {
        id: "ui",
        label: "React UI",
        layer: "Kiosk screens",
        detail: "The kiosk app, built in React and TypeScript. It asks for a cash or device action and shows the result.",
      },
      {
        id: "package",
        label: "NPM Security Package",
        layer: "Middleware",
        detail: "An in-house package that sits between the app and the hardware, so every device call goes through one secure layer.",
      },
      {
        id: "bridge",
        label: "WebView2 + .NET Host",
        layer: "Bridge",
        detail: "The app runs inside WebView2, which bridges it to the C#/.NET host application.",
      },
      {
        id: "atm",
        label: "ATM Device DLLs",
        layer: "Hardware",
        detail: "The host calls the ATM device's DLL methods: the layer that actually handles the cash.",
      },
    ],
  },

  experience: [
    {
      company: "Raasoft Pvt Infotech",
      role: "Software Engineer (Junior)",
      period: "Dec 2024 – Present",
      points: [
        "Core developer on a standalone financial kiosk with ATM integration: real-time cash flows, and an in-house NPM security package that bridges to ATM device DLLs through WebView2 and C#/.NET.",
        "Built payment flows for a Python payment and reconciliation SaaS used by US auto dealerships, integrated with backend payment APIs.",
        "Built a client's promotional mobile app from scratch in Vue.js with a WebView architecture; it is now in production.",
      ],
    },
  ],

  education: [
    {
      school: "Visvesvaraya Technological University (VTU)",
      degree: "B.E. Computer Science and Engineering",
      period: "2023 · First Class (62%)",
    },
  ],

  skills: [
    { group: "Languages", items: ["Java", "Python", "C#", "JavaScript", "TypeScript", "SQL"] },
    { group: "Backend", items: ["Spring Boot", "Spring Security", "RESTful APIs", ".NET", "Authentication & Authorization", "Session Management"] },
    { group: "Databases", items: ["MySQL", "PostgreSQL"] },
    { group: "Frontend", items: ["React", "Redux", "Vue.js", "HTML5", "CSS3", "Tailwind CSS"] },
    { group: "Tools & practices", items: ["Git", "Docker", "NPM (package development)", "WebView2", "Agile/Scrum"] },
    { group: "Concepts", items: ["OOP", "SOLID Principles", "Data Structures & Algorithms", "System Integration"] },
    { group: "Currently learning", items: ["FastAPI", "Django", "Microservices", "AWS", "CI/CD (GitHub Actions)", "Kafka", "Redis"] },
  ],

  achievements: [
    "Java Full Stack Development – QSpiders",
    "SOLID Principles Every Developer Must Know – Scaler",
    "Python 3 Programming",
  ],
};

export const isTodo = (s: string) => s.startsWith("[");

/** Unfilled details show while developing and disappear from the published build. */
export const SHOW_TODO = process.env.NODE_ENV !== "production";
export const visible = (s: string) => SHOW_TODO || !isTodo(s);
export const shown = (items: string[]) => items.filter(visible);
/** Strips a "[Degree], " style prefix when that part hasn't been filled in. */
export const tidy = (s: string) => (SHOW_TODO ? s : s.replace(/\[[^\]]*\],?\s*/g, "").trim());

export const resumeHref = "/Ismail-Ihthisham-Resume.pdf";
