import { create } from "zustand";
import {
  type Card,
  type TruthOrDareKind,
  cardMatchesPlayMode,
  gameCards,
} from "./game-data";

export interface Player {
  id: string;
  name: string;
  /** `getPlayerSwatch(colorIndex)` — систем автоматаар онооно */
  colorIndex: number;
}

interface GameState {
  // Game setup
  selectedGameId: string | null;
  players: Player[];
  selectedCategories: Card["category"][];
  /** Зөвхөн truth-or-dare — ээлж бүр карт авахаас өмнө */
  truthOrDareSide: TruthOrDareKind | null;

  // Game progress
  currentPlayerIndex: number;
  usedCardIds: Set<string>;
  currentCard: Card | null;
  isCardRevealed: boolean;
  totalCardsInDeck: number;
  
  // Actions
  setSelectedGame: (gameId: string) => void;
  setPlayers: (count: number) => void;
  updatePlayerName: (index: number, name: string) => void;
  /** Нүүр — нэр (хоосон бол «Тоглогч N») + дарж нэмнэ */
  appendPlayer: (name: string) => void;
  /** Нүүр — chip-ээс тоглогчийг хасна (хамгийн багадаа 2 үлдэнэ) */
  removePlayerAt: (index: number) => void;
  /** Нэг эсвэл хэд хэдэн картын ангилал (ж: «Дунд ба халуун» = medium + hot) */
  setSelectedCategories: (categories: Card["category"][]) => void;
  /** Тоглоомын дунд багц солих — шинэ багцын карт, ашигласан картууд цэвэрлэгдэнэ */
  switchDeckDuringGame: (categories: Card["category"][]) => void;
  setTruthOrDareSide: (side: TruthOrDareKind) => void;
  startGame: () => void;
  drawCard: () => void;
  revealCard: () => void;
  nextPlayer: () => void;
  resetGame: () => void;
  getCardsPlayed: () => number;
  isGameOver: () => boolean;
}

export const useGameStore = create<GameState>((set, get) => ({
  selectedGameId: null,
  players: [],
  selectedCategories: ["light"],
  truthOrDareSide: null,
  currentPlayerIndex: 0,
  usedCardIds: new Set(),
  currentCard: null,
  isCardRevealed: false,
  totalCardsInDeck: 0,

  setSelectedGame: (gameId) =>
    set({ selectedGameId: gameId, truthOrDareSide: null }),

  setPlayers: (count) => {
    const prev = get().players;
    const players: Player[] = [];
    for (let i = 0; i < count; i++) {
      const kept = prev[i];
      players.push({
        id: kept?.id ?? `player-${i}`,
        name: kept?.name ?? `Тоглогч ${i + 1}`,
        colorIndex: i,
      });
    }
    set({ players });
  },

  updatePlayerName: (index, name) => {
    const players = [...get().players];
    if (players[index]) {
      players[index].name = name || `Тоглогч ${index + 1}`;
    }
    set({ players });
  },

  appendPlayer: (name) => {
    const prev = get().players;
    if (prev.length >= 20) return;
    const trimmed = name.trim();
    const displayName = trimmed || `Тоглогч ${prev.length + 1}`;
    const next: Player = {
      id: `player-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      name: displayName,
      colorIndex: prev.length,
    };
    set({ players: [...prev, next] });
  },

  removePlayerAt: (index) => {
    const prev = get().players;
    if (index < 0 || index >= prev.length) return;
    const players = prev
      .filter((_, i) => i !== index)
      .map((p, i) => ({ ...p, colorIndex: i }));
    set({ players });
  },

  setSelectedCategories: (categories) => {
    const uniq = [...new Set(categories)].filter(
      (c): c is Card["category"] =>
        c === "light" || c === "medium" || c === "hot",
    );
    set({
      selectedCategories: uniq.length > 0 ? uniq : (["light"] as const),
    });
  },

  switchDeckDuringGame: (categories) => {
    const uniq = [...new Set(categories)].filter(
      (c): c is Card["category"] =>
        c === "light" || c === "medium" || c === "hot",
    );
    const nextCats =
      uniq.length > 0 ? uniq : (["light"] as Card["category"][]);
    const selectedGameId = get().selectedGameId;
    if (!selectedGameId) {
      set({ selectedCategories: nextCats });
      return;
    }
    const allCards = gameCards[selectedGameId] || [];
    const filtered = allCards.filter((card) =>
      nextCats.includes(card.category),
    );
    set({
      selectedCategories: nextCats,
      usedCardIds: new Set(),
      currentCard: null,
      isCardRevealed: false,
      truthOrDareSide: null,
      totalCardsInDeck: filtered.length,
    });
  },

  setTruthOrDareSide: (side) => {
    set({ truthOrDareSide: side });
    if (get().selectedGameId === "truth-or-dare") {
      get().drawCard();
    }
  },

  startGame: () => {
    const { selectedGameId, selectedCategories } = get();
    if (!selectedGameId) return;

    const prevPlayers = get().players;
    const players =
      prevPlayers.length === 0
        ? [
            {
              id: `player-${Date.now()}`,
              name: "Тоглогч",
              colorIndex: 0,
            },
          ]
        : prevPlayers;

    const allCards = gameCards[selectedGameId] || [];
    const filteredCards = allCards.filter((card) =>
      selectedCategories.includes(card.category),
    );

    set({
      players,
      currentPlayerIndex: 0,
      usedCardIds: new Set(),
      currentCard: null,
      isCardRevealed: false,
      truthOrDareSide: null,
      totalCardsInDeck: filteredCards.length,
    });
  },

  drawCard: () => {
    const {
      selectedGameId,
      selectedCategories,
      usedCardIds,
      truthOrDareSide,
    } = get();
    if (!selectedGameId) return;

    const allCards = gameCards[selectedGameId] || [];
    const availableCards = allCards.filter(
      (card) =>
        selectedCategories.includes(card.category) &&
        !usedCardIds.has(card.id) &&
        cardMatchesPlayMode(card, selectedGameId, truthOrDareSide),
    );

    if (availableCards.length === 0) return;

    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const selectedCard = availableCards[randomIndex];

    const newUsedCardIds = new Set(usedCardIds);
    newUsedCardIds.add(selectedCard.id);

    set({
      currentCard: selectedCard,
      /** TOD: «Карт ухах» алхамгүй — шууд асуулт харуулна */
      isCardRevealed: selectedGameId === "truth-or-dare",
      usedCardIds: newUsedCardIds,
    });
  },

  revealCard: () => set({ isCardRevealed: true }),

  nextPlayer: () => {
    const { currentPlayerIndex, players, selectedGameId } = get();
    if (players.length === 0) {
      set({
        currentPlayerIndex: 0,
        currentCard: null,
        isCardRevealed: false,
        ...(selectedGameId === "truth-or-dare" ? { truthOrDareSide: null } : {}),
      });
      return;
    }
    const nextIndex = (currentPlayerIndex + 1) % players.length;
    set({
      currentPlayerIndex: nextIndex,
      currentCard: null,
      isCardRevealed: false,
      ...(selectedGameId === "truth-or-dare" ? { truthOrDareSide: null } : {}),
    });
  },

  resetGame: () =>
    set({
      selectedGameId: null,
      players: [],
      selectedCategories: ["light"],
      truthOrDareSide: null,
      currentPlayerIndex: 0,
      usedCardIds: new Set(),
      currentCard: null,
      isCardRevealed: false,
      totalCardsInDeck: 0,
    }),

  getCardsPlayed: () => get().usedCardIds.size,

  isGameOver: () => {
    const { selectedGameId, selectedCategories, usedCardIds } = get();
    if (!selectedGameId) return false;

    const allCards = gameCards[selectedGameId] || [];
    const availableCards = allCards.filter(
      (card) =>
        selectedCategories.includes(card.category) &&
        !usedCardIds.has(card.id)
    );

    return availableCards.length === 0;
  },
}));
