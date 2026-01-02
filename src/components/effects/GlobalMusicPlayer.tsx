"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Music2, Volume2, VolumeX } from "lucide-react";

// Lo-fi stream URL - using a free ambient music stream
const LOFI_STREAM_URL = "https://streams.ilovemusic.de/iloveradio17.mp3";

export function GlobalMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showVolume, setShowVolume] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audio.src = LOFI_STREAM_URL;
    audio.loop = true;
    audio.volume = volume;
    audio.preload = "none";
    audioRef.current = audio;

    // Check localStorage for saved preference
    const savedPlaying = localStorage.getItem("musicPlaying");
    const savedVolume = localStorage.getItem("musicVolume");

    if (savedVolume) {
      const vol = parseFloat(savedVolume);
      setVolume(vol);
      audio.volume = vol;
    }

    // Cleanup
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Update volume when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      localStorage.setItem("musicVolume", volume.toString());
    }
  }, [volume]);

  const togglePlay = useCallback(async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      localStorage.setItem("musicPlaying", "false");
    } else {
      setIsLoading(true);
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        localStorage.setItem("musicPlaying", "true");
      } catch (error) {
        console.log("Audio playback failed:", error);
      }
      setIsLoading(false);
    }
  }, [isPlaying]);

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      onMouseEnter={() => setShowVolume(true)}
      onMouseLeave={() => setShowVolume(false)}
    >
      {/* Volume slider */}
      <AnimatePresence>
        {showVolume && isPlaying && (
          <motion.div
            initial={{ opacity: 0, width: 0, x: 10 }}
            animate={{ opacity: 1, width: "auto", x: 0 }}
            exit={{ opacity: 0, width: 0, x: 10 }}
            className="overflow-hidden flex items-center gap-2 px-3 py-2 rounded-full bg-background-secondary/80 backdrop-blur-sm border border-border"
          >
            <VolumeX className="w-3 h-3 text-foreground-subtle" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-16 h-1 bg-foreground/20 rounded-full appearance-none cursor-pointer accent-primary-500"
            />
            <Volume2 className="w-3 h-3 text-foreground-subtle" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Play/Pause button */}
      <motion.button
        onClick={togglePlay}
        disabled={isLoading}
        className="relative p-3 rounded-full bg-background-secondary/80 backdrop-blur-sm border border-border hover:border-foreground-subtle transition-all group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={isPlaying ? "Pause lo-fi music" : "Play lo-fi music"}
      >
        {isLoading ? (
          <motion.div
            className="w-5 h-5 border-2 border-foreground-subtle border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        ) : isPlaying ? (
          <Music2 className="w-5 h-5 text-primary-500" />
        ) : (
          <Music className="w-5 h-5 text-foreground-muted group-hover:text-foreground transition-colors" />
        )}

        {/* Playing indicator */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              className="absolute -top-1 -right-1 flex gap-0.5"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-0.5 bg-primary-500 rounded-full"
                  animate={{
                    height: ["4px", "8px", "4px"],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Label on first hover */}
      <AnimatePresence>
        {showVolume && !isPlaying && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="text-xs text-foreground-muted whitespace-nowrap"
          >
            Lo-fi beats
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
