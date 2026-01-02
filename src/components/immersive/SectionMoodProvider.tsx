"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  ReactNode,
  useMemo,
} from "react";
import { Mood } from "./MoodSystem";

// Section configuration with predefined moods
export const sectionMoods: Record<string, Mood> = {
  hero: "hopeful",
  about: "philosophical",
  skills: "technical",
  experience: "nostalgic",
  projects: "technical",
  interests: "calm",
  contact: "hopeful",
};

// Color palettes for each mood (duplicated from MoodSystem for direct access)
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
    primary: "139, 92, 246",
    secondary: "99, 102, 241",
    accent: "236, 72, 153",
    glow: "rgba(139, 92, 246, 0.3)",
    background: "#0a0a12",
  },
  technical: {
    primary: "34, 211, 238",
    secondary: "59, 130, 246",
    accent: "16, 185, 129",
    glow: "rgba(34, 211, 238, 0.3)",
    background: "#0a0f14",
  },
  intense: {
    primary: "239, 68, 68",
    secondary: "249, 115, 22",
    accent: "234, 179, 8",
    glow: "rgba(239, 68, 68, 0.3)",
    background: "#120a0a",
  },
  calm: {
    primary: "74, 144, 226",
    secondary: "99, 179, 237",
    accent: "129, 178, 154",
    glow: "rgba(74, 144, 226, 0.2)",
    background: "#0a0e14",
  },
  nostalgic: {
    primary: "217, 175, 113",
    secondary: "181, 137, 99",
    accent: "167, 139, 118",
    glow: "rgba(217, 175, 113, 0.25)",
    background: "#0f0d0a",
  },
  hopeful: {
    primary: "34, 197, 94",
    secondary: "74, 222, 128",
    accent: "250, 204, 21",
    glow: "rgba(34, 197, 94, 0.25)",
    background: "#0a120e",
  },
  mysterious: {
    primary: "147, 51, 234",
    secondary: "109, 40, 217",
    accent: "59, 130, 246",
    glow: "rgba(147, 51, 234, 0.3)",
    background: "#0d0a14",
  },
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

interface SectionMoodContextType {
  currentSection: string;
  currentMood: Mood;
  palette: (typeof moodPalettes)[Mood];
  particles: (typeof moodParticles)[Mood];
  audio: (typeof moodAudio)[Mood];
  scrollVelocity: number;
}

const SectionMoodContext = createContext<SectionMoodContextType | null>(null);

export function useSectionMood() {
  const context = useContext(SectionMoodContext);
  if (!context) {
    throw new Error("useSectionMood must be used within a SectionMoodProvider");
  }
  return context;
}

interface SectionMoodProviderProps {
  children: ReactNode;
}

export function SectionMoodProvider({ children }: SectionMoodProviderProps) {
  const [currentSection, setCurrentSection] = useState("hero");
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());

  // Track active section with IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll("[data-section]");
    if (sections.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Trigger when section is in middle 20% of viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target.getAttribute("data-section");
          if (section) {
            setCurrentSection(section);
          }
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Track scroll velocity
  useEffect(() => {
    let velocityDecay: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const now = Date.now();
      const dt = now - lastScrollTime.current;
      const dy = Math.abs(window.scrollY - lastScrollY.current);

      // Calculate velocity (pixels per millisecond, capped)
      const velocity = Math.min(dy / Math.max(dt, 1), 5);
      setScrollVelocity(velocity);

      lastScrollY.current = window.scrollY;
      lastScrollTime.current = now;

      // Decay velocity over time
      clearTimeout(velocityDecay);
      velocityDecay = setTimeout(() => {
        setScrollVelocity(0);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(velocityDecay);
    };
  }, []);

  const currentMood = sectionMoods[currentSection] || "hopeful";
  const palette = moodPalettes[currentMood];
  const particles = moodParticles[currentMood];
  const audio = moodAudio[currentMood];

  const value = useMemo(
    () => ({
      currentSection,
      currentMood,
      palette,
      particles,
      audio,
      scrollVelocity,
    }),
    [currentSection, currentMood, palette, particles, audio, scrollVelocity]
  );

  return (
    <SectionMoodContext.Provider value={value}>
      {/* Inject CSS variables with transition support */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            :root {
              --mood-primary: ${palette.primary};
              --mood-secondary: ${palette.secondary};
              --mood-accent: ${palette.accent};
              --mood-glow: ${palette.glow};
              --mood-background: ${palette.background};
            }
          `,
        }}
      />
      {children}
    </SectionMoodContext.Provider>
  );
}
