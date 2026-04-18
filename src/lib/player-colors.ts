/**
 * Тоглогч бүрт системээс (индексээр) автоматаар оноогдох өнгө — UI-д Tailwind class.
 */

export type PlayerColorSwatch = {
  /** Ээлжийн том badge */
  badge: string;
  /** Тоглолтын дээрх жижиг chip (идэвхгүй) */
  chip: string;
  /** Одоогийн ээлжийн chip */
  chipActive: string;
  /** Жижиг цэг */
  dot: string;
  /** Тоглолтын дэлгэцийн дэвсгэрийн гэрэл — тоглогчийн өнгөтэй ойртуулна */
  ambientLeft: string;
  ambientRight: string;
  /** Нээсэн картын нүүр — тоглогчийн өнгөтэй ижил палитр */
  cardFace: string;
  /** Хаалттай карт («Карт ухах», нээхээс өмнөх ар) — ээлжийн өнгөтэй тааруулна */
  deckSurface: string;
};

const SWATCHES: PlayerColorSwatch[] = [
  {
    badge:
      "bg-violet-600 text-white shadow-lg shadow-violet-600/30 ring-2 ring-white/25",
    chip: "border-violet-500/35 bg-violet-500/10 text-violet-950 dark:text-violet-100",
    chipActive:
      "border-violet-400 bg-violet-600 text-white shadow-md shadow-violet-600/25",
    dot: "bg-violet-500",
    ambientLeft: "bg-violet-500/22",
    ambientRight: "bg-violet-400/14",
    cardFace:
      "bg-gradient-to-br from-violet-500 via-violet-700 to-violet-950 text-white ring-1 ring-inset ring-white/20 shadow-2xl",
    deckSurface:
      "bg-gradient-to-br from-violet-500 via-violet-600 to-violet-900 shadow-2xl",
  },
  {
    badge:
      "bg-sky-600 text-white shadow-lg shadow-sky-600/30 ring-2 ring-white/25",
    chip: "border-sky-500/35 bg-sky-500/10 text-sky-950 dark:text-sky-100",
    chipActive:
      "border-sky-400 bg-sky-600 text-white shadow-md shadow-sky-600/25",
    dot: "bg-sky-500",
    ambientLeft: "bg-sky-500/22",
    ambientRight: "bg-sky-400/14",
    cardFace:
      "bg-gradient-to-br from-sky-500 via-sky-700 to-sky-950 text-white ring-1 ring-inset ring-white/20 shadow-2xl",
    deckSurface:
      "bg-gradient-to-br from-sky-500 via-sky-600 to-sky-900 shadow-2xl",
  },
  {
    badge:
      "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-2 ring-white/25",
    chip: "border-emerald-500/35 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100",
    chipActive:
      "border-emerald-400 bg-emerald-600 text-white shadow-md shadow-emerald-600/25",
    dot: "bg-emerald-500",
    ambientLeft: "bg-emerald-500/22",
    ambientRight: "bg-emerald-400/14",
    cardFace:
      "bg-gradient-to-br from-emerald-500 via-emerald-700 to-emerald-950 text-white ring-1 ring-inset ring-white/20 shadow-2xl",
    deckSurface:
      "bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-900 shadow-2xl",
  },
  {
    badge:
      "bg-amber-600 text-white shadow-lg shadow-amber-600/30 ring-2 ring-white/25",
    chip: "border-amber-500/35 bg-amber-500/10 text-amber-950 dark:text-amber-100",
    chipActive:
      "border-amber-400 bg-amber-600 text-white shadow-md shadow-amber-600/25",
    dot: "bg-amber-500",
    ambientLeft: "bg-amber-500/22",
    ambientRight: "bg-amber-400/14",
    cardFace:
      "bg-gradient-to-br from-amber-500 via-amber-700 to-amber-950 text-white ring-1 ring-inset ring-white/20 shadow-2xl",
    deckSurface:
      "bg-gradient-to-br from-amber-500 via-amber-600 to-amber-900 shadow-2xl",
  },
  {
    badge:
      "bg-rose-600 text-white shadow-lg shadow-rose-600/30 ring-2 ring-white/25",
    chip: "border-rose-500/35 bg-rose-500/10 text-rose-950 dark:text-rose-100",
    chipActive:
      "border-rose-400 bg-rose-600 text-white shadow-md shadow-rose-600/25",
    dot: "bg-rose-500",
    ambientLeft: "bg-rose-500/22",
    ambientRight: "bg-rose-400/14",
    cardFace:
      "bg-gradient-to-br from-rose-500 via-rose-700 to-rose-950 text-white ring-1 ring-inset ring-white/20 shadow-2xl",
    deckSurface:
      "bg-gradient-to-br from-rose-500 via-rose-600 to-rose-900 shadow-2xl",
  },
  {
    badge:
      "bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-600/30 ring-2 ring-white/25",
    chip: "border-fuchsia-500/35 bg-fuchsia-500/10 text-fuchsia-950 dark:text-fuchsia-100",
    chipActive:
      "border-fuchsia-400 bg-fuchsia-600 text-white shadow-md shadow-fuchsia-600/25",
    dot: "bg-fuchsia-500",
    ambientLeft: "bg-fuchsia-500/22",
    ambientRight: "bg-fuchsia-400/14",
    cardFace:
      "bg-gradient-to-br from-fuchsia-500 via-fuchsia-700 to-fuchsia-950 text-white ring-1 ring-inset ring-white/20 shadow-2xl",
    deckSurface:
      "bg-gradient-to-br from-fuchsia-500 via-fuchsia-600 to-fuchsia-900 shadow-2xl",
  },
  {
    badge:
      "bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-2 ring-white/25",
    chip: "border-cyan-500/35 bg-cyan-500/10 text-cyan-950 dark:text-cyan-100",
    chipActive:
      "border-cyan-400 bg-cyan-600 text-white shadow-md shadow-cyan-600/25",
    dot: "bg-cyan-500",
    ambientLeft: "bg-cyan-500/22",
    ambientRight: "bg-cyan-400/14",
    cardFace:
      "bg-gradient-to-br from-cyan-500 via-cyan-700 to-cyan-950 text-white ring-1 ring-inset ring-white/20 shadow-2xl",
    deckSurface:
      "bg-gradient-to-br from-cyan-500 via-cyan-600 to-cyan-900 shadow-2xl",
  },
  {
    badge:
      "bg-orange-600 text-white shadow-lg shadow-orange-600/30 ring-2 ring-white/25",
    chip: "border-orange-500/35 bg-orange-500/10 text-orange-950 dark:text-orange-100",
    chipActive:
      "border-orange-400 bg-orange-600 text-white shadow-md shadow-orange-600/25",
    dot: "bg-orange-500",
    ambientLeft: "bg-orange-500/22",
    ambientRight: "bg-orange-400/14",
    cardFace:
      "bg-gradient-to-br from-orange-500 via-orange-700 to-orange-950 text-white ring-1 ring-inset ring-white/20 shadow-2xl",
    deckSurface:
      "bg-gradient-to-br from-orange-500 via-orange-600 to-orange-900 shadow-2xl",
  },
  {
    badge:
      "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-white/25",
    chip: "border-indigo-500/35 bg-indigo-500/10 text-indigo-950 dark:text-indigo-100",
    chipActive:
      "border-indigo-400 bg-indigo-600 text-white shadow-md shadow-indigo-600/25",
    dot: "bg-indigo-500",
    ambientLeft: "bg-indigo-500/22",
    ambientRight: "bg-indigo-400/14",
    cardFace:
      "bg-gradient-to-br from-indigo-500 via-indigo-700 to-indigo-950 text-white ring-1 ring-inset ring-white/20 shadow-2xl",
    deckSurface:
      "bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-900 shadow-2xl",
  },
  {
    badge:
      "bg-teal-600 text-white shadow-lg shadow-teal-600/30 ring-2 ring-white/25",
    chip: "border-teal-500/35 bg-teal-500/10 text-teal-950 dark:text-teal-100",
    chipActive:
      "border-teal-400 bg-teal-600 text-white shadow-md shadow-teal-600/25",
    dot: "bg-teal-500",
    ambientLeft: "bg-teal-500/22",
    ambientRight: "bg-teal-400/14",
    cardFace:
      "bg-gradient-to-br from-teal-500 via-teal-700 to-teal-950 text-white ring-1 ring-inset ring-white/20 shadow-2xl",
    deckSurface:
      "bg-gradient-to-br from-teal-500 via-teal-600 to-teal-900 shadow-2xl",
  },
  {
    badge:
      "bg-pink-600 text-white shadow-lg shadow-pink-600/30 ring-2 ring-white/25",
    chip: "border-pink-500/35 bg-pink-500/10 text-pink-950 dark:text-pink-100",
    chipActive:
      "border-pink-400 bg-pink-600 text-white shadow-md shadow-pink-600/25",
    dot: "bg-pink-500",
    ambientLeft: "bg-pink-500/22",
    ambientRight: "bg-pink-400/14",
    cardFace:
      "bg-gradient-to-br from-pink-500 via-pink-700 to-pink-950 text-white ring-1 ring-inset ring-white/20 shadow-2xl",
    deckSurface:
      "bg-gradient-to-br from-pink-500 via-pink-600 to-pink-900 shadow-2xl",
  },
  {
    badge:
      "bg-lime-700 text-white shadow-lg shadow-lime-600/30 ring-2 ring-white/25",
    chip: "border-lime-600/35 bg-lime-500/15 text-lime-950 dark:text-lime-100",
    chipActive:
      "border-lime-500 bg-lime-700 text-white shadow-md shadow-lime-600/25",
    dot: "bg-lime-600",
    ambientLeft: "bg-lime-600/22",
    ambientRight: "bg-lime-500/14",
    cardFace:
      "bg-gradient-to-br from-lime-500 via-lime-700 to-lime-950 text-white ring-1 ring-inset ring-white/20 shadow-2xl",
    deckSurface:
      "bg-gradient-to-br from-lime-500 via-lime-600 to-lime-900 shadow-2xl",
  },
];

export function getPlayerSwatch(colorIndex: number): PlayerColorSwatch {
  const i = ((colorIndex % SWATCHES.length) + SWATCHES.length) % SWATCHES.length;
  return SWATCHES[i]!;
}
