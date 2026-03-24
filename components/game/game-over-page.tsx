"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Home, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/lib/game-store";
import { gameTypes } from "@/lib/game-data";
import confetti from "canvas-confetti";

interface GameOverPageProps {
  onPlayAgain: () => void;
  onNewGame: () => void;
}

export function GameOverPage({ onPlayAgain, onNewGame }: GameOverPageProps) {
  const { selectedGameId, getCardsPlayed, startGame } = useGameStore();
  const [showAd, setShowAd] = useState(true);

  const selectedGame = gameTypes.find((g) => g.id === selectedGameId);
  const cardsPlayed = getCardsPlayed();

  useEffect(() => {
    // Fire confetti on mount
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

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
        colors: ["#ff6b9d", "#ffd93d", "#6bcb77", "#4d96ff"],
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const handlePlayAgain = () => {
    startGame();
    onPlayAgain();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      {/* Ad overlay - shows first then fades */}
      {showAd && (
        <motion.div
          initial={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center p-6"
          >
            <div className="mb-6 flex h-80 w-full max-w-md flex-col items-center justify-center rounded-2xl border border-dashed border-muted-foreground/30 bg-card/50 p-8">
              <div className="mb-4 text-6xl">🎉</div>
              <h3 className="mb-2 text-xl font-bold text-foreground">
                Зар сурталчилгаа
              </h3>
              <p className="text-center text-sm text-muted-foreground">
                Тоглоом дууссан! Энд таны зар харагдана.
              </p>
            </div>
            <Button
              size="lg"
              onClick={() => setShowAd(false)}
              className="mt-4"
            >
              Үргэлжлүүлэх
            </Button>
          </motion.div>
        </motion.div>
      )}

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.3 }}
          className="mb-6"
        >
          <PartyPopper className="mx-auto h-20 w-20 text-accent" />
        </motion.div>

        <h1 className="mb-2 text-3xl font-bold">Тоглоом дууслаа!</h1>
        <p className="mb-2 text-muted-foreground">{selectedGame?.name}</p>
        <p className="mb-8 text-sm text-muted-foreground">
          Нийт {cardsPlayed} карт тоглолоо
        </p>

        <div className="flex flex-col gap-4">
          <Button
            size="lg"
            className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-14"
            onClick={handlePlayAgain}
          >
            <RotateCcw className="h-5 w-5" />
            Дахин тоглох
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="gap-2 h-14"
            onClick={onNewGame}
          >
            <Home className="h-5 w-5" />
            Өөр тоглоом сонгох
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
