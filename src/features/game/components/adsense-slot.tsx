"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AdsenseSlotProps {
  slotId: string;
  className?: string;
  format?: string;
  responsive?: boolean;
  testMode?: boolean;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

/**
 * Жинхэнэ AdSense slot — `NEXT_PUBLIC_ADSENSE_CLIENT_ID` тохируулсан үед л идэвхждэг.
 * Эс бөгөөс placeholder UI харагдана (development mode-д бөглөмж).
 */
export function AdsenseSlot({
  slotId,
  className,
  format = "auto",
  responsive = true,
  testMode = false,
}: AdsenseSlotProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    if (!ADSENSE_CLIENT_ID || pushedRef.current) return;
    if (typeof window === "undefined") return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      pushedRef.current = true;
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("AdSense push failed", err);
      }
    }
  }, []);

  if (!ADSENSE_CLIENT_ID) {
    return (
      <div
        className={cn(
          "flex h-14 w-full items-center justify-center rounded-2xl border border-dashed border-muted-foreground/20 bg-secondary/30",
          className,
        )}
      >
        <div className="flex items-center gap-2 text-muted-foreground">
          <span aria-hidden className="text-lg">
            📢
          </span>
          <span className="text-xs font-medium">
            Зар сурталчилгааны байршил
          </span>
        </div>
      </div>
    );
  }

  return (
    <ins
      ref={adRef}
      className={cn("adsbygoogle block", className)}
      style={{ display: "block" }}
      data-ad-client={ADSENSE_CLIENT_ID}
      data-ad-slot={slotId}
      data-ad-format={format}
      data-full-width-responsive={responsive ? "true" : "false"}
      {...(testMode ? { "data-adtest": "on" } : {})}
    />
  );
}
