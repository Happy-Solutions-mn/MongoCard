"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { gameTypes } from "@/lib/game-data";
import { useGameStore } from "@/lib/game-store";
import { GameCard } from "./game-card";
import { AdBanner } from "./ad-banner";
import { ThemeToggle } from "./theme-toggle";

interface HomePageProps {
  onSelectGame: () => void;
}

export function HomePage({ onSelectGame }: HomePageProps) {
  const { setSelectedGame } = useGameStore();

  const handleSelectGame = (gameId: string) => {
    setSelectedGame(gameId);
    onSelectGame();
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* Theme Toggle */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute right-4 top-4 z-10"
      >
        <ThemeToggle />
      </motion.div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 px-4 pb-4 pt-12 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
        >
          <Sparkles className="h-4 w-4" />
          <span>Монголын #1 Party Game</span>
        </motion.div>
        
        <h1 className="mb-3 text-5xl font-black tracking-tight md:text-6xl">
          <span className="gradient-text">Монго</span>
          <span className="text-foreground">Карт</span>
        </h1>
        
        <p className="mx-auto max-w-sm text-base text-muted-foreground">
          Найзуудтайгаа хамт тоглоорой! 5 төрлийн тоглоом, 100+ карт
        </p>
      </motion.header>

      {/* Game Selection */}
      <div className="relative z-10 flex-1 px-4 pb-28 pt-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mx-auto grid max-w-lg gap-4 md:max-w-4xl md:grid-cols-2"
        >
          {gameTypes.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 0.15 * index + 0.4,
                duration: 0.5,
                ease: "easeOut"
              }}
            >
              <GameCard game={game} onSelect={() => handleSelectGame(game.id)} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Ad Banner */}
      <AdBanner position="bottom" />
    </div>
  );
}
