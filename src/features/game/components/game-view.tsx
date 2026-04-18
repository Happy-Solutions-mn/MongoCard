"use client";

import { useState } from "react";
import { useGameStore } from "@/lib/game-store";
import type { GameScreen } from "../types/game-screen";
import { HomePage } from "./home-page";
import { SetupPage } from "./setup-page";
import { GamePage } from "./game-page";
import { GameOverPage } from "./game-over-page";

export function GameView() {
  const [screen, setScreen] = useState<GameScreen>("home");
  const { resetGame } = useGameStore();

  const handleSelectGame = () => {
    setScreen("setup");
  };

  const handleStartGame = () => {
    setScreen("game");
  };

  const handleGameOver = () => {
    setScreen("game-over");
  };

  const handlePlayAgain = () => {
    setScreen("game");
  };

  const handleBackToHome = () => {
    resetGame();
    setScreen("home");
  };

  const handleBackToSetup = () => {
    setScreen("setup");
  };

  return (
    <main className="min-h-screen bg-background">
      {screen === "home" && <HomePage onSelectGame={handleSelectGame} />}
      {screen === "setup" && (
        <SetupPage
          onStartGame={handleStartGame}
          onBack={handleBackToHome}
        />
      )}
      {screen === "game" && (
        <GamePage
          onGameOver={handleGameOver}
          onBack={handleBackToSetup}
        />
      )}
      {screen === "game-over" && (
        <GameOverPage
          onPlayAgain={handlePlayAgain}
          onNewGame={handleBackToHome}
        />
      )}
    </main>
  );
}
