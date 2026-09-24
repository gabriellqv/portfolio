import type { Dictionary } from "./types";

const en: Dictionary = {
  nav: {
    home: "Home",
    about: "About",
    projects: "Projects",
    skills: "Skills",
    education: "Education",
    contact: "Contact",
  },
  hero: {
    roleMuted: "",
    roleAccent: "Full Stack Developer",
    tagline:
      "Focused on TypeScript, Node.js, and PHP. Hands-on experience building REST APIs (NestJS, Express, Laravel) and web interfaces (Next.js, React, Vue.js, Angular)",
    viewProjects: "View Projects",
    downloadCV: "Download CV",
  },
  about: {
    title: "About Me",
    subtitle:
      "Solid background in Computer Science applied to end-to-end web development.",
    eyebrow: "BEYOND THE CODE",
    headline: "Making complex workflows clearer, efficient, and scalable.",
    bioP1:
      "My degree in Computer Science (UNINOVE) has shaped the way I view software: not merely as isolated code or UI screens, but as integrated systems that turn complex business processes into intuitive, secure, and efficient tools.",
    bioP2:
      "I work end-to-end focusing on the TypeScript, Node.js (NestJS, Express), PHP (Laravel), and modern web interfaces (Next.js, React, Vue.js, Angular) ecosystem — where rigorous technical architecture (SOLID, Clean Code, ACID transactions with pessimistic locking) and user experience must operate in perfect harmony.",
    stats: [
      { value: "5", label: "Full Stack Systems" },
      { value: "3", label: "Production Deploys" },
      { value: "178+", label: "Automated Tests" },
    ],
    cards: [
      {
        id: "frontend",
        title: "Frontend Engineering",
        description:
          "Development of modern, responsive, and high-performance web applications. Focused on component-based architecture, hybrid rendering (SSR/SSG), scalable design systems, and predictable state management.",
        skills: [
          "React & Next.js (App Router)",
          "TypeScript & Strict Typing",
          "Vue.js & Angular",
          "Tailwind CSS & Design Systems",
          "Zustand, Pinia & Zod",
        ],
      },
      {
        id: "backend",
        title: "Backend Engineering",
        description:
          "Building modular, secure, and high-availability REST APIs. Expertise in Service Layer, RBAC access control, JWT/Sanctum auth, ACID transactions with pessimistic locking, and distributed caching.",
        skills: [
          "Node.js, NestJS & Express",
          "Laravel & Service Layer",
          "PostgreSQL, MySQL & Redis",
          "Prisma ORM & Eloquent ORM",
          "ACID Transactions & Pessimistic Locks",
        ],
      },
      {
        id: "devops",
        title: "Quality & DevOps",
        description:
          "Rigorous software engineering practices and system reliability. Automated test suites covering critical business logic, environment containerization, and continuous deployment automation.",
        skills: [
          "Testing (Jest, Vitest, Pest, Playwright)",
          "Docker & Docker Compose",
          "CI/CD with GitHub Actions",
          "SOLID Principles & Clean Architecture",
          "Swagger & OpenAPI Documentation",
        ],
      },
    ],
  },
  projects: {
    title: "Featured Projects",
    subtitle:
      "A selection of my most complete applications. Focus on scalable architecture, clean code, and solving complex business problems.",
    viewProject: "View Project",
    repository: "Repository",
  },
  skills: {
    title: "Technical Skills",
    subtitle:
      "Specialized in modern software development, using the best market technologies to build scalable, secure, and high-performance systems.",
    categoryTitles: {
      "Linguagens Core": "Core Languages",
      Frontend: "Frontend",
      Backend: "Backend",
      "Banco de Dados": "Databases",
      Ferramentas: "Tools",
    },
  },
  education: {
    title: "Education",
    subtitle:
      "A solid theoretical foundation combined with software engineering pragmatism to build solutions that solve real problems.",
    institution: "Universidade Nove de Julho",
    degree: "Bachelor's | Computer Science",
    completed: "Completed",
    description:
      "Comprehensive education with deep focus on software engineering, algorithms, data structures, networking, and databases. A scientific and mathematical foundation that provides the analytical reasoning needed to design distributed system architectures and create scalable solutions.",
    universityLogoAlt: "UNINOVE Logo",
    tags: [
      "HTML",
      "CSS",
      "JavaScript",
      "Python",
      "Java",
      "C/C++",
      "Databases",
      "Software Engineering",
      "Data Structures",
      "Algorithms",
      "Networking",
      "Systems Architecture",
    ],
  },
  contact: {
    title: "Contact",
    subtitle:
      "Interested in working together or have a proposal? Feel free to reach out, I'm always open to new opportunities and conversations.",
    location: "Location",
    locationValue: "São Paulo, Brazil",
    locationDesc: "Available for remote work and international opportunities.",
    findMe: "Where to find me",
    sendMessage: "Send a message",
    sendMessageDesc:
      "Fill out the form below and your email client will open with the message ready.",
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "your@email.com",
    message: "Message",
    messagePlaceholder: "Describe your project or proposal...",
    send: "Send Message",
    sending: "Sending...",
    sent: "Message Ready!",
    subjectPrefix: "Contact via Portfolio - ",
    bodyNameLabel: "Name: ",
    bodyEmailLabel: "Email: ",
    errors: {
      nameRequired: "Please fill out this field.",
      emailRequired: "Please fill out this field.",
      emailInvalid: "Please enter a valid email address.",
      messageRequired: "Please fill out this field.",
    },
  },
  footer: {
    rights: "All rights reserved.",
    builtWith: "BUILD WITH INTENTIONALITY",
    sourceCode: "SOURCE CODE",
  },
  errors: {
    somethingWrong: "Something went wrong",
    unexpectedError:
      "An unexpected error occurred. Try again or go back to the home page.",
    tryAgain: "Try again",
    backHome: "Back to home",
    notFoundTitle: "Page not found",
    notFoundDesc: "The page you are looking for does not exist or has been moved.",
    loading: "Loading...",
  },
  a11y: {
    skipToContent: "Skip to content",
    toggleTheme: "Toggle theme",
    switchLangEn: "Switch to English",
    switchLangPt: "Mudar para Português",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    backToTop: "Back to top",
  },
  socialLabels: {
    "E-mail": "Email",
  },
  site: {
    lang: "en",
    htmlLang: "en",
    keywords: [
      "full stack developer",
      "react",
      "next.js",
      "nestjs",
      "laravel",
      "portfolio",
      "gabriel queiroz",
    ],
    description:
      "Full Stack Developer — React, Next.js, NestJS, Laravel. Professional portfolio with featured projects.",
    jobTitle: "Full Stack Developer",
  },
  projectItems: {
    HydroTrack: {
      description:
        "Application focused on water resource management. Combines Vue.js reactivity with Leaflet for geolocated monitoring, supported by a high-performance ecosystem.",
      status: "Completed",
    },
    FlowERP: {
      description:
        "Complete Enterprise Resource Planning (ERP) system for managing sales, customers, and products. Highly interactive interface with admin dashboards and dynamic management reports. Architecture with strong focus on automated testing and solid business rules.",
      status: "In Production",
    },
    StockSnap: {
      description:
        "Real-time inventory management platform. Built using SOLID principles, focusing on optimized RESTful communication, secure JWT authentication, and strong permission control (RBAC).",
      status: "Version 2.0",
    },
  },
};

export default en;
