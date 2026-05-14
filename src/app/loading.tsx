/**
 * Global loading fallback rendered during page transitions and initial
 * page generation. Displays a centered spinner with a text label.
 */
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="size-8 border-2 border-border border-t-accent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Carregando...</p>
      </div>
    </div>
  );
}
