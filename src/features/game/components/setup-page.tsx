"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Users, Minus, Plus, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGameStore } from "@/lib/game-store";
import { gameTypes } from "@/lib/game-data";
import { getPlayerSwatch } from "@/lib/player-colors";
import { cn } from "@/lib/utils";

interface SetupPageProps {
  onStartGame: () => void;
  onBack: () => void;
}

export function SetupPage({ onStartGame, onBack }: SetupPageProps) {
  const { selectedGameId, players, setPlayers, updatePlayerName, startGame } =
    useGameStore();

  const [playerCount, setPlayerCount] = useState(0);

  const selectedGame = gameTypes.find((g) => g.id === selectedGameId);

  const handlePlayerCountChange = (delta: number) => {
    const newCount = Math.max(0, Math.min(20, playerCount + delta));
    setPlayerCount(newCount);
    setPlayers(newCount);
  };

  const handleStartGame = () => {
    startGame();
    onStartGame();
  };

  useEffect(() => {
    setPlayerCount(players.length);
  }, [players.length]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-1/4 top-0 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -left-1/4 bottom-1/4 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
      </div>

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
          <p className="text-sm text-muted-foreground">
            Алхам 1 — Тоглогчийн мэдээлэл
          </p>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-2xl text-3xl",
            "bg-gradient-to-br shadow-lg",
            selectedGame?.color,
          )}
        >
          {selectedGame?.icon}
        </motion.div>
      </motion.header>

      <div className="relative z-10 flex-1 space-y-4 overflow-y-auto px-4 pb-36">
        <AnimatePresence mode="wait">
          <motion.div
            key="players"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-card/80 p-6 shadow-lg backdrop-blur-sm"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold">Тоглогчдын тоо</h2>
                </div>
              </div>

              <div className="flex items-center justify-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handlePlayerCountChange(-1)}
                  disabled={playerCount <= 0}
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-border bg-secondary/50 transition-colors",
                    "hover:border-primary hover:bg-primary/10",
                    "disabled:opacity-40 disabled:hover:border-border disabled:hover:bg-secondary/50",
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
                  <span className="text-4xl font-bold text-primary-foreground">
                    {playerCount}
                  </span>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handlePlayerCountChange(1)}
                  disabled={playerCount >= 20}
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-border bg-secondary/50 transition-colors",
                    "hover:border-primary hover:bg-primary/10",
                    "disabled:opacity-40 disabled:hover:border-border disabled:hover:bg-secondary/50",
                  )}
                >
                  <Plus className="h-6 w-6" />
                </motion.button>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="rounded-3xl bg-card/80 p-6 shadow-lg backdrop-blur-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                  <span className="text-lg">✏️</span>
                </div>
                <div>
                  <h2 className="font-semibold">Тоглогчдын нэр</h2>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {players.map((player, index) => {
                  const sw = getPlayerSwatch(player.colorIndex);
                  return (
                    <div key={player.id} className="flex items-center gap-2">
                      <span
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white",
                          sw.dot,
                        )}
                      >
                        {index + 1}
                      </span>
                      <Input
                        placeholder={`Тоглогч ${index + 1}`}
                        value={
                          player.name === `Тоглогч ${index + 1}`
                            ? ""
                            : player.name
                        }
                        onChange={(e) =>
                          updatePlayerName(
                            index,
                            e.target.value || `Тоглогч ${index + 1}`,
                          )
                        }
                        className="h-12 flex-1 rounded-xl border-2 bg-secondary/30 px-4 transition-colors focus:border-primary"
                      />
                    </div>
                  );
                })}
              </div>
            </motion.section>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed inset-x-0 bottom-0 z-20 border-t border-border/50 bg-background/90 p-4 backdrop-blur-xl"
      >
        <Button
          size="lg"
          className={cn(
            "w-full gap-3 rounded-2xl bg-gradient-to-r from-primary to-primary/90 font-bold text-lg h-16",
            "shadow-xl shadow-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/40",
          )}
          onClick={handleStartGame}
        >
          <Play className="h-5 w-5 fill-current" />
          Тоглоом эхлэх
        </Button>
      </motion.div>
    </div>
  );
}
