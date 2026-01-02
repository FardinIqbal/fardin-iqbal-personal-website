"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Play, Pause, Music, X } from "lucide-react";

// Working streams with CORS support
const MUSIC_GENRES = [
  { id: "lofi", name: "Lofi", url: "https://streams.ilovemusic.de/iloveradio17.mp3" },
  { id: "chillout", name: "Chillout", url: "https://streams.ilovemusic.de/iloveradio-chillhop.mp3" },
  { id: "jazz", name: "Jazz", url: "https://streaming.radio.co/s774887f7b/listen" },
  { id: "ambient", name: "Ambient", url: "https://ice2.somafm.com/dronezone-128-mp3" },
  { id: "electronic", name: "Electronic", url: "https://streams.ilovemusic.de/iloveradio2.mp3" },
  { id: "classical", name: "Classical", url: "https://live.musopen.org:8085/streamvbr0" },
] as const;

type GenreId = (typeof MUSIC_GENRES)[number]["id"];

// Audio visualizer bars component
function AudioVisualizer({ isPlaying }: { isPlaying: boolean }) {
  const bars = [0, 1, 2, 3, 4];

  return (
    <div className="flex items-end justify-center gap-0.5 h-4">
      {bars.map((i) => (
        <motion.div
          key={i}
          className="w-0.5 bg-emerald-500 rounded-full"
          animate={
            isPlaying
              ? {
                  height: [4, 12, 6, 14, 8, 4],
                }
              : { height: 4 }
          }
          transition={
            isPlaying
              ? {
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }
              : { duration: 0.2 }
          }
        />
      ))}
    </div>
  );
}

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentGenre, setCurrentGenre] = useState<GenreId>("lofi");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const currentTrack = MUSIC_GENRES.find((g) => g.id === currentGenre)!;

  // Click outside to close
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      isExpanded &&
      panelRef.current &&
      buttonRef.current &&
      !panelRef.current.contains(e.target as Node) &&
      !buttonRef.current.contains(e.target as Node)
    ) {
      setIsExpanded(false);
    }
  }, [isExpanded]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

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

  // Handle audio errors
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleError = () => {
      setHasError(true);
      setIsPlaying(false);
      setIsLoading(false);
    };

    const handleCanPlay = () => {
      setHasError(false);
    };

    audio.addEventListener("error", handleError);
    audio.addEventListener("canplay", handleCanPlay);

    return () => {
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  // Handle genre change
  const changeGenre = async (genreId: GenreId) => {
    const wasPlaying = isPlaying;
    setHasError(false);

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
        setHasError(true);
      }
      setIsLoading(false);
    }
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;
    setHasError(false);

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
        setHasError(true);
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
      <audio
        ref={audioRef}
        src={currentTrack.url}
        preload="none"
        crossOrigin="anonymous"
      />

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
                ref={panelRef}
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
                  {/* Header with visualizer */}
                  <div className="flex items-center justify-between pr-8 sm:pr-0">
                    <div className="flex items-center gap-3">
                      <AudioVisualizer isPlaying={isPlaying} />
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

                  {/* Play button */}
                  <button
                    onClick={togglePlay}
                    disabled={isLoading}
                    className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                      isPlaying
                        ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/30"
                        : hasError
                        ? "bg-red-500/10 text-red-400 border border-red-500/30"
                        : "bg-foreground text-background hover:opacity-90"
                    }`}
                  >
                    {isLoading ? (
                      <motion.span
                        className="text-sm"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        Loading...
                      </motion.span>
                    ) : hasError ? (
                      <span className="text-sm">Stream unavailable - try another</span>
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
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-center gap-2 text-xs text-foreground-subtle"
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span>Now playing {currentTrack.name}</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main floating button */}
        <motion.button
          ref={buttonRef}
          onClick={() => setIsExpanded(!isExpanded)}
          className={`relative p-3 sm:p-3 rounded-full border transition-all shadow-lg ${
            isPlaying
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
              : "bg-background border-border text-foreground-muted hover:text-foreground hover:border-foreground-subtle"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? (
            <div className="w-5 h-5 flex items-center justify-center">
              <AudioVisualizer isPlaying={isPlaying} />
            </div>
          ) : (
            <Music className="w-5 h-5" />
          )}

          {/* Playing indicator pulse */}
          {isPlaying && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-emerald-500"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.button>
      </div>
    </>
  );
}
