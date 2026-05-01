"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Pause, Play, RotateCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFeedback } from "@/hooks/use-feedback";

interface DareTimerProps {
  initialSeconds?: number;
  onClose: () => void;
}

const PRESETS = [10, 30, 60] as const;

export function DareTimer({ initialSeconds = 30, onClose }: DareTimerProps) {
  const [duration, setDuration] = useState(initialSeconds);
  const [remaining, setRemaining] = useState(initialSeconds);
  const [running, setRunning] = useState(true);
  const { trigger } = useFeedback();

  useEffect(() => {
    if (!running) return;
    if (remaining <= 0) {
      trigger("win");
      setRunning(false);
      return;
    }
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [running, remaining, trigger]);

  useEffect(() => {
    setRemaining(duration);
  }, [duration]);

  const progress = duration > 0 ? remaining / duration : 0;
  const finished = remaining <= 0;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dare-timer-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/65 p-4 pb-8 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-3xl border border-border/80 bg-card p-6 shadow-2xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2
            id="dare-timer-title"
            className="flex items-center gap-2 text-lg font-bold tracking-tight"
          >
            <Timer className="h-5 w-5 text-primary" />
            Цаг
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
            aria-label="Хаах"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="relative mx-auto mb-6 flex h-44 w-44 items-center justify-center">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              className="text-secondary"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              className={cn(
                "transition-colors",
                finished
                  ? "text-emerald-500"
                  : remaining <= 5
                    ? "text-rose-500"
                    : "text-primary",
              )}
              strokeDasharray={2 * Math.PI * 44}
              animate={{
                strokeDashoffset: 2 * Math.PI * 44 * (1 - progress),
              }}
              transition={{ duration: 0.4, ease: "linear" }}
            />
          </svg>
          <AnimatePresence mode="wait">
            <motion.div
              key={remaining}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              className={cn(
                "text-5xl font-black tabular-nums",
                finished && "text-emerald-500",
              )}
            >
              {remaining}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mb-4 flex items-center justify-center gap-2">
          {PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                setDuration(p);
                setRunning(true);
              }}
              className={cn(
                "rounded-full border-2 px-3 py-1 text-xs font-semibold transition-colors",
                duration === p
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-secondary/40 text-muted-foreground hover:border-primary",
              )}
            >
              {p}с
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            className="rounded-2xl"
            onClick={() => {
              setRemaining(duration);
              setRunning(true);
            }}
          >
            <RotateCw className="mr-2 h-4 w-4" />
            Шинэчлэх
          </Button>
          <Button
            type="button"
            className="rounded-2xl"
            onClick={() => setRunning((r) => !r)}
            disabled={finished}
          >
            {running ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Зогсоох
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Үргэлжлүүлэх
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
