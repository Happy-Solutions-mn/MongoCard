"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AdBannerProps {
  position?: "top" | "bottom";
  className?: string;
}

export function AdBanner({ position = "bottom", className }: AdBannerProps) {
  return (
    <motion.div
      initial={{ y: position === "bottom" ? 100 : -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
      className={cn(
        "fixed left-0 right-0 z-50",
        "bg-card/90 backdrop-blur-xl",
        "border-border/50 px-4 py-3",
        position === "top" ? "top-0 border-b" : "bottom-0 border-t",
        className
      )}
    >
      <div className="mx-auto flex h-14 w-full max-w-md items-center justify-center rounded-2xl border border-dashed border-muted-foreground/20 bg-secondary/30">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="text-lg">📢</span>
          <span className="text-xs font-medium">Зар сурталчилгааны байршил</span>
        </div>
      </div>
    </motion.div>
  );
}
