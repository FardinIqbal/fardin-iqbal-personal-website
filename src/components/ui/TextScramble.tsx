"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface TextScrambleProps {
  text: string;
  className?: string;
  scrambleOnHover?: boolean;
  scrambleOnMount?: boolean;
  duration?: number;
}

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

export function TextScramble({
  text,
  className = "",
  scrambleOnHover = false,
  scrambleOnMount = true,
  duration = 1000,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(scrambleOnMount ? "" : text);
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);

    const originalText = text;
    const length = originalText.length;
    const steps = 20;
    const stepDuration = duration / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / steps;

      const scrambled = originalText
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < length * progress) return originalText[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayText(scrambled);

      if (step >= steps) {
        clearInterval(interval);
        setDisplayText(originalText);
        setIsScrambling(false);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [text, duration, isScrambling]);

  useEffect(() => {
    if (scrambleOnMount) {
      const timer = setTimeout(scramble, 200);
      return () => clearTimeout(timer);
    }
  }, [scrambleOnMount, scramble]);

  return (
    <motion.span
      className={className}
      onMouseEnter={scrambleOnHover ? scramble : undefined}
      style={{ fontFamily: "inherit" }}
    >
      {displayText || text}
    </motion.span>
  );
}

// Animated typing effect
interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export function Typewriter({
  text,
  className = "",
  speed = 50,
  delay = 0,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i <= text.length) {
          setDisplayText(text.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
          // Blink cursor then hide
          setTimeout(() => setShowCursor(false), 1000);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block w-[2px] h-[1em] bg-current ml-1 align-middle"
        />
      )}
    </span>
  );
}

// Reveal text letter by letter
interface LetterRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function LetterReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.03,
}: LetterRevealProps) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + i * stagger,
            duration: 0.4,
            ease: "easeOut",
          }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}
