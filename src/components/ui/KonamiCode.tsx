"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

export function KonamiCode() {
  const [inputSequence, setInputSequence] = useState<string[]>([]);
  const [isMatrixActive, setIsMatrixActive] = useState(false);

  const checkKonamiCode = useCallback((sequence: string[]) => {
    const lastN = sequence.slice(-KONAMI_CODE.length);
    return KONAMI_CODE.every((key, i) => lastN[i] === key);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...inputSequence, e.code].slice(-KONAMI_CODE.length);
      setInputSequence(newSequence);

      if (checkKonamiCode(newSequence)) {
        setIsMatrixActive(true);
        setInputSequence([]);
        // Auto-disable after 10 seconds
        setTimeout(() => setIsMatrixActive(false), 10000);
      }
    };

    const handleTriggerMatrix = () => {
      setIsMatrixActive(true);
      setTimeout(() => setIsMatrixActive(false), 5000);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("trigger-matrix", handleTriggerMatrix);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("trigger-matrix", handleTriggerMatrix);
    };
  }, [inputSequence, checkKonamiCode]);

  return (
    <AnimatePresence>
      {isMatrixActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
          onClick={() => setIsMatrixActive(false)}
        >
          <MatrixRain />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-auto"
          >
            <p className="text-2xl md:text-4xl font-mono text-green-400 mb-4">
              You found the secret!
            </p>
            <p className="text-green-400/60 text-sm">
              Click anywhere to exit the Matrix
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MatrixRain() {
  const [columns, setColumns] = useState<number[]>([]);

  useEffect(() => {
    const columnCount = Math.floor(window.innerWidth / 20);
    setColumns(Array.from({ length: columnCount }, (_, i) => i));
  }, []);

  return (
    <div className="absolute inset-0 bg-black/90">
      {columns.map((col) => (
        <MatrixColumn key={col} index={col} />
      ))}
    </div>
  );
}

function MatrixColumn({ index }: { index: number }) {
  const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";
  const [drops, setDrops] = useState<{ char: string; y: number; opacity: number }[]>([]);

  useEffect(() => {
    const createDrop = () => ({
      char: chars[Math.floor(Math.random() * chars.length)],
      y: 0,
      opacity: Math.random() * 0.5 + 0.5,
    });

    // Initial drops
    const initialDrops = Array.from(
      { length: Math.floor(Math.random() * 20) + 5 },
      () => ({
        ...createDrop(),
        y: Math.random() * window.innerHeight,
      })
    );
    setDrops(initialDrops);

    const interval = setInterval(() => {
      setDrops((prev) =>
        prev.map((drop) => ({
          char: Math.random() > 0.9 ? chars[Math.floor(Math.random() * chars.length)] : drop.char,
          y: drop.y > window.innerHeight ? 0 : drop.y + 10 + Math.random() * 10,
          opacity: drop.opacity,
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute top-0 text-green-400 font-mono text-sm"
      style={{ left: `${index * 20}px` }}
    >
      {drops.map((drop, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            top: `${drop.y}px`,
            opacity: drop.opacity,
            textShadow: "0 0 8px #22c55e",
          }}
        >
          {drop.char}
        </span>
      ))}
    </div>
  );
}
