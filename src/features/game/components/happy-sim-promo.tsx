"use client";

import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const HAPPYSIM_URL = "https://esim.happysolutions.ltd/";

const FEATURES = [
  "100+ улс орны eSIM багц",
  "QPay-р шуурхай төлбөр",
  "Роаминг төлбөргүй интернэт",
] as const;

interface HappySimPromoProps {
  variant?: "banner" | "card";
  className?: string;
}

export function HappySimPromo({
  variant = "banner",
  className,
}: HappySimPromoProps) {
  if (variant === "banner") {
    return (
      <a
        href={HAPPYSIM_URL}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={cn(
          "group flex w-full items-center gap-3 rounded-2xl border border-primary/20",
          "bg-gradient-to-r from-primary/10 via-card to-accent/10 px-4 py-3",
          "shadow-sm transition-all hover:border-primary/40 hover:shadow-md",
          className,
        )}
        aria-label="HappySim — Дэлхийн eSIM, esim.happysolutions.ltd"
      >
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-xl"
          aria-hidden
        >
          🌍
        </span>
        <span className="min-w-0 flex-1 text-left">
          <span className="block text-sm font-bold text-foreground">
            HappySim
          </span>
          <span className="block truncate text-xs text-muted-foreground">
            100+ улсын eSIM — роаминггүй, QPay-р шуурхай
          </span>
        </span>
        <ExternalLink
          className="h-4 w-4 shrink-0 text-primary opacity-70 transition-opacity group-hover:opacity-100"
          aria-hidden
        />
      </a>
    );
  }

  return (
    <a
      href={HAPPYSIM_URL}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={cn(
        "group flex w-full max-w-sm flex-col rounded-3xl border border-primary/25 p-8",
        "bg-gradient-to-br from-primary/10 via-card to-accent/15 shadow-xl",
        "transition-all hover:border-primary/50 hover:shadow-2xl",
        className,
      )}
      aria-label="HappySim — Дэлхийн eSIM, esim.happysolutions.ltd"
    >
      <span className="mb-4 inline-flex w-fit items-center gap-1 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
        HappySolutions
      </span>

      <div className="mb-4 flex items-center gap-3">
        <span
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-3xl"
          aria-hidden
        >
          🌍
        </span>
        <div>
          <h3 className="text-xl font-bold text-foreground">HappySim</h3>
          <p className="text-sm text-muted-foreground">Дэлхийн eSIM</p>
        </div>
      </div>

      <p className="mb-4 text-center text-sm leading-relaxed text-muted-foreground">
        Аяллаа эхлэхээс өмнө eSIM-ээ авч, дэлхийн хаана ч холболттой бай.
      </p>

      <ul className="mb-6 space-y-2 text-left text-sm text-foreground/90">
        {FEATURES.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className="text-primary" aria-hidden>
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>

      <span
        className={cn(
          "inline-flex w-full items-center justify-center gap-2 rounded-2xl",
          "bg-primary px-4 py-3 text-sm font-bold text-primary-foreground",
          "shadow-lg shadow-primary/25 transition-transform group-hover:scale-[1.02]",
        )}
      >
        Одоо авах
        <ExternalLink className="h-4 w-4" aria-hidden />
      </span>
    </a>
  );
}
