"use client";

import { useCallback, useEffect, useRef } from "react";
import { useGameStore } from "@/lib/game-store";

type FeedbackKind = "flip" | "next" | "skip" | "win" | "tap";

/**
 * Хөнгөн дуу + чичиргээ үзүүлэх хук.
 * - Аудио файл шаардахгүй: WebAudio API-р тон тоглуулна.
 * - Хэрэглэгчийн тохиргоог үндэслэн идэвхгүй болгоно.
 */
export function useFeedback() {
  const soundEnabled = useGameStore((s) => s.soundEnabled);
  const hapticsEnabled = useGameStore((s) => s.hapticsEnabled);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    return () => {
      ctxRef.current?.close().catch(() => undefined);
      ctxRef.current = null;
    };
  }, []);

  const ensureCtx = useCallback((): AudioContext | null => {
    if (typeof window === "undefined") return null;
    const W = window as typeof window & {
      AudioContext?: typeof AudioContext;
      webkitAudioContext?: typeof AudioContext;
    };
    const Ctx = W.AudioContext ?? W.webkitAudioContext;
    if (!Ctx) return null;
    if (!ctxRef.current) {
      ctxRef.current = new Ctx();
    }
    return ctxRef.current;
  }, []);

  const playTone = useCallback(
    (
      frequency: number,
      durationMs: number,
      type: OscillatorType = "sine",
      volume = 0.06,
    ) => {
      if (!soundEnabled) return;
      const ctx = ensureCtx();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = frequency;
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + durationMs / 1000,
      );
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + durationMs / 1000);
    },
    [ensureCtx, soundEnabled],
  );

  const vibrate = useCallback(
    (pattern: number | number[]) => {
      if (!hapticsEnabled) return;
      if (typeof navigator === "undefined") return;
      if (typeof navigator.vibrate !== "function") return;
      try {
        navigator.vibrate(pattern);
      } catch {
        // зарим браузер /разраб тохиргоогоор error өгөх
      }
    },
    [hapticsEnabled],
  );

  const trigger = useCallback(
    (kind: FeedbackKind) => {
      switch (kind) {
        case "flip":
          playTone(520, 140, "triangle", 0.08);
          vibrate(20);
          break;
        case "next":
          playTone(660, 110, "sine", 0.06);
          vibrate(15);
          break;
        case "skip":
          playTone(380, 90, "square", 0.04);
          vibrate([10, 30, 10]);
          break;
        case "win":
          playTone(660, 120, "triangle", 0.08);
          setTimeout(() => playTone(880, 160, "triangle", 0.08), 130);
          setTimeout(() => playTone(1040, 240, "triangle", 0.08), 290);
          vibrate([40, 60, 40]);
          break;
        case "tap":
          playTone(720, 60, "sine", 0.04);
          vibrate(10);
          break;
      }
    },
    [playTone, vibrate],
  );

  return { trigger, vibrate, playTone };
}
