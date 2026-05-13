import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6 text-center px-4">
        <h1 className="text-7xl font-extrabold text-foreground">404</h1>
        <h2 className="text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="text-sm text-muted-foreground max-w-md">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link
          href="/"
          className="px-6 py-2.5 rounded-full bg-foreground text-background font-semibold text-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
