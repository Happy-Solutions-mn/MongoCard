"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Vibrate,
  ShieldCheck,
  Plus,
  Trash2,
  X,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGameStore } from "@/lib/game-store";
import { gameTypes, categoryLabels } from "@/lib/game-data";
import type { Card, TruthOrDareKind } from "@/lib/game-data";
import { cn } from "@/lib/utils";

const CATEGORY_ORDER: Card["category"][] = ["light", "medium", "hot"];

export function SettingsView() {
  const {
    soundEnabled,
    setSoundEnabled,
    hapticsEnabled,
    setHapticsEnabled,
    ageConfirmed,
    setAgeConfirmed,
    customCards,
    addCustomCard,
    removeCustomCard,
    clearCustomCards,
  } = useGameStore();

  const [draftGameId, setDraftGameId] = useState(gameTypes[0]?.id ?? "");
  const [draftCategory, setDraftCategory] = useState<Card["category"]>("light");
  const [draftTruthOrDare, setDraftTruthOrDare] =
    useState<TruthOrDareKind>("truth");
  const [draftText, setDraftText] = useState("");

  const isTruthOrDare = draftGameId === "truth-or-dare";

  const handleAddCustom = () => {
    const text = draftText.trim();
    if (!text) {
      toast.error("Карт хоосон байж болохгүй");
      return;
    }
    if (text.length > 240) {
      toast.error("Хэт урт байна (240+ тэмдэгт)");
      return;
    }
    addCustomCard({
      gameId: draftGameId,
      text,
      category: draftCategory,
      ...(isTruthOrDare ? { truthOrDare: draftTruthOrDare } : {}),
    });
    setDraftText("");
    toast.success("Карт нэмэгдлээ");
  };

  const cardsForGame = (gameId: string) =>
    customCards.filter((c) => c.gameId === gameId);

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
      </div>

      <header className="relative z-10 flex items-center gap-3 px-4 py-5">
        <Button asChild variant="ghost" size="icon" className="rounded-full">
          <Link href="/" aria-label="Нүүр">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Тохиргоо</h1>
      </header>

      <div className="relative z-10 mx-auto w-full max-w-2xl space-y-6 px-4 pb-24">
        <section className="rounded-3xl border border-border/60 bg-card/80 p-5 shadow-lg backdrop-blur-sm">
          <h2 className="mb-4 text-base font-semibold">Аудио ба чичиргээ</h2>
          <div className="space-y-4">
            <SettingRow
              icon={
                soundEnabled ? (
                  <Volume2 className="h-5 w-5" />
                ) : (
                  <VolumeX className="h-5 w-5" />
                )
              }
              title="Дуу"
              description="Карт эргэх, шилжих үед хөнгөн дуу гаргана"
            >
              <Switch
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
                aria-label="Дуу идэвхжүүлэх"
              />
            </SettingRow>

            <SettingRow
              icon={<Vibrate className="h-5 w-5" />}
              title="Чичиргээ"
              description="Дэмжсэн утсан дээр haptic feedback"
            >
              <Switch
                checked={hapticsEnabled}
                onCheckedChange={setHapticsEnabled}
                aria-label="Чичиргээ идэвхжүүлэх"
              />
            </SettingRow>
          </div>
        </section>

        <section className="rounded-3xl border border-border/60 bg-card/80 p-5 shadow-lg backdrop-blur-sm">
          <h2 className="mb-4 text-base font-semibold">Контентын тохиргоо</h2>
          <SettingRow
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Би 18+ нас хүрсэн"
            description="«Сонирхолтой», «Хосуудад» багцыг харуулна"
          >
            <Switch
              checked={ageConfirmed}
              onCheckedChange={setAgeConfirmed}
              aria-label="18+ баталгаа"
            />
          </SettingRow>
        </section>

        <section className="rounded-3xl border border-border/60 bg-card/80 p-5 shadow-lg backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold">Өөрийн карт нэмэх</h2>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
              Шинэ
            </span>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">
            Та өөрийн асуулт, даалгаврыг тоглоомд нэмж, найзуудтайгаа тоглож
            болно. Бүх карт зөвхөн таны утсанд хадгалагдана.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <label
                htmlFor="custom-game"
                className="text-xs font-semibold text-muted-foreground"
              >
                Тоглоом
              </label>
              <Select
                value={draftGameId}
                onValueChange={(v) => setDraftGameId(v)}
              >
                <SelectTrigger id="custom-game" className="rounded-xl">
                  <SelectValue placeholder="Тоглоом сонгох" />
                </SelectTrigger>
                <SelectContent>
                  {gameTypes.map((g) => (
                    <SelectItem key={g.id} value={g.id}>
                      <span className="mr-2">{g.icon}</span>
                      {g.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="custom-category"
                className="text-xs font-semibold text-muted-foreground"
              >
                Багц
              </label>
              <Select
                value={draftCategory}
                onValueChange={(v) =>
                  setDraftCategory(v as Card["category"])
                }
              >
                <SelectTrigger id="custom-category" className="rounded-xl">
                  <SelectValue placeholder="Багц сонгох" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_ORDER.map((c) => (
                    <SelectItem key={c} value={c}>
                      {categoryLabels[c]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {isTruthOrDare && (
              <div className="space-y-1 sm:col-span-2">
                <span className="text-xs font-semibold text-muted-foreground">
                  Картын төрөл
                </span>
                <div className="flex gap-2">
                  {(["truth", "dare"] as TruthOrDareKind[]).map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setDraftTruthOrDare(k)}
                      className={cn(
                        "flex-1 rounded-xl border-2 px-3 py-2 text-sm font-semibold transition",
                        draftTruthOrDare === k
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-secondary/40 hover:border-primary",
                      )}
                    >
                      {k === "truth" ? "Үнэн" : "Зориг"}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Textarea
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            placeholder="Картын асуулт эсвэл даалгавар…"
            className="mt-3 min-h-[88px] rounded-2xl"
            maxLength={240}
            aria-label="Картын текст"
          />
          <div className="mt-1 text-right text-[11px] text-muted-foreground">
            {draftText.length}/240
          </div>

          <Button
            type="button"
            className="mt-3 w-full rounded-2xl"
            onClick={handleAddCustom}
          >
            <Plus className="mr-2 h-4 w-4" />
            Карт нэмэх
          </Button>

          <div className="mt-6 space-y-3">
            {gameTypes.map((g) => {
              const items = cardsForGame(g.id);
              if (items.length === 0) return null;
              return (
                <div
                  key={g.id}
                  className="rounded-2xl border border-border/50 bg-secondary/30 p-3"
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      <span aria-hidden>{g.icon}</span>
                      {g.name}
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                        {items.length}
                      </span>
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => clearCustomCards(g.id)}
                      className="h-7 rounded-full text-xs text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="mr-1 h-3 w-3" />
                      Бүх карт устгах
                    </Button>
                  </div>
                  <ul className="space-y-1.5">
                    <AnimatePresence initial={false}>
                      {items.map((c) => (
                        <motion.li
                          key={c.id}
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 12 }}
                          className="flex items-start gap-2 rounded-xl bg-background/60 p-2.5 text-sm"
                        >
                          <span
                            className={cn(
                              "mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold",
                              c.category === "light" &&
                                "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
                              c.category === "medium" &&
                                "bg-amber-500/15 text-amber-600 dark:text-amber-400",
                              c.category === "hot" &&
                                "bg-rose-500/15 text-rose-600 dark:text-rose-400",
                            )}
                          >
                            {categoryLabels[c.category]}
                            {c.truthOrDare ? (
                              <span className="opacity-70">
                                · {c.truthOrDare === "truth" ? "Үнэн" : "Зориг"}
                              </span>
                            ) : null}
                          </span>
                          <span className="min-w-0 flex-1 break-words leading-snug">
                            {c.text}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeCustomCard(c.id)}
                            aria-label="Карт устгах"
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                </div>
              );
            })}

            {customCards.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border/60 py-6 text-center text-sm text-muted-foreground">
                <Sparkles className="h-5 w-5 text-primary" />
                Хараахан өөрийн карт нэмээгүй байна.
              </div>
            )}
          </div>
        </section>

        <footer className="pt-2 text-center text-xs text-muted-foreground">
          <Link href="/about" className="hover:text-foreground">
            Бидний тухай
          </Link>
          <span className="mx-2">•</span>
          <Link href="/privacy" className="hover:text-foreground">
            Нууцлал
          </Link>
          <span className="mx-2">•</span>
          <Link href="/terms" className="hover:text-foreground">
            Үйлчилгээний нөхцөл
          </Link>
          <span className="mx-2">•</span>
          <Link href="/advertise" className="hover:text-foreground">
            Зар сурталчилгаа
          </Link>
        </footer>
      </div>
    </main>
  );
}

interface SettingRowProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
}

function SettingRow({ icon, title, description, children }: SettingRowProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{title}</p>
        {description ? (
          <p className="text-xs text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}
