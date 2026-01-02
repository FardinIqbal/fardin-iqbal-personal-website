"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Play, Pause, Music, X } from "lucide-react";

// Music genres with streaming URLs
const MUSIC_GENRES = [
  { id: "lofi", name: "Lofi", url: "https://stream.zeno.fm/f3wvbbqmdg8uv" },
  { id: "jazz", name: "Jazz", url: "https://stream.zeno.fm/0r0xa792kwzuv" },
  { id: "classical", name: "Classical", url: "https://stream.zeno.fm/e3b75lmgfm8uv" },
  { id: "ambient", name: "Ambient", url: "https://stream.zeno.fm/yn65fsaurfhvv" },
  { id: "chillhop", name: "Chillhop", url: "https://stream.zeno.fm/fyn8fxkyb2zuv" },
  { id: "piano", name: "Piano", url: "https://stream.zeno.fm/2acdnp7sne8uv" },
] as const;

type GenreId = (typeof MUSIC_GENRES)[number]["id"];

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentGenre, setCurrentGenre] = useState<GenreId>("lofi");
  const [isLoading, setIsLoading] = useState(false);

  const currentTrack = MUSIC_GENRES.find((g) => g.id === currentGenre)!;

  // Load saved state from localStorage
  useEffect(() => {
    const savedVolume = localStorage.getItem("music_volume");
    const savedMuted = localStorage.getItem("music_muted");
    const savedGenre = localStorage.getItem("music_genre") as GenreId | null;

    if (savedVolume) setVolume(parseFloat(savedVolume));
    if (savedMuted) setIsMuted(savedMuted === "true");
    if (savedGenre && MUSIC_GENRES.some((g) => g.id === savedGenre)) {
      setCurrentGenre(savedGenre);
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem("music_volume", volume.toString());
    localStorage.setItem("music_muted", isMuted.toString());
    localStorage.setItem("music_genre", currentGenre);
  }, [volume, isMuted, currentGenre]);

  // Update audio element when state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Handle genre change
  const changeGenre = async (genreId: GenreId) => {
    const wasPlaying = isPlaying;
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }

    setCurrentGenre(genreId);

    // If was playing, start new track
    if (wasPlaying && audioRef.current) {
      setIsLoading(true);
      audioRef.current.src = MUSIC_GENRES.find((g) => g.id === genreId)!.url;
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Playback failed:", error);
      }
      setIsLoading(false);
    }
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Playback failed:", error);
      }
      setIsLoading(false);
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
      <audio ref={audioRef} src={currentTrack.url} loop preload="none" />

      {/* Floating player */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <AnimatePresence>
          {isExpanded && (
            <>
              {/* Mobile backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm sm:hidden"
                onClick={() => setIsExpanded(false)}
              />

              {/* Panel */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="fixed bottom-0 left-0 right-0 p-4 pb-6 bg-background border-t border-border rounded-t-2xl
                  sm:absolute sm:bottom-14 sm:left-auto sm:right-0 sm:p-4 sm:rounded-xl sm:border sm:shadow-2xl sm:min-w-[280px]"
              >
                {/* Close button - mobile only */}
                <button
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-3 right-3 p-2 text-foreground-subtle hover:text-foreground sm:hidden"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between pr-8 sm:pr-0">
                    <div className="flex items-center gap-2">
                      <Music className="w-4 h-4 text-foreground-subtle" />
                      <span className="text-sm font-medium text-foreground">Music</span>
                    </div>
                    <button
                      onClick={toggleMute}
                      className="p-2 rounded-lg text-foreground-subtle hover:text-foreground hover:bg-background-tertiary transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Genre selection */}
                  <div className="grid grid-cols-3 gap-2">
                    {MUSIC_GENRES.map((genre) => (
                      <button
                        key={genre.id}
                        onClick={() => changeGenre(genre.id)}
                        className={`px-3 py-2 rounded-lg text-sm transition-all ${
                          currentGenre === genre.id
                            ? "bg-foreground text-background font-medium"
                            : "bg-background-tertiary text-foreground-muted hover:text-foreground hover:bg-background-secondary"
                        }`}
                      >
                        {genre.name}
                      </button>
                    ))}
                  </div>

                  {/* Volume slider */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-foreground-subtle w-12">Volume</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="flex-1 h-1.5 bg-background-tertiary rounded-full appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:w-4
                        [&::-webkit-slider-thumb]:h-4
                        [&::-webkit-slider-thumb]:rounded-full
                        [&::-webkit-slider-thumb]:bg-foreground
                        [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-webkit-slider-thumb]:shadow-md
                        [&::-moz-range-thumb]:w-4
                        [&::-moz-range-thumb]:h-4
                        [&::-moz-range-thumb]:rounded-full
                        [&::-moz-range-thumb]:bg-foreground
                        [&::-moz-range-thumb]:border-0
                        [&::-moz-range-thumb]:cursor-pointer"
                    />
                    <span className="text-xs text-foreground-subtle w-8 text-right tabular-nums">
                      {Math.round((isMuted ? 0 : volume) * 100)}%
                    </span>
                  </div>

                  {/* Play button - large on mobile */}
                  <button
                    onClick={togglePlay}
                    disabled={isLoading}
                    className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                      isPlaying
                        ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/30"
                        : "bg-foreground text-background hover:opacity-90"
                    }`}
                  >
                    {isLoading ? (
                      <span className="text-sm">Loading...</span>
                    ) : isPlaying ? (
                      <>
                        <Pause className="w-4 h-4" />
                        <span className="text-sm">Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span className="text-sm">Play {currentTrack.name}</span>
                      </>
                    )}
                  </button>

                  {/* Status */}
                  {isPlaying && (
                    <div className="flex items-center justify-center gap-2 text-xs text-foreground-subtle">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span>Now playing {currentTrack.name}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main floating button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`relative p-3 sm:p-3 rounded-full border transition-all shadow-lg ${
            isPlaying
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
              : "bg-background border-border text-foreground-muted hover:text-foreground hover:border-foreground-subtle"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Music className="w-5 h-5" />}

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
