import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
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

export interface CustomCard extends Card {
  /** Хэрэглэгчийн оруулсан картыг ялгахад */
  isCustom: true;
  /** Аль тоглоомд харагдах вэ */
  gameId: string;
}

interface HistoryEntry {
  /** Карт татсан үед хэн байсан тоглогчийн index (rotation buffer-д) */
  prevPlayerIndex: number;
  /** Татсан картын ID */
  cardId: string;
  /** TOD сонгож байсан тал (хэрэв байгаа) */
  truthOrDareSide: TruthOrDareKind | null;
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
  /** Set биш — JSON-д хадгалах боломжтой массив */
  usedCardIds: string[];
  currentCard: Card | null;
  isCardRevealed: boolean;
  totalCardsInDeck: number;
  /** Skip/Undo логикт ашиглах түүх (хамгийн сүүлд орсон сүүлд)*/
  history: HistoryEntry[];

  // Хэрэглэгчийн нэмсэн карт (бүх тоглоомд хамтад нь хадгална)
  customCards: CustomCard[];

  // Settings
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  ageConfirmed: boolean;

  // Actions — setup
  setSelectedGame: (gameId: string) => void;
  setPlayers: (count: number) => void;
  updatePlayerName: (index: number, name: string) => void;
  appendPlayer: (name: string) => void;
  removePlayerAt: (index: number) => void;
  setSelectedCategories: (categories: Card["category"][]) => void;
  switchDeckDuringGame: (categories: Card["category"][]) => void;
  setTruthOrDareSide: (side: TruthOrDareKind) => void;

  // Actions — gameplay
  startGame: () => void;
  drawCard: () => void;
  revealCard: () => void;
  nextPlayer: () => void;
  /** Картыг алгасах — used-д тэмдэглээд дараагийн тоглогч руу */
  skipCard: () => void;
  /** Сүүлийн алхамыг буцаах */
  undoLastCard: () => void;
  resetGame: () => void;

  // Selectors / helpers
  getCardsPlayed: () => number;
  isGameOver: () => boolean;
  getAvailableCardCount: () => number;

  // Custom cards
  addCustomCard: (input: Omit<CustomCard, "id" | "isCustom">) => void;
  removeCustomCard: (id: string) => void;
  clearCustomCards: (gameId?: string) => void;

  // Settings actions
  setSoundEnabled: (enabled: boolean) => void;
  setHapticsEnabled: (enabled: boolean) => void;
  setAgeConfirmed: (confirmed: boolean) => void;
}

const STORAGE_KEY = "mongocard:state:v1";

function pickRandom<T>(arr: T[]): T | null {
  if (arr.length === 0) return null;
  return arr[Math.floor(Math.random() * arr.length)] ?? null;
}

function getDeck(
  gameId: string | null,
  customCards: CustomCard[],
): Card[] {
  if (!gameId) return [];
  const base = gameCards[gameId] ?? [];
  const custom = customCards.filter((c) => c.gameId === gameId);
  return [...base, ...custom];
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      selectedGameId: null,
      players: [],
      selectedCategories: ["light"],
      truthOrDareSide: null,
      currentPlayerIndex: 0,
      usedCardIds: [],
      currentCard: null,
      isCardRevealed: false,
      totalCardsInDeck: 0,
      history: [],
      customCards: [],
      soundEnabled: true,
      hapticsEnabled: true,
      ageConfirmed: false,

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
        const { selectedGameId, customCards } = get();
        if (!selectedGameId) {
          set({ selectedCategories: nextCats });
          return;
        }
        const allCards = getDeck(selectedGameId, customCards);
        const filtered = allCards.filter((card) =>
          nextCats.includes(card.category),
        );
        set({
          selectedCategories: nextCats,
          usedCardIds: [],
          currentCard: null,
          isCardRevealed: false,
          truthOrDareSide: null,
          totalCardsInDeck: filtered.length,
          history: [],
        });
      },

      setTruthOrDareSide: (side) => {
        set({ truthOrDareSide: side });
        if (get().selectedGameId === "truth-or-dare") {
          get().drawCard();
        }
      },

      startGame: () => {
        const { selectedGameId, selectedCategories, customCards } = get();
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

        const allCards = getDeck(selectedGameId, customCards);
        const filteredCards = allCards.filter((card) =>
          selectedCategories.includes(card.category),
        );

        set({
          players,
          currentPlayerIndex: 0,
          usedCardIds: [],
          currentCard: null,
          isCardRevealed: false,
          truthOrDareSide: null,
          totalCardsInDeck: filteredCards.length,
          history: [],
        });
      },

      drawCard: () => {
        const {
          selectedGameId,
          selectedCategories,
          usedCardIds,
          truthOrDareSide,
          customCards,
          currentPlayerIndex,
          history,
        } = get();
        if (!selectedGameId) return;

        const allCards = getDeck(selectedGameId, customCards);
        const used = new Set(usedCardIds);
        const availableCards = allCards.filter(
          (card) =>
            selectedCategories.includes(card.category) &&
            !used.has(card.id) &&
            cardMatchesPlayMode(card, selectedGameId, truthOrDareSide),
        );

        const selected = pickRandom(availableCards);
        if (!selected) return;

        set({
          currentCard: selected,
          /** TOD: «Карт ухах» алхамгүй — шууд асуулт харуулна */
          isCardRevealed: selectedGameId === "truth-or-dare",
          usedCardIds: [...usedCardIds, selected.id],
          history: [
            ...history,
            {
              prevPlayerIndex: currentPlayerIndex,
              cardId: selected.id,
              truthOrDareSide,
            },
          ],
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
            ...(selectedGameId === "truth-or-dare"
              ? { truthOrDareSide: null }
              : {}),
          });
          return;
        }
        const nextIndex = (currentPlayerIndex + 1) % players.length;
        set({
          currentPlayerIndex: nextIndex,
          currentCard: null,
          isCardRevealed: false,
          ...(selectedGameId === "truth-or-dare"
            ? { truthOrDareSide: null }
            : {}),
        });
      },

      skipCard: () => {
        // Картыг used-д үлдээгээд дараагийн ээлжид шилжүүлнэ
        get().nextPlayer();
      },

      undoLastCard: () => {
        const {
          history,
          usedCardIds,
          customCards,
          selectedGameId,
        } = get();
        if (history.length === 0 || !selectedGameId) return;

        const last = history[history.length - 1]!;
        const newHistory = history.slice(0, -1);
        const newUsed = usedCardIds.filter((id) => id !== last.cardId);

        const allCards = getDeck(selectedGameId, customCards);
        const restoredCard = allCards.find((c) => c.id === last.cardId) ?? null;

        set({
          history: newHistory,
          usedCardIds: newUsed,
          currentPlayerIndex: last.prevPlayerIndex,
          currentCard: restoredCard,
          isCardRevealed: true,
          truthOrDareSide: last.truthOrDareSide,
        });
      },

      resetGame: () =>
        set({
          selectedGameId: null,
          players: [],
          selectedCategories: ["light"],
          truthOrDareSide: null,
          currentPlayerIndex: 0,
          usedCardIds: [],
          currentCard: null,
          isCardRevealed: false,
          totalCardsInDeck: 0,
          history: [],
        }),

      getCardsPlayed: () => get().usedCardIds.length,

      isGameOver: () => {
        const { selectedGameId, selectedCategories, usedCardIds, customCards } =
          get();
        if (!selectedGameId) return false;
        const allCards = getDeck(selectedGameId, customCards);
        const used = new Set(usedCardIds);
        const availableCards = allCards.filter(
          (card) =>
            selectedCategories.includes(card.category) && !used.has(card.id),
        );
        return availableCards.length === 0;
      },

      getAvailableCardCount: () => {
        const {
          selectedGameId,
          selectedCategories,
          usedCardIds,
          customCards,
          truthOrDareSide,
        } = get();
        if (!selectedGameId) return 0;
        const allCards = getDeck(selectedGameId, customCards);
        const used = new Set(usedCardIds);
        return allCards.filter(
          (card) =>
            selectedCategories.includes(card.category) &&
            !used.has(card.id) &&
            cardMatchesPlayMode(card, selectedGameId, truthOrDareSide),
        ).length;
      },

      addCustomCard: (input) => {
        const card: CustomCard = {
          ...input,
          id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          isCustom: true,
        };
        set({ customCards: [...get().customCards, card] });
      },

      removeCustomCard: (id) => {
        set({
          customCards: get().customCards.filter((c) => c.id !== id),
        });
      },

      clearCustomCards: (gameId) => {
        if (!gameId) {
          set({ customCards: [] });
          return;
        }
        set({
          customCards: get().customCards.filter((c) => c.gameId !== gameId),
        });
      },

      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
      setHapticsEnabled: (enabled) => set({ hapticsEnabled: enabled }),
      setAgeConfirmed: (confirmed) => set({ ageConfirmed: confirmed }),
    }),
    {
      name: STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return window.localStorage;
      }),
      // Зөвхөн чухал зүйлсийг хадгална — currentCard, isCardRevealed зэргийг үгүй
      partialize: (state) => ({
        players: state.players,
        selectedCategories: state.selectedCategories,
        customCards: state.customCards,
        soundEnabled: state.soundEnabled,
        hapticsEnabled: state.hapticsEnabled,
        ageConfirmed: state.ageConfirmed,
      }),
    },
  ),
);
