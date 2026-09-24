export type Lang = "pt" | "en";

export interface Dictionary {
  nav: {
    home: string;
    about: string;
    projects: string;
    skills: string;
    education: string;
    contact: string;
  };
  hero: {
    roleMuted: string;
    roleAccent: string;
    tagline: string;
    viewProjects: string;
    downloadCV: string;
  };
  about: {
    title: string;
    subtitle: string;
    eyebrow: string;
    headline: string;
    bioP1: string;
    bioP2: string;
    stats: Array<{
      value: string;
      label: string;
    }>;
    cards: Array<{
      id: string;
      title: string;
      description: string;
      skills: string[];
    }>;
  };
  projects: {
    title: string;
    subtitle: string;
    viewProject: string;
    repository: string;
  };
  skills: {
    title: string;
    subtitle: string;
    categoryTitles: Record<string, string>;
  };
  education: {
    title: string;
    subtitle: string;
    institution: string;
    degree: string;
    completed: string;
    description: string;
    universityLogoAlt: string;
    tags: string[];
  };
  contact: {
    title: string;
    subtitle: string;
    location: string;
    locationValue: string;
    locationDesc: string;
    findMe: string;
    sendMessage: string;
    sendMessageDesc: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    sent: string;
    subjectPrefix: string;
    bodyNameLabel: string;
    bodyEmailLabel: string;
  };
  footer: {
    rights: string;
    builtWith: string;
    sourceCode: string;
  };
  errors: {
    somethingWrong: string;
    unexpectedError: string;
    tryAgain: string;
    backHome: string;
    notFoundTitle: string;
    notFoundDesc: string;
    loading: string;
  };
  a11y: {
    skipToContent: string;
    toggleTheme: string;
    switchLangEn: string;
    switchLangPt: string;
    openMenu: string;
    closeMenu: string;
    backToTop: string;
  };
  socialLabels: Record<string, string>;
  site: {
    lang: string;
    htmlLang: string;
    keywords: string[];
    description: string;
    jobTitle: string;
  };
  projectItems: Record<
    string,
    {
      description: string;
      status: string;
    }
  >;
}
