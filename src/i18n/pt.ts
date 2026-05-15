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
      "Desenvolvedor Full Stack especializado em React, Next.js, Vue.js, NestJS e Laravel",
    viewProjects: "Ver Projetos",
    downloadCV: "Baixar CV",
  },
  about: {
    title: "Sobre Mim",
    whoIAm: "Quem eu sou",
    whoIAmP1:
      "Sou um desenvolvedor Full Stack com foco em criar aplicações escaláveis e interfaces modernas. Minha jornada na tecnologia é impulsionada pela busca constante por excelência e resolução de problemas estruturais complexos.",
    whoIAmP2:
      "Sou apaixonado por transformar regras de negócio robustas em experiências fluídas para o usuário final (como no FlowERP, StockSnap e HydroTrack). Trabalho de ponta a ponta utilizando React, Next.js, Node.js e Laravel, sempre priorizando código limpo, arquitetura sólida (SOLID/Clean Code) e performance.",
    myJourney: "Minha Jornada",
    myJourneyP1:
      "Minha trajetória é marcada por uma fundação sólida de disciplina e resiliência, construída durante meu período de serviço militar. Essa experiência singular me ensinou habilidades cruciais: adaptabilidade sob pressão, pensamento analítico e trabalho em equipe estruturado.",
    myJourneyP2Start:
      "Hoje, como engenheiro de software, trago essa mesma maturidade e foco pragmático para o ecossistema de desenvolvimento. Aplico essa visão sistêmica desde a concepção e planejamento da arquitetura até o ",
    myJourneyP2End: " e a manutenção de aplicações de alto impacto.",
  },
  projects: {
    title: "Projetos em Destaque",
    subtitle:
      "Uma seleção das minhas aplicações mais completas. Foco em arquitetura escalável, código limpo e resolução de problemas complexos de negócios.",
    viewProject: "Ver Projeto",
    repository: "Repositório",
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
  },
  footer: {
    rights: "Todos os direitos reservados.",
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
    HydroTrack: {
      description:
        "Aplicação voltada para a gestão de recursos hídricos. Combina a reatividade do Vue.js com Leaflet para monitoramento geolocalizado, apoiada por um ecossistema de alta performance.",
      status: "Concluído",
    },
    FlowERP: {
      description:
        "Sistema de Gestão Empresarial (ERP) completo para controle de vendas, clientes e produtos. Interface altamente interativa com painéis administrativos e relatórios gerenciais dinâmicos. Arquitetura com forte foco em testes automatizados e regras de negócio sólidas.",
      status: "Em Produção",
    },
    StockSnap: {
      description:
        "Plataforma de gerenciamento de estoque em tempo real. Desenvolvida utilizando os princípios SOLID, focando em uma comunicação RESTful otimizada, autenticação segura via JWT e forte controle de permissões (RBAC).",
      status: "Versão 2.0",
    },
  },
};

export default pt;
