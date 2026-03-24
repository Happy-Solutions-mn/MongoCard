"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InterstitialAdProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InterstitialAd({ isOpen, onClose }: InterstitialAdProps) {
  const [countdown, setCountdown] = useState(3);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(3);
      setCanSkip(false);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanSkip(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative flex h-full w-full flex-col items-center justify-center p-6"
          >
            {/* Skip/Close button */}
            <div className="absolute right-4 top-4">
              {canSkip ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                  className="gap-2"
                >
                  <X className="h-4 w-4" />
                  Алгасах
                </Button>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-sm font-medium">
                  {countdown}
                </div>
              )}
            </div>

            {/* Ad content placeholder */}
            <div className="flex h-96 w-full max-w-md flex-col items-center justify-center rounded-2xl border border-dashed border-muted-foreground/30 bg-card/50 p-8">
              <div className="mb-4 text-6xl">📺</div>
              <h3 className="mb-2 text-xl font-bold text-foreground">
                Зар сурталчилгаа
              </h3>
              <p className="text-center text-sm text-muted-foreground">
                Энд таны зар сурталчилгаа харагдана.
                <br />
                Google AdSense эсвэл шууд гэрээт зар.
              </p>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              {canSkip
                ? "Алгасах товч дарж тоглоомоо үргэлжлүүлнэ үү"
                : `${countdown} секундын дараа алгасах боломжтой`}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
