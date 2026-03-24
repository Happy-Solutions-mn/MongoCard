"use client";

import { motion } from "framer-motion";
import { Users, ChevronRight } from "lucide-react";
import { GameType } from "@/lib/game-data";
import { cn } from "@/lib/utils";

interface GameCardProps {
  game: GameType;
  onSelect: () => void;
}

export function GameCard({ game, onSelect }: GameCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl p-6 text-left",
        "bg-gradient-to-br",
        game.color,
        "shadow-lg shadow-black/20 transition-shadow hover:shadow-xl hover:shadow-black/30"
      )}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-8 -top-8 text-[120px]">{game.icon}</div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="mb-3 text-4xl">{game.icon}</div>
        <h3 className="mb-2 text-xl font-bold text-white">{game.name}</h3>
        <p className="mb-4 text-sm text-white/80 leading-relaxed">{game.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm text-white/70">
            <Users className="h-4 w-4" />
            <span>{game.playerRange}</span>
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-white group-hover:gap-2 transition-all">
            <span>Тоглох</span>
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </motion.button>
  );
}
