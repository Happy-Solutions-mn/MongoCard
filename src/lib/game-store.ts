import { create } from "zustand";
import { Card, gameCards } from "./game-data";

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
  /** Зөвхөн нэг түвшин (radio) */
  selectCategoryLevel: (category: Card["category"]) => void;
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
  selectedCategories: ["medium"],
  currentPlayerIndex: 0,
  usedCardIds: new Set(),
  currentCard: null,
  isCardRevealed: false,
  totalCardsInDeck: 0,

  setSelectedGame: (gameId) => set({ selectedGameId: gameId }),

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

  selectCategoryLevel: (category) => {
    set({ selectedCategories: [category] });
  },

  startGame: () => {
    const { selectedGameId, selectedCategories } = get();
    if (!selectedGameId) return;

    const allCards = gameCards[selectedGameId] || [];
    const filteredCards = allCards.filter((card) =>
      selectedCategories.includes(card.category)
    );

    set({
      currentPlayerIndex: 0,
      usedCardIds: new Set(),
      currentCard: null,
      isCardRevealed: false,
      totalCardsInDeck: filteredCards.length,
    });
  },

  drawCard: () => {
    const { selectedGameId, selectedCategories, usedCardIds } = get();
    if (!selectedGameId) return;

    const allCards = gameCards[selectedGameId] || [];
    const availableCards = allCards.filter(
      (card) =>
        selectedCategories.includes(card.category) &&
        !usedCardIds.has(card.id)
    );

    if (availableCards.length === 0) return;

    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const selectedCard = availableCards[randomIndex];

    const newUsedCardIds = new Set(usedCardIds);
    newUsedCardIds.add(selectedCard.id);

    set({
      currentCard: selectedCard,
      isCardRevealed: false,
      usedCardIds: newUsedCardIds,
    });
  },

  revealCard: () => set({ isCardRevealed: true }),

  nextPlayer: () => {
    const { currentPlayerIndex, players } = get();
    const nextIndex = (currentPlayerIndex + 1) % players.length;
    set({
      currentPlayerIndex: nextIndex,
      currentCard: null,
      isCardRevealed: false,
    });
  },

  resetGame: () =>
    set({
      selectedGameId: null,
      players: [],
      selectedCategories: ["medium"],
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
