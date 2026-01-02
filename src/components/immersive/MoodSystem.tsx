"use client";

import { createContext, useContext, useMemo, ReactNode } from "react";

// Mood types based on content analysis
export type Mood =
  | "philosophical"
  | "technical"
  | "intense"
  | "calm"
  | "nostalgic"
  | "hopeful"
  | "mysterious";

// Color palettes for each mood
const moodPalettes: Record<
  Mood,
  {
    primary: string;
    secondary: string;
    accent: string;
    glow: string;
    background: string;
  }
> = {
  philosophical: {
    primary: "139, 92, 246", // Purple
    secondary: "99, 102, 241", // Indigo
    accent: "236, 72, 153", // Pink
    glow: "rgba(139, 92, 246, 0.3)",
    background: "#0a0a12",
  },
  technical: {
    primary: "34, 211, 238", // Cyan
    secondary: "59, 130, 246", // Blue
    accent: "16, 185, 129", // Emerald
    glow: "rgba(34, 211, 238, 0.3)",
    background: "#0a0f14",
  },
  intense: {
    primary: "239, 68, 68", // Red
    secondary: "249, 115, 22", // Orange
    accent: "234, 179, 8", // Yellow
    glow: "rgba(239, 68, 68, 0.3)",
    background: "#120a0a",
  },
  calm: {
    primary: "74, 144, 226", // Soft blue
    secondary: "99, 179, 237", // Light blue
    accent: "129, 178, 154", // Sage
    glow: "rgba(74, 144, 226, 0.2)",
    background: "#0a0e14",
  },
  nostalgic: {
    primary: "217, 175, 113", // Warm gold
    secondary: "181, 137, 99", // Sepia
    accent: "167, 139, 118", // Taupe
    glow: "rgba(217, 175, 113, 0.25)",
    background: "#0f0d0a",
  },
  hopeful: {
    primary: "34, 197, 94", // Green
    secondary: "74, 222, 128", // Light green
    accent: "250, 204, 21", // Yellow
    glow: "rgba(34, 197, 94, 0.25)",
    background: "#0a120e",
  },
  mysterious: {
    primary: "147, 51, 234", // Violet
    secondary: "109, 40, 217", // Deep purple
    accent: "59, 130, 246", // Blue
    glow: "rgba(147, 51, 234, 0.3)",
    background: "#0d0a14",
  },
};

// Audio settings for each mood
const moodAudio: Record<
  Mood,
  { tempo: number; key: string; reverb: number; volume: number }
> = {
  philosophical: { tempo: 50, key: "D", reverb: 0.8, volume: -20 },
  technical: { tempo: 70, key: "C", reverb: 0.5, volume: -22 },
  intense: { tempo: 90, key: "A", reverb: 0.4, volume: -18 },
  calm: { tempo: 45, key: "G", reverb: 0.9, volume: -24 },
  nostalgic: { tempo: 55, key: "F", reverb: 0.7, volume: -22 },
  hopeful: { tempo: 65, key: "C", reverb: 0.6, volume: -20 },
  mysterious: { tempo: 40, key: "E", reverb: 0.85, volume: -20 },
};

// Particle settings for each mood
const moodParticles: Record<
  Mood,
  { count: number; speed: number; size: number; opacity: number }
> = {
  philosophical: { count: 100, speed: 0.3, size: 2, opacity: 0.6 },
  technical: { count: 150, speed: 0.5, size: 1.5, opacity: 0.8 },
  intense: { count: 200, speed: 1.2, size: 2.5, opacity: 0.7 },
  calm: { count: 60, speed: 0.15, size: 3, opacity: 0.4 },
  nostalgic: { count: 80, speed: 0.2, size: 2.5, opacity: 0.5 },
  hopeful: { count: 120, speed: 0.4, size: 2, opacity: 0.6 },
  mysterious: { count: 90, speed: 0.25, size: 3.5, opacity: 0.5 },
};

// Keywords to detect mood from content
const moodKeywords: Record<Mood, string[]> = {
  philosophical: [
    "meaning",
    "existence",
    "truth",
    "morality",
    "ethics",
    "question",
    "debate",
    "philosophy",
    "nietzsche",
    "plato",
    "aristotle",
    "wisdom",
    "virtue",
    "justice",
    "power",
    "dictatorship",
    "democracy",
  ],
  technical: [
    "code",
    "algorithm",
    "function",
    "memory",
    "malloc",
    "programming",
    "software",
    "system",
    "architecture",
    "performance",
    "optimization",
    "react",
    "javascript",
    "typescript",
  ],
  intense: [
    "war",
    "battle",
    "conflict",
    "struggle",
    "violence",
    "revolution",
    "crisis",
    "urgent",
    "critical",
    "danger",
    "power",
    "conquest",
    "empire",
  ],
  calm: [
    "peace",
    "gentle",
    "quiet",
    "meditation",
    "rest",
    "stillness",
    "tranquil",
    "serene",
    "balance",
    "harmony",
  ],
  nostalgic: [
    "memory",
    "childhood",
    "remember",
    "past",
    "history",
    "ancient",
    "civilization",
    "tradition",
    "heritage",
    "rome",
    "persia",
    "empire",
  ],
  hopeful: [
    "future",
    "progress",
    "growth",
    "potential",
    "possibility",
    "dream",
    "aspiration",
    "build",
    "create",
    "innovation",
  ],
  mysterious: [
    "unknown",
    "hidden",
    "secret",
    "shadow",
    "darkness",
    "enigma",
    "puzzle",
    "ancient",
    "arcane",
    "esoteric",
  ],
};

// Analyze content and determine mood
export function analyzeMood(content: string, tags: string[] = []): Mood {
  const lowerContent = content.toLowerCase();
  const lowerTags = tags.map((t) => t.toLowerCase());

  // Score each mood based on keyword matches
  const scores: Record<Mood, number> = {
    philosophical: 0,
    technical: 0,
    intense: 0,
    calm: 0,
    nostalgic: 0,
    hopeful: 0,
    mysterious: 0,
  };

  // Check tags first (higher weight)
  for (const [mood, keywords] of Object.entries(moodKeywords)) {
    for (const keyword of keywords) {
      if (lowerTags.some((t) => t.includes(keyword))) {
        scores[mood as Mood] += 3;
      }
    }
  }

  // Check content
  for (const [mood, keywords] of Object.entries(moodKeywords)) {
    for (const keyword of keywords) {
      const regex = new RegExp(`\\b${keyword}\\b`, "gi");
      const matches = lowerContent.match(regex);
      if (matches) {
        scores[mood as Mood] += matches.length;
      }
    }
  }

  // Find highest scoring mood
  let maxMood: Mood = "philosophical";
  let maxScore = 0;

  for (const [mood, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      maxMood = mood as Mood;
    }
  }

  return maxMood;
}

// Context
interface MoodContextType {
  mood: Mood;
  palette: (typeof moodPalettes)[Mood];
  audio: (typeof moodAudio)[Mood];
  particles: (typeof moodParticles)[Mood];
}

const MoodContext = createContext<MoodContextType | null>(null);

export function useMood() {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error("useMood must be used within a MoodProvider");
  }
  return context;
}

interface MoodProviderProps {
  children: ReactNode;
  content: string;
  tags?: string[];
  overrideMood?: Mood;
}

export function MoodProvider({
  children,
  content,
  tags = [],
  overrideMood,
}: MoodProviderProps) {
  const mood = useMemo(() => {
    return overrideMood || analyzeMood(content, tags);
  }, [content, tags, overrideMood]);

  const value = useMemo(
    () => ({
      mood,
      palette: moodPalettes[mood],
      audio: moodAudio[mood],
      particles: moodParticles[mood],
    }),
    [mood]
  );

  return (
    <MoodContext.Provider value={value}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        :root {
          --mood-primary: ${value.palette.primary};
          --mood-secondary: ${value.palette.secondary};
          --mood-accent: ${value.palette.accent};
          --mood-glow: ${value.palette.glow};
          --mood-background: ${value.palette.background};
        }
      `,
        }}
      />
      {children}
    </MoodContext.Provider>
  );
}
