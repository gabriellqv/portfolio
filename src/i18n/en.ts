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
      "Full Stack Developer specialized in React, Next.js, Vue.js, NestJS, and Laravel",
    viewProjects: "View Projects",
    downloadCV: "Download CV",
  },
  about: {
    title: "About Me",
    whoIAm: "Who I am",
    whoIAmP1:
      "I'm a Full Stack Developer focused on building scalable applications and modern interfaces. My journey in technology is driven by a constant pursuit of excellence and solving complex structural problems.",
    whoIAmP2:
      "I'm passionate about transforming robust business rules into fluid end-user experiences (as seen in FlowERP, StockSnap, and HydroTrack). I work end-to-end using React, Next.js, Node.js, and Laravel, always prioritizing clean code, solid architecture (SOLID/Clean Code), and performance.",
    myJourney: "My Journey",
    myJourneyP1:
      "My path is marked by a solid foundation of discipline and resilience, built during my time in military service. This unique experience taught me crucial skills: adaptability under pressure, analytical thinking, and structured teamwork.",
    myJourneyP2Start:
      "Today, as a software engineer, I bring that same maturity and pragmatic focus to the development ecosystem. I apply this systemic vision from conception and architecture planning through to ",
    myJourneyP2End: " and maintenance of high-impact applications.",
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
  },
  footer: {
    rights: "All rights reserved.",
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
