"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ChevronRight,
  HelpCircle,
  Minus,
  Plus,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  gameTypes,
  LOBBY_PACK_ORDER,
  lobbyPackMeta,
  lobbyPackIdFromSelection,
  type HomeLobbyPackId,
} from "@/lib/game-data";
import { useGameStore } from "@/lib/game-store";
import { getPlayerSwatch } from "@/lib/player-colors";
import { GameCard } from "./game-card";
import { AdBanner } from "./ad-banner";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

interface HomePageProps {
  onSelectGame: () => void;
}

type HomePhase = "lobby" | "games";

export function HomePage({ onSelectGame }: HomePageProps) {
  const [phase, setPhase] = useState<HomePhase>("lobby");
  const [showHelp, setShowHelp] = useState(false);
  const [showAgeGate, setShowAgeGate] = useState<HomeLobbyPackId | null>(null);
  const [draftPlayerName, setDraftPlayerName] = useState("");

  const {
    setSelectedGame,
    selectedCategories,
    setSelectedCategories,
    players,
    setPlayers,
    appendPlayer,
    removePlayerAt,
    ageConfirmed,
    setAgeConfirmed,
  } = useGameStore();

  const activePackId = lobbyPackIdFromSelection(selectedCategories);
  const reduceMotion = useReducedMotion();

  const handleSelectGame = (gameId: string) => {
    setSelectedGame(gameId);
    onSelectGame();
  };

  const pickPack = (id: HomeLobbyPackId) => {
    if (lobbyPackMeta[id].requiresAgeConfirm && !ageConfirmed) {
      setShowAgeGate(id);
      return;
    }
    setSelectedCategories(lobbyPackMeta[id].categories);
  };

  const handleConfirmAge = () => {
    if (!showAgeGate) return;
    setAgeConfirmed(true);
    setSelectedCategories(lobbyPackMeta[showAgeGate].categories);
    toast.success("Тохиргоо хадгалагдлаа");
    setShowAgeGate(null);
  };

  const commitDraftPlayer = () => {
    if (players.length >= 20) return;
    appendPlayer(draftPlayerName);
    setDraftPlayerName("");
  };

  const handleStartToGames = () => {
    setPhase("games");
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35 }}
        className="absolute right-4 top-4 z-10 flex items-center gap-2"
      >
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="h-11 w-11 rounded-full bg-secondary/50 backdrop-blur-sm hover:bg-secondary"
          aria-label="Тохиргоо"
        >
          <Link href="/settings">
            <Settings className="h-5 w-5" />
          </Link>
        </Button>
        <ThemeToggle />
      </motion.div>

      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 px-4 pb-2 pt-12 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
        >
          <Sparkles className="h-4 w-4" />
          <span>Монголын №1 party тоглоом</span>
        </motion.div>

        <h1 className="mb-2 text-5xl font-black tracking-tight md:text-6xl">
          <span className="gradient-text">Монго</span>
          <span className="text-foreground">Карт</span>
        </h1>
      </motion.header>

      {phase === "games" && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 mx-auto flex w-full max-w-lg items-center justify-between gap-2 px-4 pb-3 md:max-w-4xl"
        >
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-9 shrink-0 rounded-full border-border/80 bg-secondary/50 text-xs backdrop-blur-sm"
            onClick={() => setPhase("lobby")}
          >
            ← Багцад буцах
          </Button>
          <span className="truncate text-right text-[11px] font-medium text-muted-foreground sm:text-xs">
            Сонгосон:{" "}
            <span className="text-foreground">
              {lobbyPackMeta[activePackId].title}
            </span>
          </span>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {phase === "lobby" ? (
          <motion.div
            key="lobby"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16, transition: { duration: 0.2 } }}
            className="relative z-10 mx-auto w-full max-w-xl flex-1 space-y-4 px-2 pb-32 pt-2 sm:max-w-2xl sm:px-4"
          >
            <div className="rounded-[1.75rem] border border-white/10 bg-zinc-900/75 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-5">
              <div className="mb-4 flex justify-center">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Картын багц
                </span>
              </div>
              <div
                className="grid min-w-0 grid-cols-2 gap-2 sm:gap-3"
                role="radiogroup"
                aria-label="Картын багц"
              >
                {LOBBY_PACK_ORDER.map((id, index) => {
                  const meta = lobbyPackMeta[id];
                  const selected = activePackId === id;
                  return (
                    <motion.button
                      key={id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.06 * index,
                        type: "spring",
                        stiffness: 380,
                        damping: 26,
                      }}
                      whileHover={{
                        scale: 1.03,
                        y: -3,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 18,
                        },
                      }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => pickPack(id)}
                      className={cn(
                        "relative flex min-h-[4.25rem] min-w-0 items-center gap-1.5 rounded-2xl border-2 px-2.5 py-2.5 text-left transition-colors duration-200 sm:min-h-[4.75rem] sm:gap-2.5 sm:px-3 sm:py-3",
                        selected ? meta.selected : meta.idle,
                      )}
                    >
                      <span
                        className="pointer-events-none shrink-0 text-[1.35rem] leading-none drop-shadow-md sm:text-2xl"
                        aria-hidden
                      >
                        {meta.emoji}
                      </span>
                      <span
                        className={cn(
                          "min-w-0 flex-1 whitespace-nowrap text-[11px] font-black leading-none tracking-tight sm:text-sm md:text-[0.95rem]",
                          selected && id === "spicy" && "text-zinc-950",
                        )}
                      >
                        {meta.title}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <div className="flex gap-2">
                  <Input
                    placeholder="Тоглогчийн нэр"
                    value={draftPlayerName}
                    onChange={(e) => setDraftPlayerName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        commitDraftPlayer();
                      }
                    }}
                    className="h-12 min-w-0 flex-1 rounded-xl border-2 border-border/80 bg-background/60 text-base backdrop-blur-sm"
                    aria-label="Нэмэх тоглогчийн нэр"
                  />
                  <Button
                    type="button"
                    size="icon"
                    className="h-12 w-12 shrink-0 rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white shadow-lg shadow-fuchsia-500/25 hover:opacity-95 disabled:opacity-40"
                    disabled={players.length >= 20}
                    onClick={commitDraftPlayer}
                    aria-label="Тоглогчийг жагсаалтад нэмэх"
                  >
                    <Plus className="h-5 w-5" strokeWidth={2.5} />
                  </Button>
                </div>
                {players.length > 0 && (
                  <div className="mt-3 flex max-h-[160px] flex-wrap gap-2 overflow-y-auto overscroll-contain py-0.5 sm:max-h-[200px]">
                    {players.map((player, index) => {
                      const sw = getPlayerSwatch(player.colorIndex);
                      return (
                        <span
                          key={player.id}
                          className={cn(
                            "inline-flex max-w-full items-center gap-0.5 rounded-full border py-0.5 pl-2.5 text-xs font-semibold shadow-sm sm:text-sm",
                            sw.chipActive,
                          )}
                        >
                          <span className="min-w-0 truncate px-0.5">
                            {player.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => removePlayerAt(index)}
                            className={cn(
                              "flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors",
                              "hover:bg-black/15",
                            )}
                            aria-label={`${player.name} — хасах`}
                          >
                            <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                          </button>
                        </span>
                      );
                    })}
                  </div>
                )}
                <div className="mt-4 flex items-center justify-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full"
                    disabled={players.length <= 0}
                    onClick={() => setPlayers(Math.max(0, players.length - 1))}
                    aria-label="Тоглогчийн тоог багасгах"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="min-w-[6rem] text-center text-sm font-bold tabular-nums">
                    {players.length} тоглогч
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full"
                    disabled={players.length >= 20}
                    onClick={() => setPlayers(Math.min(20, players.length + 1))}
                    aria-label="Тоглогчийн тоог нэмэх"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <Button
                type="button"
                variant="secondary"
                className="h-14 flex-1 rounded-2xl border border-border/60 bg-secondary/70 font-semibold text-foreground shadow-sm backdrop-blur-sm hover:bg-secondary"
                onClick={() => setShowHelp(true)}
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                Хэрхэн тоглох
              </Button>
              <Button
                type="button"
                className="h-14 flex-[1.15] gap-2 rounded-2xl bg-gradient-to-r from-lime-400 via-lime-400 to-emerald-400 px-4 text-base font-black text-zinc-950 shadow-lg shadow-lime-500/25 hover:brightness-105"
                onClick={handleStartToGames}
              >
                Эхлэх
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="pt-4">
              <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Тоглоом
              </p>
              <div
                className={cn(
                  !reduceMotion && "lobby-games-marquee",
                  "rounded-xl pb-1 pt-0.5",
                )}
                role="list"
                aria-label="Тоглоомын жагсаалт"
              >
                <div
                  className={cn(
                    reduceMotion
                      ? "flex flex-wrap justify-center gap-2.5"
                      : "lobby-games-marquee-track",
                  )}
                >
                  {(reduceMotion ? [0] : [0, 1]).flatMap((setIdx) =>
                    gameTypes.map((game) => (
                      <motion.button
                        key={`${game.id}-${setIdx}`}
                        type="button"
                        role="listitem"
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelectGame(game.id)}
                        className={cn(
                          "relative flex min-h-[7.25rem] w-[10.25rem] shrink-0 flex-col overflow-hidden rounded-2xl border border-white/15 p-3 text-left shadow-lg",
                          "bg-gradient-to-br",
                          game.color,
                          "transition-shadow hover:shadow-xl hover:shadow-black/25",
                        )}
                      >
                        <div className="pointer-events-none absolute -right-4 -top-2 text-5xl opacity-25">
                          {game.icon}
                        </div>
                        <span className="relative z-10 text-2xl drop-shadow-sm">
                          {game.icon}
                        </span>
                        <span className="relative z-10 mt-1 line-clamp-2 text-sm font-bold leading-tight tracking-tight text-white drop-shadow-sm">
                          {game.name}
                        </span>
                        <span className="relative z-10 mt-auto pt-2 text-[10px] font-medium leading-none text-white/80">
                          {game.playerRange}
                        </span>
                      </motion.button>
                    )),
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="games"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16, transition: { duration: 0.2 } }}
            className="relative z-10 flex-1 px-4 pb-28 pt-2"
          >
            <p className="mx-auto mb-4 max-w-lg text-center text-xs font-medium text-muted-foreground md:max-w-4xl">
              Тоглоом сонгох
            </p>
            <div className="mx-auto grid max-w-lg grid-cols-1 items-stretch gap-4 md:max-w-4xl md:grid-cols-2">
              {gameTypes.map((game, index) => (
                <motion.div
                  key={game.id}
                  className="h-full min-h-0"
                  initial={{ opacity: 0, y: 28, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.08 * index,
                    type: "spring",
                    stiffness: 320,
                    damping: 26,
                  }}
                >
                  <GameCard
                    game={game}
                    onSelect={() => handleSelectGame(game.id)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHelp && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="help-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/65 p-4 pb-8 backdrop-blur-sm sm:items-center"
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-border/80 bg-card p-6 shadow-2xl"
            >
              <h2 id="help-title" className="text-lg font-bold tracking-tight">
                Хэрхэн тоглох вэ?
              </h2>
              <ul className="mt-4 list-inside list-decimal space-y-2 text-sm text-muted-foreground">
                <li>Эхлээд картын багцаа сонгоно.</li>
                <li>
                  Тоглогчийн тоо сонголттой: − / +, chip, нэр + ягаан +.
                  Хоосон байсан ч <strong className="text-foreground">Эхлэх</strong>{" "}
                  дарж болно — тоглоом эхлэхэд нэг «Тоглогч» автоматаар
                  нэмэгдэнэ.
                </li>
                <li>
                  <strong className="text-foreground">Эхлэх</strong> товчийг
                  дарж тоглоомын жагсаалтыг нээнэ.
                </li>
                <li>Тоглоомоо сонгоод тоглолтын дэлгэц рүү орно.</li>
              </ul>
              <Button
                type="button"
                className="mt-6 w-full rounded-xl font-semibold"
                onClick={() => setShowHelp(false)}
              >
                Ойлголоо
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAgeGate && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="age-gate-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/65 p-4 pb-8 backdrop-blur-sm sm:items-center"
            onClick={() => setShowAgeGate(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-3xl border border-border/80 bg-card p-6 shadow-2xl"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/15 text-3xl">
                🔞
              </div>
              <h2
                id="age-gate-title"
                className="text-center text-lg font-bold tracking-tight"
              >
                Энэ багц 18+ контент агуулна
              </h2>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Үргэлжлүүлэхийн өмнө та 18 нас хүрсэн гэдгээ баталгаажуулна уу.
                Энэ сонголтыг та{" "}
                <Link
                  href="/settings"
                  className="font-semibold text-foreground hover:underline"
                >
                  Тохиргоо
                </Link>
                -ноос хэдийд ч өөрчилж болно.
              </p>
              <div className="mt-5 flex flex-col gap-2">
                <Button
                  type="button"
                  className="w-full rounded-xl font-bold"
                  onClick={handleConfirmAge}
                >
                  Би 18+ нас хүрсэн
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full rounded-xl"
                  onClick={() => setShowAgeGate(null)}
                >
                  Болих
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AdBanner position="bottom" />
    </div>
  );
}
