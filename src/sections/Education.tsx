import SectionHeader from "@/components/SectionHeader";

export default function Education() {
  return (
    <section id="education" className="section-wrapper">
      <SectionHeader
        title="Formação Acadêmica"
        subtitle="Base teórica sólida aliada ao pragmatismo da engenharia de software para construir soluções que resolvem problemas reais."
      />

      <div className="relative pl-8 md:pl-12">
        {/* Linha do tempo na extremidade esquerda */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-black/20 dark:bg-border/40"></div>
        {/* Nó da linha do tempo */}
        <div className="absolute -left-[4.5px] top-10 w-2.5 h-2.5 rounded-full border border-neutral-800 dark:border-neutral-500 bg-background"></div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Lado Esquerdo: Datas */}
          <div className="md:w-1/4 pt-8">
            <h3 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white tracking-tight leading-[1.1]">
              2018 -<br />
              2023
            </h3>
          </div>

          {/* Lado Direito: Cartão */}
          <div className="md:w-3/4">
            <div className="flex flex-col p-8 card-base">
              
              {/* Header do Cartão */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                <div className="flex gap-4 items-center">
                  {/* Logo */}
                  <div className="p-3 bg-background rounded-xl border border-border/50 shrink-0 flex items-center justify-center w-20 h-20">
                    <img 
                      src="/uninove.webp" 
                      alt="UNINOVE Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {/* Título & Subtítulo */}
                  <div className="flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight mb-1">
                      Universidade Nove de Julho
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                      Graduação | Ciência da Computação
                    </p>
                  </div>
                </div>
                
                {/* Badge */}
                <div className="shrink-0 px-3 py-1 rounded-full border border-border/30 bg-white dark:bg-muted/20 text-xs font-semibold text-neutral-800 dark:text-neutral-300 tracking-wider uppercase">
                  Concluído
                </div>
              </div>

              {/* Descrição */}
              <p className="text-neutral-700 dark:text-neutral-400 text-sm leading-relaxed mb-6">
                Formação abrangente com foco profundo em engenharia de software, algoritmos, estrutura de dados, redes e banco de dados. Base científica e matemática que provê o raciocínio analítico necessário para desenhar arquiteturas de sistemas distribuídos e criar soluções escaláveis.
              </p>

              {/* Tags (Pílulas) */}
              <div className="flex flex-wrap gap-2.5">
                {[
                  'HTML',
                  'CSS',
                  'JavaScript',
                  'Python',
                  'Java',
                  'C/C++',
                  'Banco de Dados', 
                  'Engenharia de Software', 
                  'Estrutura de Dados', 
                  'Algoritmos', 
                  'Redes', 
                  'Arquitetura de Sistemas'
                ].map((tag) => (
                  <span 
                    key={tag} 
                    className="px-4 py-1.5 rounded-full border border-border/20 bg-white dark:bg-muted/10 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-muted/20 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
