export type Locale = "pt" | "en";

export type Translations = {
  hero: {
    greeting: string;
    role: string;
    description: string;
    viewProjects: string;
    downloadCv: string;
    scroll: string;
  };
  about: {
    title: string;
    subtitle: string;
    bio: string[];
    highlights: {
      frontend: string;
      backend: string;
      devops: string;
      quality: string;
    };
    experience: {
      title: string;
      period: string;
      role: string;
      items: string[];
    };
    education: {
      title: string;
      period: string;
      degree: string;
      institution: string;
    };
    languages: {
      title: string;
      items: { name: string; level: string }[];
    };
  };
  projects: {
    title: string;
    subtitle: string;
    items: {
      [slug: string]: { title: string; description: string };
    };
  };
  skills: {
    title: string;
    subtitle: string;
    categories: { [key: string]: string };
    levels: { [key: string]: string };
    tooltips: { [key: string]: string };
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
    };
  };
  footer: {
    social: string;
    copyright: string;
  };
  notFound: {
    label: string;
    title: string;
    subtitle: string;
    description: string;
    backHome: string;
  };
  nav: {
    about: string;
    projects: string;
    skills: string;
    contact: string;
  };
  a11y: {
    openMenu: string;
    closeMenu: string;
    backToTop: string;
    skipToContent: string;
  };
};

export const pt: Translations = {
  hero: {
    greeting: "Olá, meu nome é",
    role: "Desenvolvedor Full Stack",
    description: "Desenvolvedor Full Stack especializado em React, Next.js e TypeScript",
    viewProjects: "Ver projetos",
    downloadCv: "Baixar CV",
    scroll: "Scroll",
  },
  about: {
    title: "Sobre",
    subtitle: "Conheça um pouco mais sobre mim",
    bio: [
      "Sou Desenvolvedor Full Stack com foco na construção de aplicações web modernas, performáticas e bem estruturadas. Tenho experiência no desenvolvimento de interfaces com React e Next.js, além da criação de APIs seguras e escaláveis com Node.js, Express e NestJS, aplicando boas práticas de organização, segurança e autenticação JWT.",
      "Trabalho com modelagem de dados relacional utilizando PostgreSQL e Prisma ORM, e estruturação de projetos com arquitetura em camadas (Controller, Service, Repository), buscando código limpo, reutilizável e de fácil manutenção, com base em princípios como SOLID e Clean Code.",
      "Estou em constante evolução técnica, com foco em performance, qualidade de software e desenvolvimento de aplicações seguras. Utilizo Docker para containerização, GitHub Actions para CI/CD, e ferramentas de teste como Jest e Cypress para garantir a qualidade do código.",
      "Tenho experiência na criação de projetos completos, incluindo aplicações em tempo real com WebSockets, ecommerces e sistemas interativos, cobrindo desde o frontend até o backend.",
    ],
    highlights: {
      frontend: "Frontend",
      backend: "Backend",
      devops: "DevOps",
      quality: "Qualidade",
    },
    experience: {
      title: "Experiência",
      period: "2024 - Atual",
      role: "Desenvolvedor Full Stack Freelancer",
      items: [
        "Desenvolvimento de aplicações full stack com Next.js e Node.js, estruturando APIs REST com autenticação JWT",
        "Modelagem relacional com PostgreSQL e Prisma ORM, aplicando normalização e indexação para otimização de consultas",
        "Organização do backend em arquitetura em camadas (Controller, Service, Repository) para separação clara de responsabilidades",
        "Containerização de aplicações com Docker e automação de deploy via GitHub Actions (CI/CD)",
        "Melhoria de performance por meio de refatoração estrutural e otimização de queries SQL",
      ],
    },
    education: {
      title: "Educação",
      period: "Conclusão: 2024",
      degree: "Bacharelado em Ciência da Computação",
      institution: "UNINOVE",
    },
    languages: {
      title: "Idiomas",
      items: [
        { name: "Português", level: "Nativo" },
        { name: "Inglês", level: "Avançado" },
        { name: "Espanhol", level: "Iniciante" },
      ],
    },
  },
  projects: {
    title: "Projetos",
    subtitle: "Alguns dos meus trabalhos recentes",
    items: {
      "landing-page": {
        title: "Landing Page Profissional",
        description:
          "Landing page full-stack com SSR, formulário com validação Zod, rate limiting, security headers e design system customizado.",
      },
      portfolio: {
        title: "Portfólio Pessoal",
        description:
          "Portfólio responsivo com glassmorphism, starfield animado em Canvas, animações de scroll e design system com Tailwind CSS.",
      },
    },
  },
  skills: {
    title: "Habilidades",
    subtitle: "Tecnologias que utilizo no dia a dia",
    categories: {
      languages: "Linguagens de Programação",
      frontend: "Arquitetura Frontend e UI Engineering",
      backend: "Sistemas Backend, APIs e Testes",
      fundamentals: "Fundamentos de Engenharia",
      devops: "DevOps, Infraestrutura e Ferramentas",
      design: "Design, UX e Ferramentas de Produto",
    },
    levels: {
      advanced: "Avançado",
      proficient: "Proficiente",
      working: "Conhecimento Prático",
      familiar: "Familiar",
    },
    tooltips: {
      advanced:
        "Utilizado diariamente em produção. Confortável tomando decisões de arquitetura e design.",
      proficient:
        "Experiência sólida em projetos reais. Capaz de resolver problemas complexos de forma independente.",
      working:
        "Utilizado em projetos pessoais e profissionais com bom entendimento dos conceitos.",
      familiar: "Conhecimento básico e experiência inicial. Em constante aprendizado.",
    },
  },
  contact: {
    title: "Vamos trabalhar juntos?",
    subtitle:
      "Estou disponível para oportunidades de trabalho, freelance ou apenas para trocar uma ideia sobre tecnologia!",
    form: {
      name: "Nome",
      namePlaceholder: "Seu nome",
      email: "E-mail",
      emailPlaceholder: "seu@email.com",
      message: "Mensagem",
      messagePlaceholder: "Escreva sua mensagem...",
      submit: "Enviar Mensagem!",
      sending: "Enviando...",
      success: "Mensagem enviada com sucesso!",
      error: "Erro ao enviar. Tente novamente.",
    },
  },
  footer: {
    social: "Redes sociais",
    copyright: "Todos os direitos reservados.",
  },
  notFound: {
    label: "Erro 404",
    title: "404",
    subtitle: "Página não encontrada",
    description: "A página que você está procurando não existe ou foi movida.",
    backHome: ">_ voltar ao início",
  },
  nav: {
    about: "Sobre",
    projects: "Projetos",
    skills: "Habilidades",
    contact: "Contato",
  },
  a11y: {
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    backToTop: "Voltar ao topo",
    skipToContent: "Pular para o conteúdo",
  },
};

export const en: Translations = {
  hero: {
    greeting: "Hi, my name is",
    role: "Full Stack Developer",
    description: "Full Stack Developer specialized in React, Next.js and TypeScript",
    viewProjects: "View projects",
    downloadCv: "Download CV",
    scroll: "Scroll",
  },
  about: {
    title: "About",
    subtitle: "Get to know a little more about me",
    bio: [
      "I'm a Full Stack Developer focused on building modern, performant, and well-structured web applications. I have experience developing interfaces with React and Next.js, as well as creating secure and scalable APIs with Node.js, Express, and NestJS, applying best practices in organization, security, and JWT authentication.",
      "I work with relational data modeling using PostgreSQL and Prisma ORM, and project structuring with layered architecture (Controller, Service, Repository), pursuing clean, reusable, and maintainable code based on principles like SOLID and Clean Code.",
      "I'm constantly evolving technically, focusing on performance, software quality, and secure application development. I use Docker for containerization, GitHub Actions for CI/CD, and testing tools like Jest and Cypress to ensure code quality.",
      "I have experience building complete projects, including real-time applications with WebSockets, e-commerce platforms, and interactive systems, covering both frontend and backend.",
    ],
    highlights: {
      frontend: "Frontend",
      backend: "Backend",
      devops: "DevOps",
      quality: "Quality",
    },
    experience: {
      title: "Experience",
      period: "2024 - Present",
      role: "Full Stack Freelance Developer",
      items: [
        "Full stack application development with Next.js and Node.js, building REST APIs with JWT authentication",
        "Relational modeling with PostgreSQL and Prisma ORM, applying normalization and indexing for query optimization",
        "Backend organization with layered architecture (Controller, Service, Repository) for clear separation of concerns",
        "Application containerization with Docker and deploy automation via GitHub Actions (CI/CD)",
        "Performance improvement through structural refactoring and SQL query optimization",
      ],
    },
    education: {
      title: "Education",
      period: "Graduated: 2024",
      degree: "Bachelor's in Computer Science",
      institution: "UNINOVE",
    },
    languages: {
      title: "Languages",
      items: [
        { name: "Portuguese", level: "Native" },
        { name: "English", level: "Advanced" },
        { name: "Spanish", level: "Beginner" },
      ],
    },
  },
  projects: {
    title: "Projects",
    subtitle: "Some of my recent work",
    items: {
      "landing-page": {
        title: "Professional Landing Page",
        description:
          "Full-stack landing page with SSR, Zod-validated forms, rate limiting, security headers, and custom design system.",
      },
      portfolio: {
        title: "Personal Portfolio",
        description:
          "Responsive portfolio with glassmorphism, animated Canvas starfield, scroll animations, and Tailwind CSS design system.",
      },
    },
  },
  skills: {
    title: "Skills",
    subtitle: "Technologies I use on a daily basis",
    categories: {
      languages: "Programming Languages",
      frontend: "Frontend Architecture & UI Engineering",
      backend: "Backend Systems, APIs & Testing",
      fundamentals: "Engineering Fundamentals",
      devops: "DevOps, Infrastructure & Tools",
      design: "Design, UX & Product Tools",
    },
    levels: {
      advanced: "Advanced",
      proficient: "Proficient",
      working: "Working Knowledge",
      familiar: "Familiar",
    },
    tooltips: {
      advanced: "Used daily in production. Comfortable making architecture and design decisions.",
      proficient:
        "Solid experience in real projects. Able to solve complex problems independently.",
      working:
        "Used in personal and professional projects with good understanding of concepts.",
      familiar: "Basic knowledge and initial experience. Continuously learning.",
    },
  },
  contact: {
    title: "Let's work together?",
    subtitle:
      "I'm available for job opportunities, freelance work, or just to chat about technology!",
    form: {
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "your@email.com",
      message: "Message",
      messagePlaceholder: "Write your message...",
      submit: "Send Message!",
      sending: "Sending...",
      success: "Message sent successfully!",
      error: "Failed to send. Please try again.",
    },
  },
  footer: {
    social: "Social media",
    copyright: "All rights reserved.",
  },
  notFound: {
    label: "Error 404",
    title: "404",
    subtitle: "Page not found",
    description: "The page you're looking for doesn't exist or has been moved.",
    backHome: ">_ back to home",
  },
  nav: {
    about: "About",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact",
  },
  a11y: {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    backToTop: "Back to top",
    skipToContent: "Skip to content",
  },
};
