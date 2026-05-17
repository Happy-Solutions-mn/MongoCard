"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  RotateCcw,
  Home,
  Trophy,
  Sparkles,
  Star,
  Share2,
  Copy,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/lib/game-store";
import { gameTypes } from "@/lib/game-data";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";
import { useFeedback } from "@/hooks/use-feedback";
import { AdSpaceFrame } from "./ad-space-label";
import { HappySimPromo } from "./happy-sim-promo";

interface GameOverPageProps {
  onPlayAgain: () => void;
  onNewGame: () => void;
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mongocard.mn";

export function GameOverPage({ onPlayAgain, onNewGame }: GameOverPageProps) {
  const { selectedGameId, getCardsPlayed, startGame, players } = useGameStore();
  const [showAd, setShowAd] = useState(true);
  const { trigger } = useFeedback();

  const selectedGame = gameTypes.find((g) => g.id === selectedGameId);
  const cardsPlayed = getCardsPlayed();

  useEffect(() => {
    trigger("win");
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.1, 0.9),
          y: Math.random() - 0.2,
        },
        colors: ["#ec4899", "#f59e0b", "#10b981", "#6366f1", "#8b5cf6"],
      });
    }, 250);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlayAgain = () => {
    startGame();
    onPlayAgain();
  };

  const buildShareText = () => {
    const playerLine =
      players.length > 0
        ? `${players.length} тоглогч хамтдаа `
        : "";
    return `${playerLine}${selectedGame?.name ?? "МонгоКарт"} тоглож, ${cardsPlayed} карт давсан. Чи ч мөн адил оролдож үзээрэй! ${SITE_URL}`;
  };

  const handleShare = async () => {
    const text = buildShareText();
    const title = `МонгоКарт — ${selectedGame?.name ?? ""}`.trim();

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text, url: SITE_URL });
      } catch (err) {
        if ((err as DOMException)?.name !== "AbortError") {
          toast.error("Хуваалцаж чадсангүй");
        }
      }
      return;
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        toast.success("Хуулагдлаа", {
          description: "Найзууддаа явуулаарай!",
        });
      } catch {
        toast.error("Хуулж чадсангүй");
      }
    }
  };

  const handleCopyLink = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      toast.error("Энэ браузер дэмжихгүй байна");
      return;
    }
    try {
      await navigator.clipboard.writeText(SITE_URL);
      toast.success("Линк хуулагдлаа");
    } catch {
      toast.error("Хуулж чадсангүй");
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-6">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute text-primary/30"
          initial={{
            x: Math.random() * 400 - 200,
            y: Math.random() * 400 - 200,
            scale: 0,
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            delay: i * 0.5,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        >
          <Star className="h-6 w-6 fill-current" />
        </motion.div>
      ))}

      {showAd && (
        <motion.div
          initial={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/98 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex flex-col items-center p-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-accent shadow-xl"
            >
              <Trophy className="h-10 w-10 text-white" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-2 text-2xl font-bold"
            >
              Тоглоом дууслаа!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-8 text-muted-foreground"
            >
              Нийт {cardsPlayed} карт тоглолоо
            </motion.p>

            <AdSpaceFrame className="mb-8">
              <HappySimPromo variant="card" />
            </AdSpaceFrame>

            <Button
              size="lg"
              onClick={() => setShowAd(false)}
              className={cn(
                "gap-2 rounded-2xl bg-gradient-to-r from-primary to-primary/90 px-8 font-bold h-14",
                "shadow-xl shadow-primary/30",
              )}
            >
              {/* <Sparkles className="h-5 w-5" /> */}
              Үргэлжлүүлэх
            </Button>
          </motion.div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 text-center"
      >
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", delay: 0.3, stiffness: 200 }}
          className="mb-6 inline-block"
        >
          <div
            className={cn(
              "flex h-28 w-28 items-center justify-center rounded-[2rem] shadow-2xl",
              "bg-gradient-to-br",
              selectedGame?.color,
            )}
          >
            <span className="text-5xl">{selectedGame?.icon}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
            <Trophy className="h-4 w-4" />
            Баяр хүргэе!
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-3 text-4xl font-black"
        >
          Тоглоом дууслаа!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-2 text-lg text-muted-foreground"
        >
          {selectedGame?.name}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-10 inline-flex items-center gap-2 rounded-2xl bg-card px-6 py-3 shadow-lg"
        >
          <span className="text-3xl font-bold text-primary">{cardsPlayed}</span>
          <span className="text-muted-foreground">карт тоглосон</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col gap-3"
        >
          <Button
            size="lg"
            className={cn(
              "gap-3 rounded-2xl bg-gradient-to-r from-primary to-primary/90 font-bold text-lg h-16",
              "shadow-xl shadow-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/40",
            )}
            onClick={handlePlayAgain}
          >
            <RotateCcw className="h-5 w-5" />
            Дахин тоглох
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="gap-3 rounded-2xl border-2 font-semibold h-14 hover:bg-secondary"
            onClick={onNewGame}
          >
            <Home className="h-5 w-5" />
            Өөр тоглоом сонгох
          </Button>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Button
              size="lg"
              variant="ghost"
              onClick={handleShare}
              className="gap-2 rounded-2xl border border-border/60 font-semibold"
            >
              <Share2 className="h-4 w-4" />
              Хуваалцах
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={handleCopyLink}
              className="gap-2 rounded-2xl border border-border/60 font-semibold"
            >
              <Copy className="h-4 w-4" />
              Линк хуулах
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
