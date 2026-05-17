import Link from "next/link";
import { ChevronRight, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdvertiseCtaProps {
  className?: string;
}

export function AdvertiseCta({ className }: AdvertiseCtaProps) {
  return (
    <Link
      href="/advertise"
      className={cn(
        "group flex items-center gap-3 rounded-2xl border border-dashed border-muted-foreground/25",
        "bg-secondary/30 px-4 py-3 transition-colors hover:border-primary/30 hover:bg-secondary/50",
        className,
      )}
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
        aria-hidden
      >
        <Megaphone className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="block text-sm font-semibold text-foreground">
          Зар байршуулах уу?
        </span>
        <span className="block text-xs text-muted-foreground">
          Брэнд, үйлчилгээээ МонгоКарт дээр сурталчлах
        </span>
      </span>
      <ChevronRight
        className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
        aria-hidden
      />
    </Link>
  );
}
