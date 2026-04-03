"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Users, Minus, Plus, Flame, Sparkles, Zap, ChevronDown, Play } from "lucide-react";
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
  light: <Sparkles className="h-5 w-5" />,
  medium: <Zap className="h-5 w-5" />,
  hot: <Flame className="h-5 w-5" />,
};

const categoryColors: Record<Card["category"], string> = {
  light: "border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10",
  medium: "border-amber-500/50 text-amber-500 hover:bg-amber-500/10",
  hot: "border-rose-500/50 text-rose-500 hover:bg-rose-500/10",
};

const categoryColorsSelected: Record<Card["category"], string> = {
  light: "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/30",
  medium: "bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/30",
  hot: "bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-500/30",
};

const categoryDescriptions: Record<Card["category"], string> = {
  light: "Энгийн, хөгжилтэй",
  medium: "Бага зэрэг халуун",
  hot: "18+ контент",
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

  useEffect(() => {
    if (players.length === 0) {
      setPlayers(playerCount);
    }
  }, [players.length, playerCount, setPlayers]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-1/4 top-0 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -left-1/4 bottom-1/4 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex items-center gap-4 px-4 py-5"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="shrink-0 rounded-full bg-secondary/50 backdrop-blur-sm hover:bg-secondary"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{selectedGame?.name}</h1>
          <p className="text-sm text-muted-foreground">Тоглоомын тохиргоо</p>
        </div>
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-2xl text-3xl",
            "bg-gradient-to-br shadow-lg",
            selectedGame?.color
          )}
        >
          {selectedGame?.icon}
        </motion.div>
      </motion.header>

      {/* Content */}
      <div className="relative z-10 flex-1 space-y-6 overflow-y-auto px-4 pb-28">
        {/* Player Count */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl bg-card/80 p-6 shadow-lg backdrop-blur-sm"
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold">Тоглогчдын тоо</h2>
              <p className="text-xs text-muted-foreground">2-20 хүн тоглох боломжтой</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePlayerCountChange(-1)}
              disabled={playerCount <= 2}
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-border bg-secondary/50 transition-colors",
                "hover:border-primary hover:bg-primary/10",
                "disabled:opacity-40 disabled:hover:border-border disabled:hover:bg-secondary/50"
              )}
            >
              <Minus className="h-6 w-6" />
            </motion.button>
            
            <motion.div 
              key={playerCount}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-primary/80 shadow-xl shadow-primary/30"
            >
              <span className="text-4xl font-bold text-primary-foreground">{playerCount}</span>
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePlayerCountChange(1)}
              disabled={playerCount >= 20}
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-border bg-secondary/50 transition-colors",
                "hover:border-primary hover:bg-primary/10",
                "disabled:opacity-40 disabled:hover:border-border disabled:hover:bg-secondary/50"
              )}
            >
              <Plus className="h-6 w-6" />
            </motion.button>
          </div>
        </motion.section>

        {/* Player Names Toggle */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl bg-card/80 p-6 shadow-lg backdrop-blur-sm"
        >
          <button
            className="flex w-full items-center justify-between"
            onClick={() => setShowNames(!showNames)}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                <span className="text-lg">✏️</span>
              </div>
              <div className="text-left">
                <h2 className="font-semibold">Тоглогчдын нэр</h2>
                <p className="text-xs text-muted-foreground">Заавал биш</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: showNames ? 180 : 0 }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary"
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </button>

          <AnimatePresence>
            {showNames && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-5 space-y-3 overflow-hidden"
              >
                {players.map((player, index) => (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Input
                      placeholder={`Тоглогч ${index + 1}`}
                      value={player.name === `Тоглогч ${index + 1}` ? "" : player.name}
                      onChange={(e) => updatePlayerName(index, e.target.value || `Тоглогч ${index + 1}`)}
                      className="h-12 rounded-xl border-2 bg-secondary/30 px-4 transition-colors focus:border-primary"
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Category Selection */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl bg-card/80 p-6 shadow-lg backdrop-blur-sm"
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10">
              <Flame className="h-5 w-5 text-rose-500" />
            </div>
            <div>
              <h2 className="font-semibold">Картын түвшин</h2>
              <p className="text-xs text-muted-foreground">Дор хаяж нэг сонгоно уу</p>
            </div>
          </div>

          <div className="grid gap-3">
            {(["light", "medium", "hot"] as const).map((category, index) => {
              const isSelected = selectedCategories.includes(category);
              return (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleCategory(category)}
                  className={cn(
                    "flex items-center gap-4 rounded-2xl border-2 p-4 transition-all duration-300",
                    isSelected ? categoryColorsSelected[category] : categoryColors[category]
                  )}
                >
                  <div className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                    isSelected ? "bg-white/20" : "bg-current/10"
                  )}>
                    {categoryIcons[category]}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold">{categoryLabels[category]}</div>
                    <div className={cn(
                      "text-xs transition-colors",
                      isSelected ? "text-white/80" : "text-muted-foreground"
                    )}>
                      {categoryDescriptions[category]}
                    </div>
                  </div>
                  <div className={cn(
                    "h-6 w-6 rounded-full border-2 transition-all",
                    isSelected 
                      ? "border-white bg-white" 
                      : "border-current opacity-50"
                  )}>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex h-full w-full items-center justify-center"
                      >
                        <div className={cn(
                          "h-3 w-3 rounded-full",
                          category === "light" && "bg-emerald-500",
                          category === "medium" && "bg-amber-500",
                          category === "hot" && "bg-rose-500"
                        )} />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.section>
      </div>

      {/* Start Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed inset-x-0 bottom-0 z-20 border-t border-border/50 bg-background/80 p-4 backdrop-blur-xl"
      >
        <Button
          size="lg"
          className={cn(
            "w-full gap-3 rounded-2xl bg-gradient-to-r from-primary to-primary/90 font-bold text-lg h-16",
            "shadow-xl shadow-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/40",
            "disabled:opacity-50 disabled:shadow-none"
          )}
          onClick={handleStartGame}
          disabled={selectedCategories.length === 0}
        >
          <Play className="h-5 w-5 fill-current" />
          Тоглоом эхлэх
        </Button>
      </motion.div>
    </div>
  );
}
