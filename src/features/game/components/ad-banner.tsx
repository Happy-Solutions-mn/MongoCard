"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AdsenseSlot } from "./adsense-slot";
import { AdSpaceFrame } from "./ad-space-label";

interface AdBannerProps {
  position?: "top" | "bottom";
  className?: string;
  slotId?: string;
}

const DEFAULT_SLOT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_BANNER_SLOT ?? "0000000000";

export function AdBanner({
  position = "bottom",
  className,
  slotId = DEFAULT_SLOT_ID,
}: AdBannerProps) {
  return (
    <motion.div
      initial={{ y: position === "bottom" ? 100 : -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
      className={cn(
        "fixed left-0 right-0 z-40",
        "bg-card/90 backdrop-blur-xl",
        "border-border/50 px-4 py-3",
        position === "top" ? "top-0 border-b" : "bottom-0 border-t",
        className,
      )}
      role="complementary"
      aria-label="Зар сурталчилгаа"
    >
      <AdSpaceFrame className="mx-auto w-full max-w-md">
        <AdsenseSlot slotId={slotId} className="min-h-14" />
      </AdSpaceFrame>
    </motion.div>
  );
}
