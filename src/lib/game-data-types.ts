export interface GameType {
  id: string;
  name: string;
  description: string;
  playerRange: string;
  icon: string;
  color: string;
}

export type TruthOrDareKind = "truth" | "dare";

export const TRUTH_OR_DARE_ID = "truth-or-dare";

export interface Card {
  id: string;
  text: string;
  category: "light" | "medium" | "hot";
  /** Зөвхөн truth-or-dare — картын агуулга үнэн эсвэл зориг */
  truthOrDare?: TruthOrDareKind;
}

export interface GameData {
  id: string;
  cards: Card[];
}

/** Тоглоомын карт тухайн тоглолтын шүүлтэд тохирч байгаа эсэх */
export function cardMatchesPlayMode(
  card: Card,
  gameId: string,
  truthOrDareSide: TruthOrDareKind | null,
): boolean {
  if (gameId !== TRUTH_OR_DARE_ID) return true;
  if (!truthOrDareSide) return false;
  return card.truthOrDare === truthOrDareSide;
}
