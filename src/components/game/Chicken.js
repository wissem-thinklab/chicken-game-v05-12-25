"use client";

import { motion } from "framer-motion";

export default function Chicken({ lane, gameOver }) {
  return (
    <motion.div
      className="absolute left-8 text-7xl select-none pointer-events-none z-10"
      initial={{ bottom: -100 }}
      animate={{
        bottom: lane * 96 + 32,
        rotate: gameOver ? [0, -30, 30, -30, 0] : [0, 5, -5, 0],
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      {gameOver ? "Dead Chicken" : "Chicken"}
    </motion.div>
  );
}