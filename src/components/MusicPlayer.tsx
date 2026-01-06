"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Play, Pause, Radio, X, SkipForward } from "lucide-react";
import { haptic } from "@/lib/haptics";

// All SomaFM streams - verified reliable, ad-free
const RADIO_STATIONS = [
  // Chill / Lofi
  { id: "groovesalad", name: "Groove Salad", url: "https://ice1.somafm.com/groovesalad-128-mp3", genre: "Chill" },
  { id: "lush", name: "Lush", url: "https://ice1.somafm.com/lush-128-mp3", genre: "Chill" },
  { id: "dronezone", name: "Drone Zone", url: "https://ice1.somafm.com/dronezone-128-mp3", genre: "Chill" },

  // Electronic
  { id: "deepspace", name: "Deep Space", url: "https://ice1.somafm.com/deepspaceone-128-mp3", genre: "Electronic" },
  { id: "beatblender", name: "Beat Blender", url: "https://ice1.somafm.com/beatblender-128-mp3", genre: "Electronic" },
  { id: "spacestation", name: "Space Station", url: "https://ice1.somafm.com/spacestation-128-mp3", genre: "Electronic" },

  // Pop / Hits
  { id: "poptron", name: "PopTron", url: "https://ice1.somafm.com/poptron-128-mp3", genre: "Pop" },
  { id: "covers", name: "Covers", url: "https://ice1.somafm.com/covers-128-mp3", genre: "Pop" },
  { id: "seventies", name: "70s Hits", url: "https://ice1.somafm.com/seventies-128-mp3", genre: "Pop" },

  // Hip Hop / Urban
  { id: "illstreet", name: "Ill Street", url: "https://ice1.somafm.com/illstreet-128-mp3", genre: "Hip Hop" },
  { id: "dubstep", name: "Dub Step", url: "https://ice1.somafm.com/dubstep-128-mp3", genre: "Hip Hop" },

  // Rock
  { id: "indiepop", name: "Indie Pop", url: "https://ice1.somafm.com/indiepop-128-mp3", genre: "Rock" },
  { id: "metal", name: "Metal", url: "https://ice1.somafm.com/metal-128-mp3", genre: "Rock" },
  { id: "defcon", name: "DEF CON", url: "https://ice1.somafm.com/defcon-128-mp3", genre: "Rock" },
] as const;

type StationId = (typeof RADIO_STATIONS)[number]["id"];
type Genre = (typeof RADIO_STATIONS)[number]["genre"];

const GENRES = ["Chill", "Electronic", "Pop", "Hip Hop", "Rock"] as const;

function AudioVisualizer({ isPlaying, light = false }: { isPlaying: boolean; light?: boolean }) {
  return (
    <div className="flex items-end justify-center gap-0.5 h-4">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className={`w-1 rounded-full ${light ? "bg-white" : "bg-accent-red"}`}
          animate={
            isPlaying
              ? { height: [4, 16, 6, 14, 8, 4] }
              : { height: 4 }
          }
          transition={
            isPlaying
              ? { duration: 0.6, repeat: Infinity, delay: i * 0.08, ease: "easeInOut" }
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
  const [currentStation, setCurrentStation] = useState<StationId>("groovesalad");
  const [selectedGenre, setSelectedGenre] = useState<Genre>("Chill");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasAttemptedPlay, setHasAttemptedPlay] = useState(false);
  const [autoplayAttempted, setAutoplayAttempted] = useState(false);
  const [mobileNavVisible, setMobileNavVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const station = RADIO_STATIONS.find((s) => s.id === currentStation)!;
  const stationsInGenre = RADIO_STATIONS.filter((s) => s.genre === selectedGenre);

  // Detect mobile vs desktop
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Listen for mobile nav visibility changes
  useEffect(() => {
    const handleNavVisibility = (e: CustomEvent<{ visible: boolean }>) => {
      setMobileNavVisible(e.detail.visible);
    };

    window.addEventListener("mobileNavVisibility", handleNavVisibility as EventListener);
    return () => window.removeEventListener("mobileNavVisibility", handleNavVisibility as EventListener);
  }, []);

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

  // Load saved state
  useEffect(() => {
    const savedVolume = localStorage.getItem("radio_volume");
    const savedMuted = localStorage.getItem("radio_muted");
    const savedStation = localStorage.getItem("radio_station") as StationId | null;

    if (savedVolume) setVolume(parseFloat(savedVolume));
    if (savedMuted) setIsMuted(savedMuted === "true");
    if (savedStation && RADIO_STATIONS.some((s) => s.id === savedStation)) {
      setCurrentStation(savedStation);
      const stationData = RADIO_STATIONS.find((s) => s.id === savedStation);
      if (stationData) setSelectedGenre(stationData.genre);
    }
  }, []);

  // Autoplay on page load
  useEffect(() => {
    if (autoplayAttempted || !audioRef.current) return;

    const attemptAutoplay = async () => {
      setAutoplayAttempted(true);
      try {
        audioRef.current!.volume = isMuted ? 0 : volume;
        await audioRef.current!.play();
        setIsPlaying(true);
      } catch {
        // Autoplay blocked by browser - that's ok, user can click
        console.log("Autoplay blocked - click to play");
      }
    };

    // Wait for user interaction or try after delay
    const timer = setTimeout(attemptAutoplay, 500);
    return () => clearTimeout(timer);
  }, [autoplayAttempted, volume, isMuted]);

  // Save state
  useEffect(() => {
    localStorage.setItem("radio_volume", volume.toString());
    localStorage.setItem("radio_muted", isMuted.toString());
    localStorage.setItem("radio_station", currentStation);
  }, [volume, isMuted, currentStation]);

  // Initialize audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.crossOrigin = "anonymous";
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.src = station.url;
    }
  }, []);

  // Update audio source when station changes (but don't auto-play)
  useEffect(() => {
    if (audioRef.current && !isPlaying && audioRef.current.src !== station.url) {
      audioRef.current.src = station.url;
      audioRef.current.load();
    }
  }, [currentStation, station.url, isPlaying]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let errorTimeout: NodeJS.Timeout;

    const handleError = (e: Event) => {
      // Only show error if we were actually trying to play
      // Give stream 5 seconds to connect before showing error
      if (isLoading) {
        errorTimeout = setTimeout(() => {
          const audioError = audio.error;
          if (audioError) {
            console.error("Audio error:", audioError.code, audioError.message);
            setHasError(true);
            setIsPlaying(false);
            setIsLoading(false);
          }
        }, 5000);
      }
    };

    const handleCanPlay = () => {
      clearTimeout(errorTimeout);
      setHasError(false);
    };

    const handlePlaying = () => {
      clearTimeout(errorTimeout);
      setHasError(false);
      setIsLoading(false);
      setIsPlaying(true);
    };

    const handleWaiting = () => {
      // Stream is buffering, not an error
      clearTimeout(errorTimeout);
    };

    audio.addEventListener("error", handleError);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("waiting", handleWaiting);

    return () => {
      clearTimeout(errorTimeout);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("waiting", handleWaiting);
    };
  }, [isLoading]);

  const changeStation = async (stationId: StationId) => {
    haptic("selection");
    const wasPlaying = isPlaying;
    setHasError(false);
    setCurrentStation(stationId);

    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);

      if (wasPlaying) {
        setIsLoading(true);
        audioRef.current.src = RADIO_STATIONS.find((s) => s.id === stationId)!.url;
        audioRef.current.load();
        try {
          await audioRef.current.play();
        } catch {
          console.log("Playback failed");
          setHasError(true);
          setIsLoading(false);
        }
      }
    }
  };

  const nextStation = () => {
    const currentIndex = stationsInGenre.findIndex((s) => s.id === currentStation);
    const nextIndex = (currentIndex + 1) % stationsInGenre.length;
    changeStation(stationsInGenre[nextIndex].id);
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;
    
    const wasError = hasError;
    haptic("medium");
    setHasError(false);
    setHasAttemptedPlay(true);

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      const audio = audioRef.current;
      
      try {
        // If retrying after error, completely reset the audio element
        if (wasError) {
          audio.pause();
          audio.src = "";
          audio.load();
          // Small delay to ensure cleanup
          await new Promise((resolve) => setTimeout(resolve, 200));
        }

        // Set the source and ensure crossOrigin is set
        if (audio.src !== station.url || wasError) {
          audio.src = station.url;
          audio.crossOrigin = "anonymous";
          audio.volume = isMuted ? 0 : volume;
          audio.load();
        }

        // Wait for audio to be ready to play
        if (audio.readyState < 2) {
          await new Promise<void>((resolve, reject) => {
            const timeout = setTimeout(() => {
              cleanup();
              reject(new Error("Audio load timeout"));
            }, 8000);

            const cleanup = () => {
              clearTimeout(timeout);
              audio.removeEventListener("canplay", onCanPlay);
              audio.removeEventListener("canplaythrough", onCanPlay);
              audio.removeEventListener("error", onError);
            };

            const onCanPlay = () => {
              cleanup();
              resolve();
            };

            const onError = (e: Event) => {
              cleanup();
              reject(e);
            };

            audio.addEventListener("canplay", onCanPlay, { once: true });
            audio.addEventListener("canplaythrough", onCanPlay, { once: true });
            audio.addEventListener("error", onError, { once: true });
          });
        }

        await audio.play();
      } catch (error) {
        console.error("Playback failed:", error);
        haptic("error");
        setHasError(true);
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} preload="none" crossOrigin="anonymous" />

      {/* Position above mobile bottom nav - slides with nav visibility */}
      <motion.div
        className="fixed right-4 md:right-6 z-50 bottom-6"
        initial={false}
        animate={{
          bottom: isMobile ? (mobileNavVisible ? 96 : 24) : 24,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <AnimatePresence>
          {isExpanded && (
            <>
              {/* Mobile backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
                onClick={() => setIsExpanded(false)}
              />

              {/* Panel */}
              <motion.div
                ref={panelRef}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="fixed bottom-0 left-0 right-0 p-4 pb-8 bg-background border-t border-border rounded-t-2xl
                  md:absolute md:bottom-14 md:left-auto md:right-0 md:p-4 md:rounded-xl md:border md:shadow-2xl md:w-[320px]"
              >
                {/* Close button - mobile */}
                <button
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-3 right-3 p-2 text-foreground-subtle hover:text-foreground md:hidden"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between pr-8 md:pr-0">
                    <div className="flex items-center gap-3">
                      <Radio className="w-4 h-4 text-accent-red" />
                      <span className="text-sm font-medium text-foreground">SomaFM Radio</span>
                    </div>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2 rounded-lg text-foreground-subtle hover:text-foreground hover:bg-background-tertiary transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Genre tabs */}
                  <div className="relative flex gap-1 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
                    {GENRES.map((genre) => (
                      <button
                        key={genre}
                        onClick={() => {
                          setSelectedGenre(genre);
                          const firstInGenre = RADIO_STATIONS.find((s) => s.genre === genre);
                          if (firstInGenre && firstInGenre.id !== currentStation) {
                            changeStation(firstInGenre.id);
                          }
                        }}
                        className="relative px-3 py-1.5 rounded-full text-xs whitespace-nowrap z-10"
                      >
                        {selectedGenre === genre && (
                          <motion.div
                            layoutId="activeGenreTab"
                            className="absolute inset-0 bg-accent-red rounded-full"
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
                          />
                        )}
                        <span
                          className={`relative z-10 transition-colors ${
                            selectedGenre === genre
                              ? "text-white font-medium"
                              : "text-foreground-muted hover:text-foreground"
                          }`}
                        >
                          {genre}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Stations in selected genre */}
                  <div className="grid grid-cols-2 gap-2">
                    {stationsInGenre.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => changeStation(s.id)}
                        className={`px-3 py-2.5 rounded-lg text-sm text-left transition-all ${
                          currentStation === s.id
                            ? "bg-foreground text-background font-medium"
                            : "bg-background-tertiary text-foreground-muted hover:text-foreground hover:bg-background-secondary"
                        }`}
                      >
                        {s.name}
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
                      onChange={(e) => {
                        const v = parseFloat(e.target.value);
                        setVolume(v);
                        if (v > 0 && isMuted) setIsMuted(false);
                      }}
                      className="flex-1 h-1.5 bg-background-tertiary rounded-full appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full
                        [&::-moz-range-thumb]:bg-foreground [&::-moz-range-thumb]:border-0"
                    />
                    <span className="text-xs text-foreground-subtle w-8 text-right tabular-nums">
                      {Math.round((isMuted ? 0 : volume) * 100)}%
                    </span>
                  </div>

                  {/* Controls */}
                  <div className="flex gap-2">
                    <button
                      onClick={togglePlay}
                      disabled={isLoading}
                      className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                        isPlaying
                          ? "bg-accent-red/10 text-accent-red border border-accent-red/30"
                          : hasAttemptedPlay && hasError
                          ? "bg-red-500/10 text-red-400 border border-red-500/30"
                          : "bg-foreground text-background hover:opacity-90"
                      }`}
                    >
                      {isLoading ? (
                        <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                          Connecting...
                        </motion.span>
                      ) : hasAttemptedPlay && hasError ? (
                        <span className="text-sm">Retry</span>
                      ) : isPlaying ? (
                        <>
                          <Pause className="w-4 h-4" />
                          <span className="text-sm">Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          <span className="text-sm">Play</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={nextStation}
                      className="p-3 rounded-xl bg-background-tertiary text-foreground-muted hover:text-foreground hover:bg-background-secondary transition-all"
                      title="Next station"
                    >
                      <SkipForward className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Now playing */}
                  {isPlaying && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-center gap-2 text-xs text-foreground-subtle"
                    >
                      <AudioVisualizer isPlaying={true} />
                      <span>Now playing: {station.name}</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Floating button */}
        <motion.button
          ref={buttonRef}
          onClick={() => {
            haptic("light");
            setIsExpanded(!isExpanded);
          }}
          className={`relative p-3.5 rounded-full border-2 transition-all ${
            isPlaying
              ? "bg-accent-red border-accent-red/80 text-white shadow-lg shadow-accent-red/30"
              : "bg-foreground text-background border-foreground shadow-xl hover:scale-105"
          }`}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? (
            <div className="w-5 h-5 flex items-center justify-center">
              <AudioVisualizer isPlaying={true} light={true} />
            </div>
          ) : (
            <Radio className="w-5 h-5" />
          )}

          {isPlaying && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-accent-red/60"
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.button>
      </motion.div>
    </>
  );
}
