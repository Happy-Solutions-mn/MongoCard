"use client";

import { motion } from "framer-motion";
import { Users, ChevronRight, Play } from "lucide-react";
import { GameType } from "@/lib/game-data";
import { cn } from "@/lib/utils";

interface GameCardProps {
  game: GameType;
  onSelect: () => void;
}

export function GameCard({ game, onSelect }: GameCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={cn(
        "card-shine group relative w-full overflow-hidden rounded-3xl p-6 text-left",
        "bg-gradient-to-br",
        game.color,
        "shadow-xl shadow-black/20 transition-all duration-300",
        "hover:shadow-2xl hover:shadow-black/30",
        "border border-white/10"
      )}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -right-8 -top-8 text-[140px] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
          {game.icon}
        </div>
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon with animated background */}
        <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-white/20 p-3 backdrop-blur-sm">
          <span className="text-3xl">{game.icon}</span>
        </div>
        
        <h3 className="mb-2 text-xl font-bold text-white drop-shadow-sm">{game.name}</h3>
        <p className="mb-5 text-sm leading-relaxed text-white/80">{game.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full bg-black/20 px-3 py-1.5 text-sm text-white/90 backdrop-blur-sm">
            <Users className="h-3.5 w-3.5" />
            <span>{game.playerRange}</span>
          </div>
          
          <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-white/30 group-hover:gap-3">
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Тоглох</span>
            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </motion.button>
  );
}
