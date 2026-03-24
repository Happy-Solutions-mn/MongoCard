"use client";

import { useState } from "react";
import { HomePage } from "@/components/game/home-page";
import { SetupPage } from "@/components/game/setup-page";
import { GamePage } from "@/components/game/game-page";
import { GameOverPage } from "@/components/game/game-over-page";
import { useGameStore } from "@/lib/game-store";

type Screen = "home" | "setup" | "game" | "game-over";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
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
