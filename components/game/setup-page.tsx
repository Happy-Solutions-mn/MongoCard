"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Minus, Plus, Flame, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGameStore } from "@/lib/game-store";
import { gameTypes, categoryLabels, Card } from "@/lib/game-data";
import { cn } from "@/lib/utils";

interface SetupPageProps {
  onStartGame: () => void;
  onBack: () => void;
}

const categoryIcons: Record<Card["category"], React.ReactNode> = {
  light: <Sparkles className="h-4 w-4" />,
  medium: <Zap className="h-4 w-4" />,
  hot: <Flame className="h-4 w-4" />,
};

const categoryColors: Record<Card["category"], string> = {
  light: "bg-emerald-500/20 border-emerald-500 text-emerald-400 hover:bg-emerald-500/30",
  medium: "bg-amber-500/20 border-amber-500 text-amber-400 hover:bg-amber-500/30",
  hot: "bg-rose-500/20 border-rose-500 text-rose-400 hover:bg-rose-500/30",
};

const categoryColorsSelected: Record<Card["category"], string> = {
  light: "bg-emerald-500 border-emerald-500 text-white",
  medium: "bg-amber-500 border-amber-500 text-white",
  hot: "bg-rose-500 border-rose-500 text-white",
};

export function SetupPage({ onStartGame, onBack }: SetupPageProps) {
  const {
    selectedGameId,
    players,
    selectedCategories,
    setPlayers,
    updatePlayerName,
    toggleCategory,
    startGame,
  } = useGameStore();

  const [playerCount, setPlayerCount] = useState(4);
  const [showNames, setShowNames] = useState(false);

  const selectedGame = gameTypes.find((g) => g.id === selectedGameId);

  const handlePlayerCountChange = (delta: number) => {
    const newCount = Math.max(2, Math.min(20, playerCount + delta));
    setPlayerCount(newCount);
    setPlayers(newCount);
  };

  const handleStartGame = () => {
    if (players.length === 0) {
      setPlayers(playerCount);
    }
    startGame();
    onStartGame();
  };

  // Initialize players if not set
  if (players.length === 0) {
    setPlayers(playerCount);
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 px-4 py-6"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold">{selectedGame?.name}</h1>
          <p className="text-sm text-muted-foreground">Тохиргоо</p>
        </div>
        <div className="text-4xl">{selectedGame?.icon}</div>
      </motion.header>

      {/* Content */}
      <div className="flex-1 px-4 pb-8 space-y-8">
        {/* Player Count */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-5 w-5" />
            <h2 className="font-medium">Тоглогчдын тоо</h2>
          </div>

          <div className="flex items-center justify-center gap-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePlayerCountChange(-1)}
              disabled={playerCount <= 2}
              className="h-12 w-12 rounded-full"
            >
              <Minus className="h-5 w-5" />
            </Button>
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-card border border-border">
              <span className="text-3xl font-bold">{playerCount}</span>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePlayerCountChange(1)}
              disabled={playerCount >= 20}
              className="h-12 w-12 rounded-full"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </motion.section>

        {/* Player Names Toggle */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowNames(!showNames)}
          >
            {showNames ? "Нэрүүдийг нуух" : "Тоглогчдын нэр оруулах (заавал биш)"}
          </Button>

          {showNames && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 space-y-3"
            >
              {players.map((player, index) => (
                <Input
                  key={player.id}
                  placeholder={`Тоглогч ${index + 1}`}
                  value={player.name === `Тоглогч ${index + 1}` ? "" : player.name}
                  onChange={(e) => updatePlayerName(index, e.target.value)}
                  className="bg-card"
                />
              ))}
            </motion.div>
          )}
        </motion.section>

        {/* Category Selection */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="font-medium text-muted-foreground">Картын ангилал</h2>
          <div className="grid grid-cols-3 gap-3">
            {(["light", "medium", "hot"] as const).map((category) => {
              const isSelected = selectedCategories.includes(category);
              return (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all",
                    isSelected
                      ? categoryColorsSelected[category]
                      : categoryColors[category]
                  )}
                >
                  {categoryIcons[category]}
                  <span className="text-sm font-medium">
                    {categoryLabels[category]}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-center text-xs text-muted-foreground">
            Хамгийн багадаа нэг ангилал сонгоно уу
          </p>
        </motion.section>
      </div>

      {/* Start Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="sticky bottom-0 border-t border-border bg-background/95 backdrop-blur-sm p-4"
      >
        <Button
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg h-14"
          onClick={handleStartGame}
        >
          Тоглоом эхлэх
        </Button>
      </motion.div>
    </div>
  );
}
