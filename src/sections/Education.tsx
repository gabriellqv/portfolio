import Image from "next/image";

import SectionHeader from "@/components/SectionHeader";

/**
 * Education section with a vertical timeline layout.
 * Uses an absolute-positioned line and dot on the left edge to create
 * a timeline visual, with the date range on the left and the degree
 * card on the right at larger breakpoints.
 */
export default function Education() {
  return (
    <section id="education" className="section-wrapper">
      <SectionHeader
        title="Formação Acadêmica"
        subtitle="Base teórica sólida aliada ao pragmatismo da engenharia de software para construir soluções que resolvem problemas reais."
      />

      <div className="relative pl-8 md:pl-12">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-black/20 dark:bg-border/40" />
        <div className="absolute -left-[4.5px] top-10 w-2.5 h-2.5 rounded-full border border-neutral-800 dark:border-neutral-500 bg-background" />

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <div className="md:w-1/4 pt-8">
            <h3 className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.1]">
              2018 -<br />
              2023
            </h3>
          </div>

          <div className="md:w-3/4">
            <div className="flex flex-col p-8 card-base">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                <div className="flex gap-4 items-center">
                  <div className="p-3 bg-background rounded-xl border border-border/50 shrink-0 flex items-center justify-center w-20 h-20">
                    <Image
                      src="/uninove.webp"
                      alt="UNINOVE Logo"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-foreground leading-tight mb-1">
                      Universidade Nove de Julho
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium">
                      Graduação | Ciência da Computação
                    </p>
                  </div>
                </div>

                <div className="shrink-0 px-3 py-1 rounded-full border border-border/30 bg-white dark:bg-muted/20 text-xs font-semibold text-foreground tracking-wider uppercase">
                  Concluído
                </div>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Formação abrangente com foco profundo em engenharia de software,
                algoritmos, estrutura de dados, redes e banco de dados. Base científica e
                matemática que provê o raciocínio analítico necessário para desenhar
                arquiteturas de sistemas distribuídos e criar soluções escaláveis.
              </p>

              <div className="flex flex-wrap gap-2.5">
                {[
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
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full border border-border/20 bg-white dark:bg-muted/10 text-xs font-medium text-muted-foreground hover:bg-neutral-50 dark:hover:bg-muted/20 transition-colors"
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
