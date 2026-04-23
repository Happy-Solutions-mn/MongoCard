"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/lib/game-store";
import {
  gameTypes,
  categoryLabels,
  LOBBY_PACK_ORDER,
  lobbyPackMeta,
  lobbyPackIdFromSelection,
} from "@/lib/game-data";
import { getPlayerSwatch } from "@/lib/player-colors";
import { cn } from "@/lib/utils";
import { InterstitialAd } from "./interstitial-ad";
import { TruthOrDareChoice } from "./truth-or-dare-choice";

interface GamePageProps {
  onGameOver: () => void;
  onBack: () => void;
}

/**
 * Картын хэмжээ — тодорхой `h-` заавал (absolute гаднуурх дотоод хэсэгт `h-full` ажиллана).
 * Зөвхөн min-h байвал эцэгийн өндөр 0 болж 3D карт нягтрах асуудал гардаг.
 */
const CARD_SHELL =
  "relative w-[min(22rem,calc(100vw-2rem))] h-[min(28rem,calc(100dvh-14rem))] max-h-[min(36rem,calc(100dvh-12rem))] sm:h-[min(32rem,calc(100dvh-13rem))] sm:w-[min(24rem,calc(100vw-2.5rem))] sm:max-h-[min(40rem,calc(100dvh-11rem))]";

function playerInitial(name: string) {
  const t = name.trim();
  return t ? t[0]!.toUpperCase() : "?";
}

const springSnappy = { type: "spring" as const, stiffness: 420, damping: 32 };
const springSoft = { type: "spring" as const, stiffness: 280, damping: 28 };
/** Картны 3D эргэлт — хурдан, товч */
const flipSpring = {
  type: "spring" as const,
  stiffness: 140,
  damping: 22,
  mass: 0.65,
};

/** Үнэн/Зориг сонгосны дараа асуултын карт — илүү хурдан «гарч ирэх» */
const flipSpringTod = {
  type: "spring" as const,
  stiffness: 320,
  damping: 24,
  mass: 0.42,
};

const todQuestionShellSpring = {
  type: "spring" as const,
  stiffness: 520,
  damping: 30,
  mass: 0.48,
};

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
    truthOrDareSide,
    setTruthOrDareSide,
    selectedCategories,
    switchDeckDuringGame,
  } = useGameStore();

  const [showAd, setShowAd] = useState(false);
  const [pendingNext, setPendingNext] = useState(false);
  const [showDeckPicker, setShowDeckPicker] = useState(false);

  const selectedGame = gameTypes.find((g) => g.id === selectedGameId);
  const activePackId = lobbyPackIdFromSelection(selectedCategories);
  const isTruthOrDare = selectedGameId === "truth-or-dare";
  const needsTruthOrDarePick =
    isTruthOrDare && truthOrDareSide === null && !currentCard;
  const currentPlayer = players[currentPlayerIndex];
  const currentSwatch = currentPlayer
    ? getPlayerSwatch(currentPlayer.colorIndex)
    : null;
  const cardsPlayed = getCardsPlayed();
  const progress =
    totalCardsInDeck > 0 ? (cardsPlayed / totalCardsInDeck) * 100 : 0;

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
        <motion.div
          key={`ambient-${currentPlayerIndex}-${currentPlayer?.id ?? "x"}`}
          className="pointer-events-none absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div
            className={cn(
              "absolute -left-1/2 top-1/4 h-[28rem] w-[28rem] rounded-full blur-3xl sm:h-[32rem] sm:w-[32rem]",
              currentSwatch?.ambientLeft ?? "bg-primary/12",
            )}
          />
          <div
            className={cn(
              "absolute -right-1/2 bottom-1/4 h-[26rem] w-[26rem] rounded-full blur-3xl sm:h-[30rem] sm:w-[30rem]",
              currentSwatch?.ambientRight ?? "bg-accent/12",
            )}
          />
        </motion.div>

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
          </div>

          <button
            type="button"
            onClick={() => setShowDeckPicker(true)}
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl",
              "bg-gradient-to-br shadow-lg transition hover:brightness-110 hover:ring-2 hover:ring-white/35",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
              selectedGame?.color,
            )}
            aria-label="Картын багц солих"
            title="Картын багц солих"
          >
            {selectedGame?.icon}
          </button>
        </motion.header>

        {/* Одоогийн ээлж — тоглогч солигдох бүрт шинээр орж ирнэ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`turn-${currentPlayerIndex}-${currentPlayer?.id ?? "p"}`}
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{
              opacity: 0,
              x: 28,
              transition: { duration: 0.22, ease: "easeIn" },
            }}
            transition={springSnappy}
            className="relative z-10 px-3 pb-2 pt-1 sm:px-4"
          >
            <motion.div
              layout
              initial={{ scale: 0.92 }}
              animate={{
                scale: currentCard ? 0.94 : 1,
                opacity: currentCard ? 0.88 : 1,
              }}
              transition={springSoft}
              className={cn(
                "flex flex-col gap-2 rounded-3xl border-2 border-white/25 px-4 py-4 shadow-2xl sm:gap-3 sm:px-6 sm:py-5",
                currentSwatch?.badge ?? "bg-primary text-primary-foreground",
              )}
            >
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <motion.div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-xl font-black text-white ring-2 ring-white/35 sm:h-16 sm:w-16 sm:text-2xl"
                  initial={{ scale: 0, rotate: -12 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.06, ...springSnappy }}
                >
                  {currentPlayer ? playerInitial(currentPlayer.name) : "?"}
                </motion.div>
                <motion.p
                  className="min-w-0 flex-1 break-words text-left text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl md:text-4xl"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, ...springSnappy }}
                >
                  {currentPlayer?.name ?? "—"}
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Card Area — ээлж бүрт: Карт ухах ↔ карт */}
        <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-3 py-3 sm:px-4 sm:py-4">
          <AnimatePresence mode="wait">
            {needsTruthOrDarePick ? (
              <TruthOrDareChoice
                key={`tod-pick-${currentPlayerIndex}`}
                onPick={setTruthOrDareSide}
                dareSurfaceClassName={
                  currentSwatch?.deckSurface ??
                  cn(
                    "bg-gradient-to-br shadow-2xl",
                    selectedGame?.color ?? "from-slate-600 to-slate-900",
                  )
                }
              />
            ) : !currentCard && !isTruthOrDare ? (
              <motion.div
                key={`deck-${currentPlayerIndex}-${truthOrDareSide ?? "na"}`}
                initial={{ opacity: 0, y: 36, scale: 0.9, rotate: -2 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotate: 0,
                  transition: { ...springSoft, delay: 0.04 },
                }}
                exit={{
                  opacity: 0,
                  y: -28,
                  scale: 0.92,
                  rotate: 2,
                  transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
                }}
                className="text-center"
              >
                <motion.button
                  whileHover={{ scale: 1.03, y: -6 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleDrawCard}
                  className="group relative"
                >
                  {/* Card back design */}
                  <div
                    className={cn(
                      CARD_SHELL,
                      "flex flex-col overflow-hidden rounded-3xl",
                      currentSwatch?.deckSurface ??
                        cn("bg-gradient-to-br shadow-2xl", selectedGame?.color),
                    )}
                  >
                    {/* Decorative pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-4 rounded-2xl border-2 border-dashed border-white sm:inset-5" />
                      <div className="absolute inset-8 rounded-xl border border-white/50 sm:inset-10" />
                    </div>

                    {/* Center content */}
                    <div className="relative flex h-full min-h-0 flex-col items-center justify-center gap-5 p-6 sm:gap-6 sm:p-8">
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.08, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                        className="text-7xl sm:text-8xl"
                      >
                        {selectedGame?.icon}
                      </motion.div>

                      <div className="flex flex-col items-center gap-3">
                        <RotateCcw className="h-10 w-10 text-white/90 transition-transform group-hover:rotate-180 sm:h-12 sm:w-12" />
                        <p className="text-center text-2xl font-black text-white sm:text-3xl">
                          Карт ухах
                        </p>
                        <p className="text-center text-base text-white/80 sm:text-lg">
                          Дарж нээнэ үү
                        </p>
                      </div>
                    </div>

                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>

                  {/* Card shadow */}
                  <div className="absolute -bottom-5 left-1/2 h-5 w-52 -translate-x-1/2 rounded-full bg-black/25 blur-xl sm:w-64" />
                </motion.button>
              </motion.div>
            ) : currentCard ? (
              <motion.div
                key={currentCard.id}
                className={cn("relative", CARD_SHELL)}
                style={{ perspective: 1200 }}
                initial={
                  isTruthOrDare
                    ? {
                        opacity: 0,
                        y: 52,
                        scale: 0.78,
                        rotateX: 12,
                      }
                    : { opacity: 0, y: 40, scale: 0.94 }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotateX: 0,
                  transition: isTruthOrDare
                    ? { ...todQuestionShellSpring }
                    : { ...springSoft, delay: 0.05 },
                }}
                exit={{
                  opacity: 0,
                  y: 32,
                  scale: 0.9,
                  transition: { duration: 0.3, ease: "easeInOut" },
                }}
              >
                <motion.div
                  className="relative h-full w-full"
                  initial={{ rotateY: 180, opacity: 0 }}
                  animate={{ rotateY: isCardRevealed ? 0 : 180, opacity: 1 }}
                  transition={isTruthOrDare ? flipSpringTod : flipSpring}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.button
                    onClick={!isCardRevealed ? handleRevealCard : undefined}
                    className="relative block h-full w-full appearance-none border-0 bg-transparent p-0 text-left"
                    disabled={isCardRevealed}
                    whileHover={!isCardRevealed ? { scale: 1.02 } : {}}
                    whileTap={!isCardRevealed ? { scale: 0.98 } : {}}
                  >
                    {/* Card front — гаднах тоглогчийн өнгө, дотор асуулт тусдаа «карт» */}
                    <div
                      className={cn(
                        "absolute inset-0 isolate flex flex-col overflow-hidden rounded-3xl p-4 shadow-2xl sm:p-5",
                        currentSwatch?.cardFace ??
                          "bg-card text-foreground ring-1 ring-border",
                      )}
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "translateZ(1px)",
                        border: currentSwatch
                          ? undefined
                          : "1px solid var(--border)",
                      }}
                    >
                      <div
                        className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/14 via-transparent to-black/20"
                        aria-hidden
                      />
                      {/* Category badge — тоглогчийн өнгөтэй нийцүүлсэн цайвар хэлбэр */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.12 }}
                        className="relative z-[2] mb-3 inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/35 bg-white/15 px-4 py-2 text-sm font-semibold text-white shadow-md backdrop-blur-sm sm:text-base"
                      >
                        <span
                          className={cn(
                            "h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-white/50",
                            currentCard.category === "light" &&
                              "bg-emerald-300",
                            currentCard.category === "medium" && "bg-amber-300",
                            currentCard.category === "hot" && "bg-rose-300",
                          )}
                          aria-hidden
                        />
                        {currentCard.category === "light" && (
                          <Sparkles className="h-4 w-4 text-white/95 sm:h-5 sm:w-5" />
                        )}
                        {currentCard.category === "medium" && (
                          <span className="text-base text-white" aria-hidden>
                            ⚡
                          </span>
                        )}
                        {currentCard.category === "hot" && (
                          <span className="text-base" aria-hidden>
                            🔥
                          </span>
                        )}
                        {categoryLabels[currentCard.category]}
                      </motion.div>

                      {/* Асуултын карт — зөвхөн текст биш, хүрээтэй самбар */}
                      <div className="relative z-[2] flex min-h-0 flex-1 flex-col">
                        <motion.div
                          initial={{ opacity: 0, y: 14, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: 0.16, ...springSoft }}
                          className={cn(
                            "flex min-h-0 flex-1 flex-col justify-center rounded-2xl border-2 border-white/30 bg-black/35 p-4 shadow-lg backdrop-blur-md sm:p-5",
                            !currentSwatch && "border-border bg-muted/40",
                          )}
                        >
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.22 }}
                            className={cn(
                              "text-center text-xl font-semibold leading-snug text-balance sm:text-2xl md:text-3xl",
                              currentSwatch
                                ? "text-white drop-shadow-md"
                                : "text-foreground",
                            )}
                          >
                            {currentCard.text}
                          </motion.p>
                          <div className="mt-4 flex shrink-0 justify-center drop-shadow-md">
                            <div className="text-4xl sm:text-5xl">
                              {selectedGame?.icon}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Card back */}
                    <div
                      className={cn(
                        "absolute inset-0 flex items-center justify-center overflow-hidden rounded-3xl ring-1 ring-white/15",
                        currentSwatch?.deckSurface ??
                          cn(
                            "bg-gradient-to-br shadow-2xl",
                            selectedGame?.color,
                          ),
                      )}
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg) translateZ(0.5px)",
                      }}
                    >
                      <div className="absolute inset-4 rounded-2xl border-2 border-dashed border-white/30 sm:inset-5" />
                      <div className="text-center text-white">
                        <motion.div
                          animate={{ scale: [1, 1.08, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="mb-4 text-6xl sm:text-7xl"
                        >
                          {selectedGame?.icon}
                        </motion.div>
                        <p className="text-xl font-bold sm:text-2xl">
                          Дарж нээ
                        </p>
                        <p className="mt-2 text-sm text-white/75 sm:text-base">
                          Картны арын тал
                        </p>
                      </div>
                    </div>
                  </motion.button>
                </motion.div>

                {/* Card shadow */}
                <div className="pointer-events-none absolute -bottom-5 left-1/2 h-5 w-52 -translate-x-1/2 rounded-full bg-black/25 blur-xl sm:w-64" />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Next Button */}
        <AnimatePresence>
          {isCardRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { ...springSnappy, delay: 0.06 },
              }}
              exit={{
                opacity: 0,
                y: 16,
                scale: 0.98,
                transition: { duration: 0.2 },
              }}
              className="relative z-10 px-4 pb-6"
            >
              <Button
                size="lg"
                className={cn(
                  "w-full gap-2 rounded-2xl bg-gradient-to-r from-primary to-primary/90 font-bold h-16",
                  "shadow-xl shadow-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/40",
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

      <AnimatePresence>
        {showDeckPicker && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="deck-picker-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/65 p-4 pb-8 backdrop-blur-sm sm:items-center"
            onClick={() => setShowDeckPicker(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-border/80 bg-card p-5 shadow-2xl"
            >
              <h2
                id="deck-picker-title"
                className="text-center text-lg font-bold tracking-tight"
              >
                Картын багц
              </h2>
              <p className="mt-1 text-center text-xs text-muted-foreground">
                Сонгосны дараа энэ тоглолтын ашигласан карт шинээр тоологдоно.
              </p>
              <div
                className="mt-4 grid grid-cols-2 gap-2"
                role="listbox"
                aria-label="Картын багц"
              >
                {LOBBY_PACK_ORDER.map((id) => {
                  const meta = lobbyPackMeta[id];
                  const selected = activePackId === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => {
                        switchDeckDuringGame(meta.categories);
                        setShowDeckPicker(false);
                      }}
                      className={cn(
                        "flex min-h-[3.75rem] items-center gap-2 rounded-2xl border-2 px-2.5 py-2 text-left text-[11px] font-black leading-tight tracking-tight transition-colors sm:min-h-[4rem] sm:text-xs",
                        selected ? meta.selected : meta.idle,
                      )}
                    >
                      <span className="text-lg sm:text-xl" aria-hidden>
                        {meta.emoji}
                      </span>
                      <span
                        className={cn(
                          "min-w-0 flex-1 whitespace-nowrap",
                          selected && id === "spicy" && "text-zinc-950",
                        )}
                      >
                        {meta.title}
                      </span>
                    </button>
                  );
                })}
              </div>
              <Button
                type="button"
                variant="secondary"
                className="mt-4 w-full rounded-xl font-semibold"
                onClick={() => setShowDeckPicker(false)}
              >
                Болих
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interstitial Ad */}
      <InterstitialAd isOpen={showAd} onClose={handleAdClose} />
    </>
  );
}
