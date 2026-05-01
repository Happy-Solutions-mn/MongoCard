import type { Card, GameType } from "./game-data-types";
import { truthOrDareCards } from "./cards/truth-or-dare";
import { drinkOrPunishCards } from "./cards/drink-or-punish";
import { neverHaveIEverCards } from "./cards/never-have-i-ever";
import { wouldYouRatherCards } from "./cards/would-you-rather";
import { hotSeatCards } from "./cards/hot-seat";

export type {
  Card,
  GameData,
  GameType,
  TruthOrDareKind,
} from "./game-data-types";
export { TRUTH_OR_DARE_ID, cardMatchesPlayMode } from "./game-data-types";

export const gameTypes: GameType[] = [
  {
    id: "truth-or-dare",
    name: "Үнэн эсвэл зориг",
    description:
      "Сонгодог тоглоом: үнэнийг хэлнэ эсвэл зоригтой даалгавар биелүүлнэ.",
    playerRange: "2–20 тоглогч",
    icon: "🎭",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "drink-or-punish",
    name: "Уу эсвэл шийтгүүл",
    description: "Даалгавар биелүүлэхгүй бол уух ёстой. 18+ тоглоом.",
    playerRange: "3–15 тоглогч",
    icon: "🍺",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "never-have-i-ever",
    name: "Би хэзээ ч…",
    description: "Хийж байсан бол хуруугаа буулгана. Эвлүүлэгч тоглоом.",
    playerRange: "4–20 тоглогч",
    icon: "✋",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "would-you-rather",
    name: "Аль нь дээр вэ?",
    description: "Хоёр сонголтын аль нэгийг сонгоно. Хэцүү шийдвэрүүд!",
    playerRange: "2–20 тоглогч",
    icon: "🤔",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "hot-seat",
    name: "Халуун суудал",
    description: "Нэг хүн асуултанд хариулна, бусад нь шүүмжилнэ.",
    playerRange: "4–12 тоглогч",
    icon: "🔥",
    color: "from-red-500 to-pink-600",
  },
];

export const gameCards: Record<string, Card[]> = {
  "truth-or-dare": truthOrDareCards,
  "drink-or-punish": drinkOrPunishCards,
  "never-have-i-ever": neverHaveIEverCards,
  "would-you-rather": wouldYouRatherCards,
  "hot-seat": hotSeatCards,
};

/** Карт дээр гарч ирэх богино шошго */
export const categoryLabels: Record<Card["category"], string> = {
  light: "Зөөлөн",
  medium: "Дунд",
  hot: "Халуун",
};

/** Нүүр + тохируулга — «түвшин» биш, контентын багц */
export const deckGroupPresentation: Record<
  Card["category"],
  { title: string; subtitle: string }
> = {
  light: {
    title: "Нийтлэг",
    subtitle: "Найз нөхөд, гэр бүл — эвлүүлэгт тохиромжтой",
  },
  medium: {
    title: "Сэтгэл хөдөлгөм",
    subtitle: "Илүү дөхөмтэй асуулт, даалгавар",
  },
  hot: {
    title: "Халуун",
    subtitle: "Насанд хүрэгчдэд — ихэвчлэн хосуудад",
  },
};

export const DECK_GROUP_ORDER = ["light", "medium", "hot"] as const;

export const deckGroupSelectableClasses: Record<
  Card["category"],
  { idle: string; selected: string }
> = {
  light: {
    idle: "border-emerald-500/50 text-emerald-600 hover:bg-emerald-500/10 dark:text-emerald-400",
    selected:
      "border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-500/30",
  },
  medium: {
    idle: "border-amber-500/50 text-amber-600 hover:bg-amber-500/10 dark:text-amber-400",
    selected:
      "border-amber-500 bg-amber-500 text-white shadow-lg shadow-amber-500/30",
  },
  hot: {
    idle: "border-rose-500/50 text-rose-600 hover:bg-rose-500/10 dark:text-rose-400",
    selected:
      "border-rose-500 bg-rose-500 text-white shadow-lg shadow-rose-500/30",
  },
};

/** Нүүрний 2×2 багц — жишээ загварын удиртай, МонгоКартын логикоор */
export type HomeLobbyPackId = "popular" | "extreme" | "couples" | "spicy";

export const LOBBY_PACK_ORDER: HomeLobbyPackId[] = [
  "popular",
  "extreme",
  "couples",
  "spicy",
];

export const lobbyPackMeta: Record<
  HomeLobbyPackId,
  {
    title: string;
    emoji: string;
    categories: Card["category"][];
    /** Энэ багц 18+ үү (ageConfirmed шаардаж байгаа эсэх) */
    requiresAgeConfirm: boolean;
    idle: string;
    selected: string;
  }
> = {
  popular: {
    title: "Нийтлэг",
    emoji: "🎈",
    categories: ["light"],
    requiresAgeConfirm: false,
    idle: "border-cyan-500/40 bg-gradient-to-br from-cyan-950/80 via-zinc-900/85 to-zinc-950 text-cyan-50 hover:border-cyan-400/55",
    selected:
      "border-cyan-300 bg-gradient-to-br from-cyan-500 to-cyan-800 text-white shadow-xl shadow-cyan-500/35 ring-2 ring-cyan-200/30",
  },
  extreme: {
    title: "Сонирхолтой",
    emoji: "⚡",
    categories: ["medium", "hot"],
    requiresAgeConfirm: true,
    idle: "border-violet-500/40 bg-gradient-to-br from-violet-950/80 via-zinc-900/85 to-zinc-950 text-violet-100 hover:border-violet-400/55",
    selected:
      "border-violet-300 bg-gradient-to-br from-violet-600 to-purple-950 text-white shadow-xl shadow-violet-500/35 ring-2 ring-violet-200/30",
  },
  couples: {
    title: "Хосуудад",
    emoji: "💋",
    categories: ["hot"],
    requiresAgeConfirm: true,
    idle: "border-fuchsia-500/40 bg-gradient-to-br from-fuchsia-950/75 via-zinc-900/85 to-zinc-950 text-fuchsia-100 hover:border-fuchsia-400/55",
    selected:
      "border-fuchsia-300 bg-gradient-to-br from-fuchsia-600 to-pink-900 text-white shadow-xl shadow-fuchsia-500/35 ring-2 ring-pink-200/25",
  },
  spicy: {
    title: "Сэтгэл хөдөлгөм",
    emoji: "🌶️",
    categories: ["medium"],
    requiresAgeConfirm: false,
    idle: "border-lime-500/40 bg-gradient-to-br from-lime-950/60 via-zinc-900/85 to-zinc-950 text-lime-100 hover:border-lime-400/55",
    selected:
      "border-lime-300 bg-gradient-to-br from-lime-400 to-emerald-800 text-zinc-950 shadow-xl shadow-lime-400/35 ring-2 ring-lime-200/40",
  },
};

function categoriesKey(cats: Card["category"][]) {
  return [...cats].sort().join(",");
}

export function lobbyPackIdFromSelection(
  selected: Card["category"][],
): HomeLobbyPackId {
  const key = categoriesKey(selected);
  for (const id of LOBBY_PACK_ORDER) {
    if (categoriesKey(lobbyPackMeta[id].categories) === key) return id;
  }
  return "popular";
}

export const categoryColors: Record<Card["category"], string> = {
  light: "bg-emerald-500",
  medium: "bg-amber-500",
  hot: "bg-rose-500",
};
