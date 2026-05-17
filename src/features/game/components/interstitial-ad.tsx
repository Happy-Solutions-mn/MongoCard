"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AdSpaceFrame } from "./ad-space-label";
import { HappySimPromo } from "./happy-sim-promo";

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
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/98 backdrop-blur-md"
        >
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative flex h-full w-full flex-col items-center justify-center p-6"
          >
            {/* Skip/Close button */}
            <div className="absolute right-4 top-4">
              <AnimatePresence mode="wait">
                {canSkip ? (
                  <motion.div
                    key="skip"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onClose}
                      className="gap-2 rounded-full border-2 px-4 font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary"
                    >
                      <X className="h-4 w-4" />
                      Алгасах
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="countdown"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="relative"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-card shadow-lg">
                      <motion.span 
                        key={countdown}
                        initial={{ scale: 1.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-lg font-bold text-foreground"
                      >
                        {countdown}
                      </motion.span>
                    </div>
                    {/* Progress ring */}
                    <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48">
                      <motion.circle
                        cx="24"
                        cy="24"
                        r="22"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-primary"
                        strokeDasharray={138}
                        initial={{ strokeDashoffset: 0 }}
                        animate={{ strokeDashoffset: 138 }}
                        transition={{ duration: 3, ease: "linear" }}
                      />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1 }}
              className="w-full max-w-sm"
            >
              <AdSpaceFrame>
                <HappySimPromo variant="card" />
              </AdSpaceFrame>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex flex-col items-center gap-3"
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <Timer className="h-4 w-4" />
                <p className="text-sm">
                  {canSkip
                    ? "Алгасах товч дарж тоглоомоо үргэлжлүүлнэ үү"
                    : `${countdown} секундын дараа алгасах боломжтой`}
                </p>
              </div>
              <Link
                href="/advertise"
                className="text-xs text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
              >
                Өөрийн брэндээ энд сурталчлах уу?
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
