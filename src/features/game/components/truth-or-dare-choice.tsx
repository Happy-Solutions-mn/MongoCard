"use client";

import { motion } from "framer-motion";
import type { TruthOrDareKind } from "@/lib/game-data";
import { cn } from "@/lib/utils";

interface TruthOrDareChoiceProps {
  onPick: (side: TruthOrDareKind) => void;
  className?: string;
  /** Зоригын тал — тоглогчийн deckSurface градиент */
  dareSurfaceClassName?: string;
}

const shell =
  "relative w-[min(22rem,calc(100vw-2rem))] sm:w-[min(24rem,calc(100vw-2.5rem))] min-h-[min(26rem,calc(100dvh-15rem))] max-h-[min(40rem,calc(100dvh-10rem))]";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
  exit: {
    opacity: 0,
    scale: 0.88,
    y: -20,
    filter: "blur(10px)",
    transition: { duration: 0.14, ease: "easeIn" as const },
  },
};

const hoverSpring = {
  type: "spring" as const,
  stiffness: 420,
  damping: 22,
};

const truthTileVariants = {
  hidden: { opacity: 0, y: -36, rotateX: -8 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 26 },
  },
};

const dareTileVariants = {
  hidden: { opacity: 0, y: 36, rotateX: 8 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 26 },
  },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 22,
      delay: 0.15,
    },
  },
};

/**
 * Алхам 3 — Үнэн / Зориг: карт биш, хоёр интерактив талбар + орчин үеийн хөдөлгөөн.
 */
export function TruthOrDareChoice({
  onPick,
  className,
  dareSurfaceClassName = "bg-gradient-to-br from-cyan-500 via-cyan-600 to-cyan-900",
}: TruthOrDareChoiceProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ perspective: 1000 }}
      className={cn(shell, "will-change-transform", className)}
    >
      <div className="relative flex h-full min-h-[inherit] flex-col gap-3 px-1 py-1 sm:gap-4">
        {/* Арын зөөлөн гэрэл */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
          aria-hidden
        >
          <motion.div
            className="absolute left-1/2 top-1/3 h-[120%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-3xl"
            animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.05, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Үнэн */}
        <motion.button
          type="button"
          variants={truthTileVariants}
          whileHover={{
            scale: 1.045,
            y: -5,
            rotateZ: -0.6,
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.14), 0 28px 70px -18px rgba(0,0,0,0.75), 0 0 48px rgba(255,255,255,0.08)",
            transition: hoverSpring,
          }}
          whileTap={{ scale: 0.97, y: 0, rotateZ: 0, transition: hoverSpring }}
          onClick={() => onPick("truth")}
          className="group relative flex min-h-[7.5rem] flex-1 flex-col items-center justify-center overflow-hidden rounded-[1.35rem] border border-white/[0.12] bg-zinc-950 px-5 py-8 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_50px_-20px_rgba(0,0,0,0.85)] transition-shadow duration-200 sm:min-h-[8rem] sm:rounded-3xl sm:py-10"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.07)_0%,transparent_42%,transparent_58%,rgba(255,255,255,0.03)_100%)]"
            aria-hidden
          />
          <motion.div
            className="pointer-events-none absolute -left-1/4 top-0 h-1/2 w-1/2 rounded-full bg-white/[0.06] blur-3xl"
            animate={{ x: [0, 12, 0], opacity: [0.4, 0.65, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px]"
            aria-hidden
          />
          <span className="relative z-[1] inline-block text-4xl font-black tracking-tight text-white drop-shadow-sm transition-transform duration-200 will-change-transform group-hover:scale-105 sm:text-5xl">
            Үнэн
          </span>
          <span className="relative z-[1] mt-2 max-w-[16rem] text-sm font-medium leading-snug text-white/55 transition-colors duration-200 group-hover:text-white/75 sm:text-base">
            Асуултад үнэнээр хариулна
          </span>
          <motion.span
            className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden
          />
        </motion.button>

        {/* Эсвэл */}
        <motion.div
          variants={chipVariants}
          className="relative z-[2] flex shrink-0 items-center justify-center gap-3 py-0.5"
        >
          <motion.div
            className="h-px flex-1 max-w-[4rem] bg-gradient-to-r from-transparent to-white/20 sm:max-w-[5rem]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 1 }}
          />
          <motion.span
            layout
            className={cn(
              "relative rounded-full border border-white/40 bg-black/80 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white/95 shadow-[0_0_24px_rgba(255,255,255,0.12)] backdrop-blur-md",
              "sm:px-6 sm:text-sm",
            )}
            animate={{
              boxShadow: [
                "0 0 20px rgba(255,255,255,0.08)",
                "0 0 32px rgba(255,255,255,0.18)",
                "0 0 20px rgba(255,255,255,0.08)",
              ],
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            эсвэл
          </motion.span>
          <motion.div
            className="h-px flex-1 max-w-[4rem] bg-gradient-to-l from-transparent to-white/20 sm:max-w-[5rem]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0 }}
          />
        </motion.div>

        {/* Зориг */}
        <motion.button
          type="button"
          variants={dareTileVariants}
          whileHover={{
            scale: 1.045,
            y: 5,
            rotateZ: 0.6,
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.35), 0 32px 80px -16px rgba(0,0,0,0.45), 0 0 56px rgba(255,255,255,0.2)",
            transition: hoverSpring,
          }}
          whileTap={{ scale: 0.97, y: 0, rotateZ: 0, transition: hoverSpring }}
          onClick={() => onPick("dare")}
          className={cn(
            "group relative flex min-h-[7.5rem] flex-1 flex-col items-center justify-center overflow-hidden rounded-[1.35rem] border border-white/25 px-5 py-8 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_24px_56px_-16px_rgba(0,0,0,0.5)] transition-shadow duration-200 sm:min-h-[8rem] sm:rounded-3xl sm:py-10",
            dareSurfaceClassName,
          )}
        >
          <motion.div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/15"
            initial={{ opacity: 0.85 }}
            animate={{ opacity: [0.75, 0.95, 0.75] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <motion.div
            className="pointer-events-none absolute -right-1/4 bottom-0 h-3/5 w-3/5 rounded-full bg-white/20 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <motion.div
            className="pointer-events-none absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:translate-x-[100%] group-hover:opacity-100"
            transition={{ duration: 0.65, ease: "easeOut" }}
            aria-hidden
          />
          <span className="relative z-[1] inline-block text-4xl font-black tracking-tight text-white drop-shadow-md transition-transform duration-200 will-change-transform group-hover:scale-105 sm:text-5xl">
            Зориг
          </span>
          <span className="relative z-[1] mt-2 max-w-[16rem] text-sm font-medium leading-snug text-white/85 transition-colors duration-200 group-hover:text-white sm:text-base">
            Даалгавар биелүүлнэ
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}
