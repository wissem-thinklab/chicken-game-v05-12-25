"use client";

export default function Controls({
  balance,
  bet,
  setBet,
  isPlaying,
  hasCashedOut,
  gameOver,
  potentialWin,
  startGame,
  cashOut,
  nextLane,
  resetForNewRound,
}) {
  return (
    <div className="flex flex-col items-center gap-8 mt-6">
      {!isPlaying && !hasCashedOut && !gameOver && (
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <div className="text-center">
            <label className="text-xl text-gray-300">Bet Amount</label>
            <input
              type="number"
              min="1"
              max={balance}
              step="1"
              value={bet}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val >= 1 && val <= balance) setBet(val);
              }}
              className="mt-2 w-48 px-6 py-4 text-3xl text-center bg-black/60 border-2 border-purple-500 rounded-xl focus:outline-none focus:border-yellow-400"
            />
            <div className="text-sm text-gray-400 mt-1">Available: ${balance.toFixed(2)}</div>
          </div>

          <button
            onClick={startGame}
            disabled={balance < 1}
            className={`px-16 py-6 text-2xl font-bold rounded-xl transform hover:scale-105 transition ${
              balance < 1
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            }`}
          >
            {balance < 1 ? "BROKE!" : "START GAME"}
          </button>
        </div>
      )}

      {isPlaying && !gameOver && !hasCashedOut && (
        <div className="flex flex-col sm:flex-row gap-6">
          <button
            onClick={nextLane}
            className="px-12 py-6 text-2xl font-bold bg-red-600 hover:bg-red-700 rounded-xl transform hover:scale-105 transition"
          >
            NEXT LANE – GO!
          </button>

          <button
            onClick={cashOut}
            className="px-16 py-8 text-3xl font-black bg-linear-to-r from-yellow-400 to-orange-500 text-black rounded-xl hover:from-yellow-500 hover:to-orange-600 transform hover:scale-110 transition shadow-2xl"
          >
            CASH OUT ${potentialWin}
          </button>
        </div>
      )}

      {(gameOver || hasCashedOut) && (
        <button
          onClick={resetForNewRound}
          className="px-20 py-6 text-2xl font-bold bg-linear-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition"
        >
          PLAY AGAIN
        </button>
      )}
    </div>
  );
}