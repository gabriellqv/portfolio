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
    viewProjects: string;
    downloadCV: string;
  };
  about: {
    title: string;
    whoIAm: string;
    whoIAmP1: string;
    whoIAmP2: string;
    myJourney: string;
    myJourneyP1: string;
    myJourneyP2Start: string;
    myJourneyP2End: string;
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
  };
  education: {
    title: string;
    subtitle: string;
    institution: string;
    degree: string;
    completed: string;
    description: string;
    tags: string[];
  };
  contact: {
    title: string;
    subtitle: string;
    location: string;
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
    openMenu: string;
    closeMenu: string;
    backToTop: string;
  };
  seo: {
    keywords: string[];
    locale: string;
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
