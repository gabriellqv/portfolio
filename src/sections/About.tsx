export default function About() {
  return (
    <section id="about" className="w-full max-w-5xl mx-auto px-4 py-24">
      <div className="flex flex-col mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
          Sobre Mim
        </h2>
        <div className="w-20 h-1 bg-neutral-700 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {/* Bloco 1: Quem eu sou */}
        <div className="flex flex-col space-y-6 bg-card dark:bg-muted/15 border border-border/40 rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl dark:hover:bg-white/[0.04] transition-all">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-200">
            Quem eu sou
          </h3>
          <p className="text-neutral-700 dark:text-neutral-400 leading-relaxed">
            Sou um desenvolvedor Full Stack com foco em criar aplicações escaláveis e interfaces modernas. Minha jornada na tecnologia é impulsionada pela busca constante por excelência e resolução de problemas estruturais complexos.
          </p>
          <p className="text-neutral-700 dark:text-neutral-400 leading-relaxed">
            Sou apaixonado por transformar regras de negócio robustas em experiências fluídas para o usuário final (como no FlowERP, StockSnap e HydroTrack). Trabalho de ponta a ponta utilizando React, Next.js, Node.js e Laravel, sempre priorizando código limpo, arquitetura sólida (SOLID/Clean Code) e performance.
          </p>
        </div>

        {/* Bloco 2: Jornada Profissional */}
        <div className="flex flex-col space-y-6 bg-card dark:bg-muted/15 border border-border/40 rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl dark:hover:bg-white/[0.04] transition-all">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-200">
            Minha Jornada
          </h3>
          <p className="text-neutral-700 dark:text-neutral-400 leading-relaxed">
            Minha trajetória é marcada por uma fundação sólida de disciplina e resiliência, construída durante meu período de serviço militar. Essa experiência singular me ensinou habilidades cruciais: adaptabilidade sob pressão, pensamento analítico e trabalho em equipe estruturado.
          </p>
          <p className="text-neutral-700 dark:text-neutral-400 leading-relaxed">
            Hoje, como engenheiro de software, trago essa mesma maturidade e foco pragmático para o ecossistema de desenvolvimento. Aplico essa visão sistêmica desde a concepção e planejamento da arquitetura até o *deploy* e a manutenção de aplicações de alto impacto.
          </p>
        </div>
      </div>
    </section>
  );
}
