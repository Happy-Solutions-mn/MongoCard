"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/lib/game-store";
import { gameTypes, categoryColors as cardCategoryColors } from "@/lib/game-data";
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
    // Show interstitial ad every 5 cards
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
      <div className="flex min-h-screen flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between px-4 py-4"
        >
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">{selectedGame?.name}</div>
            <div className="text-xs text-muted-foreground/70">
              {cardsPlayed}/{totalCardsInDeck} карт
            </div>
          </div>
          <div className="text-2xl">{selectedGame?.icon}</div>
        </motion.header>

        {/* Current Player */}
        <motion.div
          key={currentPlayer?.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="px-4 py-2 text-center"
        >
          <p className="text-sm text-muted-foreground">Ээлж:</p>
          <h2 className="text-2xl font-bold text-primary">{currentPlayer?.name}</h2>
        </motion.div>

        {/* Card Area */}
        <div className="flex flex-1 items-center justify-center px-4 py-8">
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
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDrawCard}
                  className="group relative h-72 w-52 cursor-pointer"
                >
                  {/* Card back design */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/80 to-primary shadow-xl">
                    <div className="absolute inset-2 rounded-xl border-2 border-dashed border-primary-foreground/30" />
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center text-primary-foreground">
                        <RotateCcw className="mx-auto mb-2 h-12 w-12 animate-pulse" />
                        <p className="text-lg font-bold">Карт ухах</p>
                      </div>
                    </div>
                  </div>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key={currentCard.id}
                initial={{ rotateY: 180, opacity: 0 }}
                animate={{ rotateY: isCardRevealed ? 0 : 180, opacity: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="perspective-1000"
              >
                <motion.button
                  onClick={!isCardRevealed ? handleRevealCard : undefined}
                  className={cn(
                    "relative h-80 w-64 cursor-pointer rounded-2xl shadow-2xl",
                    !isCardRevealed && "cursor-pointer"
                  )}
                  style={{ transformStyle: "preserve-3d" }}
                  disabled={isCardRevealed}
                >
                  {/* Card front */}
                  <div
                    className={cn(
                      "absolute inset-0 flex flex-col rounded-2xl bg-card p-6 backface-hidden",
                      "border-2 border-border"
                    )}
                    style={{
                      backfaceVisibility: "hidden",
                    }}
                  >
                    {/* Category badge */}
                    <div
                      className={cn(
                        "mb-4 inline-flex self-start rounded-full px-3 py-1 text-xs font-medium text-white",
                        cardCategoryColors[currentCard.category]
                      )}
                    >
                      {currentCard.category === "light" && "Хөнгөн"}
                      {currentCard.category === "medium" && "Дунд"}
                      {currentCard.category === "hot" && "Халуун"}
                    </div>

                    {/* Card text */}
                    <div className="flex flex-1 items-center justify-center">
                      <p className="text-center text-xl font-medium leading-relaxed text-balance">
                        {currentCard.text}
                      </p>
                    </div>
                  </div>

                  {/* Card back */}
                  <div
                    className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div className="absolute inset-2 rounded-xl border-2 border-dashed border-primary-foreground/30" />
                    <div className="text-center text-primary-foreground">
                      <p className="text-lg font-bold">Дарж нээ</p>
                    </div>
                  </div>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Next Button */}
        <AnimatePresence>
          {isCardRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="px-4 pb-8"
            >
              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-14"
                onClick={handleNextCard}
              >
                <span>Дараагийн карт</span>
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress bar */}
        <div className="h-1 bg-muted">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${(cardsPlayed / totalCardsInDeck) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Interstitial Ad */}
      <InterstitialAd isOpen={showAd} onClose={handleAdClose} />
    </>
  );
}
