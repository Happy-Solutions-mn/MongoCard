"use client";

import { motion } from "framer-motion";
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
    <div className="flex min-h-screen flex-col">
      {/* Theme Toggle */}
      <div className="absolute right-4 top-4 z-10">
        <ThemeToggle />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 py-8 text-center"
      >
        <h1 className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
          МонгоКарт
        </h1>
        <p className="mt-2 text-muted-foreground">
          Найзуудтайгаа хамт тоглоорой!
        </p>
      </motion.header>

      {/* Game Selection */}
      <div className="flex-1 px-4 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto grid max-w-lg gap-4 md:max-w-4xl md:grid-cols-2"
        >
          {gameTypes.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
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
