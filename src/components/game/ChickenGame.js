"use client";

import { useState } from "react";
import Road from "./Road";
import Controls from "./Controls";

export default function ChickenGame() {
  const [balance, setBalance] = useState(1000.0);
  const [bet, setBet] = useState(10);
  const [multiplier, setMultiplier] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasCashedOut, setHasCashedOut] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [currentLane, setCurrentLane] = useState(0);
  const [message, setMessage] = useState("");

  const startGame = () => {
    if (bet > balance || bet < 1) {
      setMessage("Invalid bet amount!");
      return;
    }

    setBalance(prev => +(prev - bet).toFixed(2));
    setIsPlaying(true);
    setMultiplier(1.0);
    setCurrentLane(0);
    setHasCashedOut(false);
    setGameOver(false);
    setMessage("");
  };

  const cashOut = () => {
    if (!isPlaying || gameOver || hasCashedOut) return;
    const win = +(bet * multiplier).toFixed(2);
    setBalance(prev => +(prev + win).toFixed(2));
    setHasCashedOut(true);
    setIsPlaying(false);
    setMessage(`Cashed out at ${multiplier.toFixed(2)}x → +$${win}`);
  };

  const nextLane = () => {
    if (!isPlaying || gameOver || hasCashedOut) return;

    const crashChance = currentLane * 0.09 + 0.01;
    if (Math.random() < crashChance) {
      setGameOver(true);
      setIsPlaying(false);
      setMessage(`Lost $${bet}`);
    } else {
      setCurrentLane(currentLane + 1);
      setMultiplier(+(multiplier * 1.38).toFixed(2));
    }
  };

  const resetForNewRound = () => {
    setIsPlaying(false);
    setHasCashedOut(false);
    setGameOver(false);
    setCurrentLane(0);
    setMultiplier(1.0);
    setMessage("");
    setBet(10);
  };

  const potentialWin = (bet * multiplier).toFixed(2);

  return (
    <div className="w-full max-w-4xl">
      <div className="text-center mb-6">
        <div className="text-5xl font-bold text-green-400">
          Balance: ${balance.toFixed(2)}
        </div>
        {message && (
          <div className={`mt-4 text-2xl font-bold ${message.includes("Lost") ? "text-red-500" : "text-yellow-300"}`}>
            {message}
          </div>
        )}
      </div>

      <div className="bg-black/70 backdrop-blur-xl rounded-3xl p-8 border border-purple-600 shadow-2xl">
        <div className="text-center mb-8">
          <div className="text-7xl font-black text-yellow-400">
            {multiplier.toFixed(2)}x
          </div>
          <div className="text-3xl text-orange-300">
            Potential win: ${potentialWin}
          </div>
        </div>

        <Road currentLane={currentLane} isPlaying={isPlaying} gameOver={gameOver} />

        <Controls
          balance={balance}
          bet={bet}
          setBet={setBet}
          isPlaying={isPlaying}
          hasCashedOut={hasCashedOut}
          gameOver={gameOver}
          potentialWin={potentialWin}
          startGame={startGame}
          cashOut={cashOut}
          nextLane={nextLane}
          resetForNewRound={resetForNewRound}
        />
      </div>
    </div>
  );
}