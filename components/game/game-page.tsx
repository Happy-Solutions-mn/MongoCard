"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/lib/game-store";
import { gameTypes, categoryColors as cardCategoryColors, categoryLabels } from "@/lib/game-data";
import { cn } from "@/lib/utils";
import { InterstitialAd } from "./interstitial-ad";

interface GamePageProps {
  onGameOver: () => void;
  onBack: () => void;
}

export function GamePage({ onGameOver, onBack }: GamePageProps) {
  const {
    selectedGameId,
    players,
    currentPlayerIndex,
    currentCard,
    isCardRevealed,
    totalCardsInDeck,
    drawCard,
    revealCard,
    nextPlayer,
    getCardsPlayed,
    isGameOver,
  } = useGameStore();

  const [showAd, setShowAd] = useState(false);
  const [pendingNext, setPendingNext] = useState(false);

  const selectedGame = gameTypes.find((g) => g.id === selectedGameId);
  const currentPlayer = players[currentPlayerIndex];
  const cardsPlayed = getCardsPlayed();
  const progress = totalCardsInDeck > 0 ? (cardsPlayed / totalCardsInDeck) * 100 : 0;

  useEffect(() => {
    if (isGameOver()) {
      onGameOver();
    }
  }, [cardsPlayed, isGameOver, onGameOver]);

  const handleDrawCard = () => {
    drawCard();
  };

  const handleRevealCard = () => {
    revealCard();
  };

  const handleNextCard = () => {
    if ((cardsPlayed + 1) % 5 === 0 && cardsPlayed > 0) {
      setPendingNext(true);
      setShowAd(true);
    } else {
      nextPlayer();
    }
  };

  const handleAdClose = () => {
    setShowAd(false);
    if (pendingNext) {
      setPendingNext(false);
      nextPlayer();
    }
  };

  return (
    <>
      <div className="relative flex min-h-screen flex-col overflow-hidden">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-1/2 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-1/2 bottom-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        </div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex items-center justify-between px-4 py-4"
        >
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack}
            className="rounded-full bg-secondary/50 backdrop-blur-sm hover:bg-secondary"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="text-center">
            <div className="text-sm font-medium">{selectedGame?.name}</div>
            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <span className="text-primary font-semibold">{cardsPlayed}</span>
              <span>/</span>
              <span>{totalCardsInDeck}</span>
              <span>карт</span>
            </div>
          </div>
          
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl text-xl",
            "bg-gradient-to-br shadow-lg",
            selectedGame?.color
          )}>
            {selectedGame?.icon}
          </div>
        </motion.header>

        {/* Current Player */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPlayer?.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="relative z-10 px-4 py-3 text-center"
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Ээлж:</span>
              <span className="font-bold text-primary">{currentPlayer?.name}</span>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Card Area */}
        <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-4">
          <AnimatePresence mode="wait">
            {!currentCard ? (
              <motion.div
                key="draw-prompt"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center"
              >
                <motion.button
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleDrawCard}
                  className="group relative"
                >
                  {/* Card back design */}
                  <div className={cn(
                    "relative h-80 w-56 overflow-hidden rounded-3xl shadow-2xl",
                    "bg-gradient-to-br",
                    selectedGame?.color
                  )}>
                    {/* Decorative pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-4 rounded-2xl border-2 border-dashed border-white" />
                      <div className="absolute inset-8 rounded-xl border border-white/50" />
                    </div>
                    
                    {/* Center content */}
                    <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
                      <motion.div
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1
                        }}
                        className="text-6xl"
                      >
                        {selectedGame?.icon}
                      </motion.div>
                      
                      <div className="flex flex-col items-center gap-2">
                        <RotateCcw className="h-8 w-8 text-white/80 transition-transform group-hover:rotate-180" />
                        <p className="text-lg font-bold text-white">Карт ухах</p>
                        <p className="text-sm text-white/70">Дарж нээнэ үү</p>
                      </div>
                    </div>
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  
                  {/* Card shadow */}
                  <div className="absolute -bottom-4 left-1/2 h-4 w-40 -translate-x-1/2 rounded-full bg-black/20 blur-xl" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key={currentCard.id}
                initial={{ rotateY: 180, opacity: 0 }}
                animate={{ rotateY: isCardRevealed ? 0 : 180, opacity: 1 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                style={{ perspective: 1000 }}
                className="relative"
              >
                <motion.button
                  onClick={!isCardRevealed ? handleRevealCard : undefined}
                  className="relative"
                  style={{ transformStyle: "preserve-3d" }}
                  disabled={isCardRevealed}
                  whileHover={!isCardRevealed ? { scale: 1.02 } : {}}
                  whileTap={!isCardRevealed ? { scale: 0.98 } : {}}
                >
                  {/* Card front */}
                  <div
                    className="relative h-96 w-64 rounded-3xl bg-card p-6 shadow-2xl"
                    style={{
                      backfaceVisibility: "hidden",
                      border: "1px solid var(--border)"
                    }}
                  >
                    {/* Category badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className={cn(
                        "mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-white",
                        cardCategoryColors[currentCard.category]
                      )}
                    >
                      {currentCard.category === "light" && <Sparkles className="h-3.5 w-3.5" />}
                      {currentCard.category === "medium" && "⚡"}
                      {currentCard.category === "hot" && "🔥"}
                      {categoryLabels[currentCard.category]}
                    </motion.div>

                    {/* Card text */}
                    <div className="flex flex-1 items-center justify-center py-4">
                      <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-center text-xl font-medium leading-relaxed text-balance text-foreground"
                      >
                        {currentCard.text}
                      </motion.p>
                    </div>
                    
                    {/* Card footer */}
                    <div className="mt-auto flex items-center justify-center pt-4">
                      <div className="text-3xl">{selectedGame?.icon}</div>
                    </div>
                  </div>

                  {/* Card back */}
                  <div
                    className={cn(
                      "absolute inset-0 flex items-center justify-center rounded-3xl",
                      "bg-gradient-to-br shadow-2xl",
                      selectedGame?.color
                    )}
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div className="absolute inset-4 rounded-2xl border-2 border-dashed border-white/30" />
                    <div className="text-center text-white">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="mb-3 text-5xl"
                      >
                        {selectedGame?.icon}
                      </motion.div>
                      <p className="text-lg font-bold">Дарж нээ</p>
                    </div>
                  </div>
                </motion.button>
                
                {/* Card shadow */}
                <div className="absolute -bottom-4 left-1/2 h-4 w-48 -translate-x-1/2 rounded-full bg-black/20 blur-xl" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Next Button */}
        <AnimatePresence>
          {isCardRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="relative z-10 px-4 pb-6"
            >
              <Button
                size="lg"
                className={cn(
                  "w-full gap-2 rounded-2xl bg-gradient-to-r from-primary to-primary/90 font-bold h-16",
                  "shadow-xl shadow-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/40"
                )}
                onClick={handleNextCard}
              >
                <span className="text-lg">Дараагийн карт</span>
                <ChevronRight className="h-6 w-6" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress bar */}
        <div className="relative z-10 h-2 bg-secondary">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          {/* Progress glow */}
          <motion.div
            className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/50 to-transparent"
            initial={{ left: 0 }}
            animate={{ left: `${Math.max(0, progress - 5)}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Interstitial Ad */}
      <InterstitialAd isOpen={showAd} onClose={handleAdClose} />
    </>
  );
}
