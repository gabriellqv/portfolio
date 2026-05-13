export const SITE = {
  name: "Gabriel Queiroz",
  title: "Desenvolvedor Full Stack",
  tagline:
    "Desenvolvedor Full Stack especializado em React, Next.js, Vue.js, NestJS e Laravel",
  description:
    "Desenvolvedor Full Stack — React, Next.js, NestJS, Laravel. Portfolio profissional com projetos em destaque.",
  location: "São Paulo, Brasil",
  email: "gabriellqv@gmail.com",
  githubUsername: "gabriellqv",
  linkedinUsername: "gabriellqv",
  cvFilename: "CV_Gabriel_Queiroz_Desenvolvedor_Full_Stack.pdf",
  siteUrl: "https://gabrielqueiroz.dev",
} as const;

export const SECTION_IDS = [
  "home",
  "about",
  "projects",
  "skills",
  "education",
  "contact",
] as const;

export const NAV_ITEMS: { id: (typeof SECTION_IDS)[number]; label: string }[] = [
  { id: "home", label: "Início" },
  { id: "about", label: "Sobre" },
  { id: "projects", label: "Projetos" },
  { id: "skills", label: "Habilidades" },
  { id: "education", label: "Educação" },
  { id: "contact", label: "Contato" },
];
