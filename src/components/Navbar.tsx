import Link from "next/link";

const Navbar = () => {
  return (
    <header className="fixed top-6 z-50 w-full max-w-4xl px-4 left-1/2 -translate-x-1/2">
      <nav className="flex items-center justify-between px-8 py-4 rounded-full border border-border/40 bg-background/30 backdrop-blur-md">
        <Link href="/" className="text-sm font-semibold tracking-wide text-foreground">
          <span className="">Gabriellqv</span>
        </Link>

        <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
          <Link href="/" className="px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-foreground transition-all">
            Início
          </Link>
          <Link href="#about" className="px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-foreground transition-all">
            Sobre
          </Link>
          <Link href="#skills" className="px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-foreground transition-all">
            Habilidades
          </Link>
          <Link href="#projects" className="px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-foreground transition-all">
            Projetos
          </Link>
          <Link href="#education" className="px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-foreground transition-all">
            Educação
          </Link>
          <Link href="#contact" className="px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-foreground transition-all">
            Contato
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
