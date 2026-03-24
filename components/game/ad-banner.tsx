"use client";

import { cn } from "@/lib/utils";

interface AdBannerProps {
  position?: "top" | "bottom";
  className?: string;
}

export function AdBanner({ position = "bottom", className }: AdBannerProps) {
  return (
    <div
      className={cn(
        "fixed left-0 right-0 z-50 flex items-center justify-center bg-card/95 backdrop-blur-sm border-border px-4 py-3",
        position === "top" ? "top-0 border-b" : "bottom-0 border-t",
        className
      )}
    >
      <div className="flex h-12 w-full max-w-md items-center justify-center rounded-lg border border-dashed border-muted-foreground/30 bg-muted/50">
        <span className="text-xs text-muted-foreground">
          Зар сурталчилгааны байршил
        </span>
      </div>
    </div>
  );
}
