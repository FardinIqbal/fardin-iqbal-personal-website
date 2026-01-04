"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Play, Pause, SkipForward, Volume2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Station {
  id: string;
  name: string;
  url: string;
  genre: string;
}

const STATIONS: Station[] = [
  { id: "groovesalad", name: "Groove Salad", url: "https://ice1.somafm.com/groovesalad-128-mp3", genre: "Chill" },
  { id: "lush", name: "Lush", url: "https://ice1.somafm.com/lush-128-mp3", genre: "Chill" },
  { id: "dronezone", name: "Drone Zone", url: "https://ice1.somafm.com/dronezone-128-mp3", genre: "Chill" },
  { id: "deepspace", name: "Deep Space", url: "https://ice1.somafm.com/deepspaceone-128-mp3", genre: "Electronic" },
  { id: "beatblender", name: "Beat Blender", url: "https://ice1.somafm.com/beatblender-128-mp3", genre: "Electronic" },
  { id: "spacestation", name: "Space Station", url: "https://ice1.somafm.com/spacestation-128-mp3", genre: "Electronic" },
  { id: "poptron", name: "PopTron", url: "https://ice1.somafm.com/poptron-128-mp3", genre: "Pop" },
  { id: "covers", name: "Covers", url: "https://ice1.somafm.com/covers-128-mp3", genre: "Pop" },
  { id: "seventies", name: "70s Hits", url: "https://ice1.somafm.com/seventies-128-mp3", genre: "Pop" },
  { id: "illstreet", name: "Ill Street", url: "https://ice1.somafm.com/illstreet-128-mp3", genre: "Hip Hop" },
  { id: "dubstep", name: "Dub Step", url: "https://ice1.somafm.com/dubstep-128-mp3", genre: "Hip Hop" },
  { id: "indiepop", name: "Indie Pop", url: "https://ice1.somafm.com/indiepop-128-mp3", genre: "Rock" },
  { id: "metal", name: "Metal", url: "https://ice1.somafm.com/metal-128-mp3", genre: "Rock" },
  { id: "defcon", name: "DEF CON", url: "https://ice1.somafm.com/defcon-128-mp3", genre: "Rock" },
];

const GENRES = ["Chill", "Electronic", "Pop", "Hip Hop", "Rock"];

export function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentGenre, setCurrentGenre] = useState("Chill");
  const [currentStation, setCurrentStation] = useState<Station>(STATIONS[0]);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load settings from localStorage
  useEffect(() => {
    const savedVolume = localStorage.getItem("essay-music-volume");
    const savedStation = localStorage.getItem("essay-music-station");

    if (savedVolume) {
      setVolume(parseFloat(savedVolume));
    }

    if (savedStation) {
      const station = STATIONS.find((s) => s.id === savedStation);
      if (station) {
        setCurrentStation(station);
        setCurrentGenre(station.genre);
      }
    }
  }, []);

  // Update volume when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = async () => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.crossOrigin = "anonymous";
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        audioRef.current.src = currentStation.url;
        audioRef.current.volume = volume;
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (e) {
        console.error("Playback failed:", e);
      }
    }
  };

  const changeStation = async (station: Station) => {
    setCurrentStation(station);
    localStorage.setItem("essay-music-station", station.id);

    if (isPlaying && audioRef.current) {
      try {
        audioRef.current.src = station.url;
        audioRef.current.volume = volume;
        await audioRef.current.play();
      } catch (e) {
        console.error("Playback failed:", e);
      }
    }
  };

  const skipStation = () => {
    const filteredStations = STATIONS.filter((s) => s.genre === currentGenre);
    const currentIndex = filteredStations.findIndex((s) => s.id === currentStation.id);
    const nextIndex = (currentIndex + 1) % filteredStations.length;
    changeStation(filteredStations[nextIndex]);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    localStorage.setItem("essay-music-volume", String(newVolume));
  };

  const handleGenreChange = (genre: string) => {
    setCurrentGenre(genre);
    const firstInGenre = STATIONS.find((s) => s.genre === genre);
    if (firstInGenre) {
      changeStation(firstInGenre);
    }
  };

  const filteredStations = STATIONS.filter((s) => s.genre === currentGenre);

  return (
    <>
      {/* FAB Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full",
          "border-2 transition-all relative",
          "flex items-center justify-center",
          "shadow-lg hover:shadow-xl",
          isPlaying
            ? "bg-blue-500 border-blue-500 text-white hover:bg-blue-600"
            : "bg-background-tertiary border-border text-foreground hover:border-foreground/20 hover:scale-105"
        )}
        aria-label="Music player"
      >
        {isPlaying ? (
          <Visualizer />
        ) : (
          <Music className="w-5 h-5" />
        )}
        {isPlaying && (
          <motion.div
            className="absolute inset-[-4px] rounded-full border-2 border-blue-500"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 1.4, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Music Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 z-40 w-80 max-w-[calc(100vw-3rem)]"
          >
            <div className="bg-background-tertiary border border-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-blue-500" />
                  <h3 className="text-sm font-medium text-foreground">SomaFM Radio</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-foreground-subtle hover:text-foreground hover:bg-foreground/5 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 space-y-4">
                {/* Genre Tabs */}
                <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
                  {GENRES.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => handleGenreChange(genre)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all",
                        currentGenre === genre
                          ? "bg-blue-500 text-white"
                          : "bg-foreground/5 text-foreground-muted hover:text-foreground"
                      )}
                    >
                      {genre}
                    </button>
                  ))}
                </div>

                {/* Station Grid */}
                <div className="grid grid-cols-2 gap-2">
                  {filteredStations.map((station) => (
                    <button
                      key={station.id}
                      onClick={() => changeStation(station)}
                      className={cn(
                        "px-3 py-2.5 rounded-lg border text-left text-xs font-medium transition-all",
                        currentStation.id === station.id
                          ? "bg-foreground text-background border-foreground"
                          : "border-border text-foreground-muted hover:text-foreground hover:border-foreground/20"
                      )}
                    >
                      {station.name}
                    </button>
                  ))}
                </div>

                {/* Volume */}
                <div className="flex items-center gap-3">
                  <Volume2 className="w-4 h-4 text-foreground-subtle flex-shrink-0" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="flex-1 h-1 bg-border rounded-full appearance-none cursor-pointer accent-foreground"
                  />
                  <span className="text-xs font-mono text-foreground-subtle w-8 text-right">
                    {Math.round(volume * 100)}%
                  </span>
                </div>

                {/* Play Controls */}
                <div className="flex gap-2">
                  <button
                    onClick={togglePlay}
                    className={cn(
                      "flex-1 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all",
                      isPlaying
                        ? "bg-blue-500 text-white"
                        : "bg-foreground text-background"
                    )}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Play
                      </>
                    )}
                  </button>
                  <button
                    onClick={skipStation}
                    className="w-12 rounded-xl border border-border text-foreground-muted hover:text-foreground hover:border-foreground/20 transition-all flex items-center justify-center"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>

                {/* Now Playing */}
                {isPlaying && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="pt-3 border-t border-border flex items-center justify-center gap-2 text-xs text-foreground-subtle"
                  >
                    <MiniVisualizer />
                    <span>Now playing: {currentStation.name}</span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Visualizer() {
  return (
    <div className="flex items-end justify-center gap-0.5 h-4">
      {[0, 0.08, 0.16, 0.24, 0.32].map((delay, i) => (
        <motion.div
          key={i}
          className="w-0.5 bg-current rounded-full"
          animate={{
            height: ["4px", "16px", "8px", "14px", "4px"],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay,
          }}
        />
      ))}
    </div>
  );
}

function MiniVisualizer() {
  return (
    <div className="flex items-end justify-center gap-0.5 h-3">
      {[0, 0.1, 0.2].map((delay, i) => (
        <motion.div
          key={i}
          className="w-0.5 bg-blue-500 rounded-full"
          animate={{
            height: ["3px", "12px", "6px", "10px", "3px"],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay,
          }}
        />
      ))}
    </div>
  );
}
