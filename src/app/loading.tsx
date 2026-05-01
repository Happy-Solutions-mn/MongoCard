import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-6"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4">
        <Spinner className="h-12 w-12 text-primary" />
        <p className="text-sm font-medium text-muted-foreground">
          Уншиж байна…
        </p>
      </div>
    </div>
  );
}
