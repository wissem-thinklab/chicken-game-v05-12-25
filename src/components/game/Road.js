"use client";

import { motion } from "framer-motion";
import Chicken from "./Chicken";

const TOTAL_LANES = 20;

const carEmojis = ["🚗", "🚚", "🚓", "🚑", "🚕", "🚌"];

function getRandomCar() {
  return carEmojis[Math.floor(Math.random() * carEmojis.length)];
}

export default function Road({ currentLane, isPlaying, gameOver }) {
  return (
    <div className="relative w-full h-96 md:h-[520px] bg-linear-to-b from-gray-900 to-black rounded-2xl overflow-hidden border-8 border-gray-800 shadow-2xl my-8">

      {Array.from({ length: TOTAL_LANES }, (_, i) => (
        <div
          key={i}
          className={`absolute inset-x-0 h-24 border-b-4 border-dashed border-gray-700 ${
            i < currentLane ? "bg-green-950/50" : ""
          } ${i === currentLane && isPlaying && !gameOver ? "ring-4 ring-yellow-500/70" : ""}`}
          style={{ bottom: `${i * 96}px` }}
        >
          {/* Moving cars in this lane */}
          {isPlaying && (
            <>
              {/* Left → Right */}
              <motion.div
                animate={{ x: ["-10%", "110%"] }}
                transition={{
                  duration: 2.5 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute text-5xl"
                style={{ top: "8px" }}
              >
                {getRandomCar()}
              </motion.div>

              {/* Right → Left */}
              <motion.div
                animate={{ x: ["110%", "-10%"] }}
                transition={{
                  duration: 3 + Math.random() * 2.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute text-5xl"
                style={{ top: "56px" }}
              >
                {getRandomCar()}
              </motion.div>
            </>
          )}
        </div>
      ))}

      {isPlaying && <Chicken lane={currentLane} gameOver={gameOver} />}

      {gameOver && (
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 4, rotate: 360 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-center text-9xl font-black text-red-600"
        >
          SPLAT!
        </motion.div>
      )}
    </div>
  );
}