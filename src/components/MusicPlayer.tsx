"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Play, Pause, Radio, X, SkipForward } from "lucide-react";

// Real radio stations with actual songs
const RADIO_STATIONS = [
  // Lofi / Chill
  { id: "lofi", name: "Lofi Hip Hop", url: "https://streams.ilovemusic.de/iloveradio17.mp3", genre: "Chill" },
  { id: "chillhop", name: "Chillhop", url: "https://streams.ilovemusic.de/iloveradio-chillhop.mp3", genre: "Chill" },

  // Electronic / Dance
  { id: "deephouse", name: "Deep House", url: "https://streams.ilovemusic.de/iloveradio16.mp3", genre: "Electronic" },
  { id: "techno", name: "Techno", url: "https://streams.ilovemusic.de/iloveradio6.mp3", genre: "Electronic" },
  { id: "trance", name: "Trance", url: "https://streams.ilovemusic.de/iloveradio15.mp3", genre: "Electronic" },

  // Pop / Hits
  { id: "hits", name: "Top Hits", url: "https://streams.ilovemusic.de/iloveradio1.mp3", genre: "Pop" },
  { id: "2000s", name: "2000s Hits", url: "https://streams.ilovemusic.de/iloveradio12.mp3", genre: "Pop" },
  { id: "90s", name: "90s Hits", url: "https://streams.ilovemusic.de/iloveradio10.mp3", genre: "Pop" },

  // Hip Hop / R&B
  { id: "hiphop", name: "Hip Hop", url: "https://streams.ilovemusic.de/iloveradio3.mp3", genre: "Hip Hop" },
  { id: "rnb", name: "R&B", url: "https://streams.ilovemusic.de/iloveradio-rnb.mp3", genre: "Hip Hop" },

  // Rock / Alternative
  { id: "rock", name: "Rock Classics", url: "https://streams.ilovemusic.de/iloveradio21.mp3", genre: "Rock" },
  { id: "alternative", name: "Alternative", url: "https://streams.ilovemusic.de/iloveradio-alternative.mp3", genre: "Rock" },
] as const;

type StationId = (typeof RADIO_STATIONS)[number]["id"];
type Genre = (typeof RADIO_STATIONS)[number]["genre"];

const GENRES = ["Chill", "Electronic", "Pop", "Hip Hop", "Rock"] as const;

function AudioVisualizer({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="flex items-end justify-center gap-0.5 h-4">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="w-0.5 bg-emerald-500 rounded-full"
          animate={
            isPlaying
              ? { height: [4, 14, 6, 12, 8, 4] }
              : { height: 4 }
          }
          transition={
            isPlaying
              ? { duration: 0.8, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }
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
  const [currentStation, setCurrentStation] = useState<StationId>("lofi");
  const [selectedGenre, setSelectedGenre] = useState<Genre>("Chill");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const station = RADIO_STATIONS.find((s) => s.id === currentStation)!;
  const stationsInGenre = RADIO_STATIONS.filter((s) => s.genre === selectedGenre);

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

  // Save state
  useEffect(() => {
    localStorage.setItem("radio_volume", volume.toString());
    localStorage.setItem("radio_muted", isMuted.toString());
    localStorage.setItem("radio_station", currentStation);
  }, [volume, isMuted, currentStation]);

  // Update volume
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

    const handleCanPlay = () => setHasError(false);
    const handlePlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
    };

    audio.addEventListener("error", handleError);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("playing", handlePlaying);

    return () => {
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("playing", handlePlaying);
    };
  }, []);

  const changeStation = async (stationId: StationId) => {
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
        } catch (error) {
          console.log("Playback failed:", error);
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
    setHasError(false);

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      try {
        await audioRef.current.play();
      } catch (error) {
        console.log("Playback failed:", error);
        setHasError(true);
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src={station.url} preload="none" />

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
                  sm:absolute sm:bottom-14 sm:left-auto sm:right-0 sm:p-4 sm:rounded-xl sm:border sm:shadow-2xl sm:w-[320px]"
              >
                {/* Close button - mobile */}
                <button
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-3 right-3 p-2 text-foreground-subtle hover:text-foreground sm:hidden"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between pr-8 sm:pr-0">
                    <div className="flex items-center gap-3">
                      <Radio className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-medium text-foreground">Radio</span>
                    </div>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2 rounded-lg text-foreground-subtle hover:text-foreground hover:bg-background-tertiary transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Genre tabs */}
                  <div className="flex gap-1 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
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
                        className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
                          selectedGenre === genre
                            ? "bg-emerald-500 text-white font-medium"
                            : "bg-background-tertiary text-foreground-muted hover:text-foreground"
                        }`}
                      >
                        {genre}
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
                          ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/30"
                          : hasError
                          ? "bg-red-500/10 text-red-400 border border-red-500/30"
                          : "bg-foreground text-background hover:opacity-90"
                      }`}
                    >
                      {isLoading ? (
                        <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                          Connecting...
                        </motion.span>
                      ) : hasError ? (
                        <span className="text-sm">Unavailable</span>
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
          onClick={() => setIsExpanded(!isExpanded)}
          className={`relative p-3 rounded-full border transition-all shadow-lg ${
            isPlaying
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
              : "bg-background border-border text-foreground-muted hover:text-foreground hover:border-foreground-subtle"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? (
            <div className="w-5 h-5 flex items-center justify-center">
              <AudioVisualizer isPlaying={true} />
            </div>
          ) : (
            <Radio className="w-5 h-5" />
          )}

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
