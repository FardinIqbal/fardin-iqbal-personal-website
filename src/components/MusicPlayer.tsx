"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Play, Pause, Music } from "lucide-react";

// Lofi streams - using free lofi music URLs
const LOFI_TRACKS = [
  "https://stream.zeno.fm/f3wvbbqmdg8uv", // Lofi Girl style stream
];

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Load saved state from localStorage
  useEffect(() => {
    const savedVolume = localStorage.getItem("music_volume");
    const savedMuted = localStorage.getItem("music_muted");

    if (savedVolume) setVolume(parseFloat(savedVolume));
    if (savedMuted) setIsMuted(savedMuted === "true");
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem("music_volume", volume.toString());
    localStorage.setItem("music_muted", isMuted.toString());
  }, [volume, isMuted]);

  // Update audio element when state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    setHasInteracted(true);

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Playback failed:", error);
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={LOFI_TRACKS[0]}
        loop
        preload="none"
      />

      {/* Floating player button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-14 right-0 p-4 bg-background border border-border rounded-xl shadow-2xl min-w-[200px]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground-muted">Lofi</span>
                  <button
                    onClick={toggleMute}
                    className="p-1.5 rounded-lg text-foreground-subtle hover:text-foreground hover:bg-background-tertiary transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Volume slider */}
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="flex-1 h-1 bg-background-tertiary rounded-full appearance-none cursor-pointer
                      [&::-webkit-slider-thumb]:appearance-none
                      [&::-webkit-slider-thumb]:w-3
                      [&::-webkit-slider-thumb]:h-3
                      [&::-webkit-slider-thumb]:rounded-full
                      [&::-webkit-slider-thumb]:bg-foreground
                      [&::-webkit-slider-thumb]:cursor-pointer
                      [&::-moz-range-thumb]:w-3
                      [&::-moz-range-thumb]:h-3
                      [&::-moz-range-thumb]:rounded-full
                      [&::-moz-range-thumb]:bg-foreground
                      [&::-moz-range-thumb]:border-0
                      [&::-moz-range-thumb]:cursor-pointer"
                  />
                  <span className="text-xs text-foreground-subtle w-8 text-right">
                    {Math.round((isMuted ? 0 : volume) * 100)}%
                  </span>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2 text-xs text-foreground-subtle">
                  {isPlaying && (
                    <>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span>Now playing</span>
                    </>
                  )}
                  {!isPlaying && hasInteracted && (
                    <span className="text-foreground-subtle">Paused</span>
                  )}
                  {!hasInteracted && (
                    <span className="text-foreground-subtle">Click to play</span>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main button */}
        <motion.button
          onClick={() => {
            if (!isExpanded) {
              setIsExpanded(true);
            } else {
              togglePlay();
            }
          }}
          onBlur={() => {
            // Delay to allow clicking inside expanded panel
            setTimeout(() => setIsExpanded(false), 200);
          }}
          className={`relative p-3 rounded-full border transition-all shadow-lg ${
            isPlaying
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
              : "bg-background border-border text-foreground-muted hover:text-foreground hover:border-foreground-subtle"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Music className="w-5 h-5" />
          )}

          {/* Playing indicator */}
          {isPlaying && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </motion.div>
          )}
        </motion.button>
      </div>
    </>
  );
}
