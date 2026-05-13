import Link from "next/link";

const Navbar = () => {
  return (
    <header className="fixed top-6 z-50 w-full max-w-2xl px-4 left-1/2 -translate-x-1/2">
      <nav className="flex items-center justify-between px-8 py-4 rounded-full border border-border/40 bg-background/30 backdrop-blur-md">
        <Link href="/" className="text-sm font-semibold tracking-wide text-foreground">
          <span className="">Gabriellqv</span>
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="#about" className="hover:text-foreground transition-colors">
            Sobre
          </Link>
          <Link href="#projects" className="hover:text-foreground transition-colors">
            Projetos
          </Link>
          <Link href="#contact" className="hover:text-foreground transition-colors">
            Contato
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
