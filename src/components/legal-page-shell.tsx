import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LegalPageShellProps {
  title: string;
  updatedAt?: string;
  children: React.ReactNode;
}

export function LegalPageShell({
  title,
  updatedAt,
  children,
}: LegalPageShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl px-4 pb-20 pt-6 sm:px-6">
        <header className="mb-6 flex items-center gap-3">
          <Button asChild variant="ghost" size="icon" className="rounded-full">
            <Link href="/" aria-label="Нүүр">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              {title}
            </h1>
            {updatedAt ? (
              <p className="mt-1 text-xs text-muted-foreground">
                Сүүлд шинэчилсэн: {updatedAt}
              </p>
            ) : null}
          </div>
        </header>

        <article className="prose-invert space-y-5 text-sm leading-relaxed text-foreground/90 sm:text-base">
          {children}
        </article>

        <footer className="mt-10 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} МонгоКарт ·{" "}
          <Link href="/about" className="hover:text-foreground">
            Бидний тухай
          </Link>
          <span className="mx-2">•</span>
          <Link href="/privacy" className="hover:text-foreground">
            Нууцлал
          </Link>
          <span className="mx-2">•</span>
          <Link href="/terms" className="hover:text-foreground">
            Үйлчилгээний нөхцөл
          </Link>
        </footer>
      </div>
    </main>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-bold tracking-tight md:text-xl">{title}</h2>
      <div className="space-y-2 text-muted-foreground">{children}</div>
    </section>
  );
}
