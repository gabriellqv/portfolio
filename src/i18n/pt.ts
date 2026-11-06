import type { Dictionary } from "./types";

const pt: Dictionary = {
  nav: {
    home: "Início",
    about: "Sobre",
    projects: "Projetos",
    skills: "Habilidades",
    education: "Educação",
    contact: "Contato",
  },
  hero: {
    roleMuted: "Desenvolvedor ",
    roleAccent: "Full Stack",
    tagline:
      "Foco em TypeScript, Node.js e PHP. Experiência prática em APIs REST (NestJS, Express, Laravel) e interfaces web (Next.js, React, Vue.js, Angular)",
    viewProjects: "Ver Projetos",
    downloadCV: "Baixar CV",
  },
  about: {
    title: "Sobre Mim",
    subtitle:
      "Formação sólida em Ciência da Computação aplicada ao desenvolvimento web de ponta a ponta.",
    eyebrow: "ALÉM DO CÓDIGO",
    headline: "Fluxos complexos mais claros, eficientes e escaláveis.",
    bioP1:
      "Minha formação em Ciência da Computação (UNINOVE) moldou a forma como enxergo software: não apenas como interfaces ou código isolado, mas como sistemas integrados capazes de traduzir processos complexos de negócio em ferramentas intuitivas, seguras e eficientes.",
    bioP2:
      "Atuo de ponta a ponta com foco no ecossistema TypeScript, Node.js (NestJS, Express), PHP (Laravel) e interfaces modernas (Next.js, React, Vue.js, Angular). Trabalho onde arquitetura técnica rigorosa (SOLID, Clean Code, transações ACID com lock pessimista) e experiência do usuário precisam coexistir em perfeita sintonia.",
    stats: [
      { value: "4", label: "Aplicações Full Stack no Ar" },
      { value: "116+", label: "Testes em Regras Críticas" },
      { value: "5", label: "Anos de Base em Computação" },
    ],
    cards: [
      {
        id: "frontend",
        title: "Engenharia Frontend",
        description:
          "Desenvolvimento de aplicações web modernas, responsivas e de alta performance. Foco em arquitetura baseada em componentes, renderização híbrida (SSR/SSG), design systems escaláveis e gestão de estado previsível.",
        skills: [
          "React & Next.js (App Router)",
          "TypeScript & Tipagem Estrita",
          "Vue.js & Angular",
          "Tailwind CSS & Design Systems",
          "Zustand, Pinia & Zod",
        ],
      },
      {
        id: "backend",
        title: "Engenharia Backend",
        description:
          "Construção de APIs REST modulares, seguras e de alta disponibilidade. Domínio de Service Layer, controle de acesso RBAC, autenticação JWT/Sanctum, transações ACID com lock pessimista e cache distribuído.",
        skills: [
          "Node.js, NestJS & Express",
          "Laravel & Service Layer",
          "PostgreSQL, MySQL & Redis",
          "Prisma ORM & Eloquent ORM",
          "Transações ACID & Locks Pessimistas",
        ],
      },
      {
        id: "devops",
        title: "Qualidade & DevOps",
        description:
          "Práticas rigorosas de engenharia de software e confiabilidade de sistemas. Criação de suítes de testes automatizados para regras críticas, conteinerização de ambientes e automação de deploys contínuos.",
        skills: [
          "Testes (Jest, Vitest, Pest, Playwright)",
          "Docker & Docker Compose",
          "CI/CD com GitHub Actions",
          "Princípios SOLID & Clean Architecture",
          "Documentação Swagger & OpenAPI",
        ],
      },
    ],
  },
  projects: {
    title: "Projetos em Destaque",
    subtitle:
      "Uma seleção das minhas aplicações mais completas. Foco em arquitetura escalável, código limpo e resolução de problemas complexos de negócios.",
    viewProject: "Ver Projeto",
    repository: "Repositório",
    professionalTitle: "Projetos Profissionais & Clientes",
    professionalSubtitle:
      "Aplicações em produção, arquitetura comercial e soluções desenvolvidas para empresas e clientes.",
    personalTitle: "Projetos Pessoais & Open Source",
    personalSubtitle:
      "Aplicações autorais, experimentação técnica e projetos de código aberto.",
    landingPagesTitle: "Sites & Landing Pages",
    landingPagesSubtitle:
      "Sites institucionais e landing pages publicados para negócios locais e profissionais liberais.",
    badgeProfessional: "Freelance / Cliente",
    badgePersonal: "Projeto Pessoal",
    badgeClientSite: "Site publicado",
    badgeTemplateSite: "Template publicado",
    privateRepoNotice: "Código privado do cliente",
  },
  skills: {
    title: "Habilidades Técnicas",
    subtitle:
      "Especializado em desenvolvimento moderno de software, utilizo as melhores tecnologias do mercado para construir sistemas escaláveis, seguros e de alta performance.",
    categoryTitles: {
      "Linguagens Core": "Linguagens Core",
      Frontend: "Frontend",
      Backend: "Backend",
      "Banco de Dados": "Banco de Dados",
      Ferramentas: "Ferramentas",
    },
  },
  education: {
    title: "Formação Acadêmica",
    subtitle:
      "Base teórica sólida aliada ao pragmatismo da engenharia de software para construir soluções que resolvem problemas reais.",
    institution: "Universidade Nove de Julho",
    degree: "Graduação | Ciência da Computação",
    completed: "Concluído",
    description:
      "Formação abrangente com foco profundo em engenharia de software, algoritmos, estrutura de dados, redes e banco de dados. Base científica e matemática que provê o raciocínio analítico necessário para desenhar arquiteturas de sistemas distribuídos e criar soluções escaláveis.",
    universityLogoAlt: "UNINOVE Logo",
    tags: [
      "HTML",
      "CSS",
      "JavaScript",
      "Python",
      "Java",
      "C/C++",
      "Banco de Dados",
      "Engenharia de Software",
      "Estrutura de Dados",
      "Algoritmos",
      "Redes",
      "Arquitetura de Sistemas",
    ],
  },
  contact: {
    title: "Contato",
    subtitle:
      "Interessado em trabalhar junto ou tem uma proposta? Fique à vontade para entrar em contato, estou sempre aberto a novas oportunidades e conversas.",
    location: "Localização",
    locationValue: "São Paulo, Brasil",
    locationDesc: "Disponível para trabalho remoto e oportunidades internacionais.",
    findMe: "Onde me encontrar",
    sendMessage: "Envie uma mensagem",
    sendMessageDesc:
      "Preencha o formulário abaixo e seu cliente de e-mail será aberto com a mensagem pronta.",
    name: "Nome",
    namePlaceholder: "Seu nome",
    email: "E-mail",
    emailPlaceholder: "seu@email.com",
    message: "Mensagem",
    messagePlaceholder: "Descreva seu projeto ou proposta...",
    send: "Enviar Mensagem",
    sending: "Enviando...",
    sent: "Mensagem Pronta!",
    subjectPrefix: "Contato via Portfolio - ",
    bodyNameLabel: "Nome: ",
    bodyEmailLabel: "E-mail: ",
    errors: {
      nameRequired: "Preencha este campo.",
      emailRequired: "Preencha este campo.",
      emailInvalid: "Insira um endereço de e-mail válido.",
      messageRequired: "Preencha este campo.",
    },
  },
  footer: {
    rights: "Todos os direitos reservados.",
    builtWith: "BUILD WITH INTENTIONALITY",
    sourceCode: "SOURCE CODE",
  },
  errors: {
    somethingWrong: "Algo deu errado",
    unexpectedError:
      "Ocorreu um erro inesperado. Tente novamente ou volte para a página inicial.",
    tryAgain: "Tentar novamente",
    backHome: "Voltar ao início",
    notFoundTitle: "Página não encontrada",
    notFoundDesc: "A página que você está procurando não existe ou foi movida.",
    loading: "Carregando...",
  },
  a11y: {
    skipToContent: "Pular para o conteúdo",
    toggleTheme: "Alternar tema",
    switchLangEn: "Switch to English",
    switchLangPt: "Mudar para Português",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    backToTop: "Voltar ao topo",
  },
  socialLabels: {
    "E-mail": "E-mail",
  },
  site: {
    lang: "pt",
    htmlLang: "pt-BR",
    keywords: [
      "desenvolvedor full stack",
      "react",
      "next.js",
      "nestjs",
      "laravel",
      "portfolio",
      "gabriel queiroz",
    ],
    description:
      "Desenvolvedor Full Stack — React, Next.js, NestJS, Laravel. Portfolio profissional com projetos em destaque.",
    jobTitle: "Desenvolvedor Full Stack",
  },
  projectItems: {
    "Rafael Nutre": {
      subtitle: "Nutrição Clínica & Esportiva • Landing Page de Alta Conversão",
      description:
        "Landing page de alta conversão desenvolvida sob demanda para nutricionista esportivo e clínico. Arquitetura moderna com Astro e TailwindCSS, otimização técnica avançada de SEO com JSON-LD/Schema, suíte de testes automatizados com Vitest e deploy de borda com alta disponibilidade na Cloudflare Pages.",
      status: "Em Produção",
      highlights: [
        "Arquitetura ultra-rápida com Astro e TailwindCSS",
        "SEO técnico avançado com JSON-LD e schemas estruturados",
        "Suíte de testes automatizados com Vitest (47 testes)",
        "Deploy global de borda na Cloudflare Pages",
      ],
    },
    FlowERP: {
      subtitle: "Sistema de Gestão Empresarial & Analytics",
      description:
        "Sistema de Gestão Empresarial (ERP) completo para controle de vendas, clientes e produtos. Interface altamente interativa com painéis administrativos e relatórios gerenciais dinâmicos. Arquitetura com forte foco em testes automatizados e regras de negócio sólidas.",
      status: "Em Produção",
      highlights: [
        "Gestão completa de vendas, clientes, pedidos e produtos",
        "Painéis analíticos dinâmicos e relatórios gerenciais",
        "Backend em Laravel com Service Layer e regras ACID",
        "Frontend reativo em Vue 3, Pinia e TailwindCSS",
      ],
    },
    StockSnap: {
      subtitle: "Inventário & Supply Chain em Tempo Real",
      description:
        "Plataforma de gerenciamento de estoque em tempo real. Desenvolvida utilizando os princípios SOLID, focando em uma comunicação RESTful otimizada, autenticação segura via JWT e forte controle de permissões (RBAC).",
      status: "Versão 2.0",
      highlights: [
        "Controle de inventário e movimentações em tempo real",
        "Autenticação segura via JWT com RBAC granular",
        "API RESTful modular em NestJS com arquitetura SOLID",
        "Modelagem relacional com Prisma ORM e PostgreSQL",
      ],
    },
    HydroTrack: {
      subtitle: "Telemetria & Monitoramento Hídrico Geoespacial",
      description:
        "Aplicação voltada para a gestão de recursos hídricos. Combina a reatividade do Vue.js com Leaflet para monitoramento geolocalizado, apoiada por um ecossistema de alta performance.",
      status: "Concluído",
      highlights: [
        "Monitoramento geolocalizado de sensores com Leaflet",
        "Acompanhamento em tempo real de reservatórios e vazão",
        "Frontend modular em Vue 3 com estado global via Pinia",
        "Arquitetura backend de alta performance em Laravel",
      ],
    },
  },
  siteItems: {
    "Ana Paula Praes": {
      niche: "Salão de beleza e noivas",
      description:
        "Site editorial com galeria de trabalhos, seção de noivas, avaliações reais do Google e agendamento direto pelo WhatsApp.",
    },
    "Dr. Gustavo Andrade": {
      niche: "Advocacia criminal",
      description:
        "Site one-page com áreas de atuação, processo de atendimento, dúvidas frequentes e contato direto pelo WhatsApp.",
    },
    "Dane Maia": {
      niche: "Psicóloga",
      description:
        "Landing page acolhedora com abordagem, atendimento presencial e online, provas de confiança e contato qualificado.",
    },
    "Vértice Arquitetura": {
      niche: "Arquitetura e interiores",
      description:
        "Template editorial com portfólio de projetos, processo de trabalho e chamada direta para novos clientes.",
    },
  },
};

export default pt;
