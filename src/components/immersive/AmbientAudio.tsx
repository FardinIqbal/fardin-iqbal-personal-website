"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useMood } from "./MoodSystem";

// Note frequencies for different keys
const noteFrequencies: Record<string, number[]> = {
  C: [261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88],
  D: [293.66, 329.63, 369.99, 392.0, 440.0, 493.88, 554.37],
  E: [329.63, 369.99, 415.3, 440.0, 493.88, 554.37, 622.25],
  F: [349.23, 392.0, 440.0, 466.16, 523.25, 587.33, 659.25],
  G: [392.0, 440.0, 493.88, 523.25, 587.33, 659.25, 739.99],
  A: [440.0, 493.88, 554.37, 587.33, 659.25, 739.99, 830.61],
};

interface AmbientAudioProps {
  enabled?: boolean;
  onToggle?: (enabled: boolean) => void;
}

export function AmbientAudio({ enabled: controlledEnabled, onToggle }: AmbientAudioProps) {
  const { audio: audioConfig, palette } = useMood();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const enabled = controlledEnabled ?? isPlaying;

  // Initialize audio context
  const initAudio = useCallback(async () => {
    if (audioContextRef.current) return;

    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    audioContextRef.current = new AudioContext();

    // Create gain node for volume control
    gainNodeRef.current = audioContextRef.current.createGain();
    gainNodeRef.current.gain.value = volume * 0.1; // Keep it subtle
    gainNodeRef.current.connect(audioContextRef.current.destination);

    setIsLoaded(true);
  }, [volume]);

  // Create ambient drone
  const createDrone = useCallback(() => {
    if (!audioContextRef.current || !gainNodeRef.current) return;

    const ctx = audioContextRef.current;
    const notes = noteFrequencies[audioConfig.key] || noteFrequencies.C;

    // Create multiple detuned oscillators for richness
    const oscillators: OscillatorNode[] = [];

    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.value = notes[0] / (2 ** (i + 1)); // Lower octaves
      osc.detune.value = (Math.random() - 0.5) * 10; // Slight detune for warmth

      oscGain.gain.value = 0.1 / (i + 1); // Quieter for higher partials

      osc.connect(oscGain);
      oscGain.connect(gainNodeRef.current!);
      osc.start();

      oscillators.push(osc);
    }

    oscillatorsRef.current = oscillators;
  }, [audioConfig.key]);

  // Play random notes periodically
  const playNote = useCallback(() => {
    if (!audioContextRef.current || !gainNodeRef.current) return;

    const ctx = audioContextRef.current;
    const notes = noteFrequencies[audioConfig.key] || noteFrequencies.C;
    const note = notes[Math.floor(Math.random() * notes.length)];

    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.value = note;

    // Envelope
    const now = ctx.currentTime;
    oscGain.gain.setValueAtTime(0, now);
    oscGain.gain.linearRampToValueAtTime(0.05, now + 0.5);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 4);

    osc.connect(oscGain);
    oscGain.connect(gainNodeRef.current!);

    osc.start(now);
    osc.stop(now + 4);
  }, [audioConfig.key]);

  // Start ambient audio
  const startAudio = useCallback(async () => {
    await initAudio();

    if (audioContextRef.current?.state === "suspended") {
      await audioContextRef.current.resume();
    }

    createDrone();

    // Play notes at intervals based on tempo
    const interval = (60 / audioConfig.tempo) * 2000; // Convert BPM to ms
    intervalRef.current = setInterval(playNote, interval);

    setIsPlaying(true);
    onToggle?.(true);
  }, [initAudio, createDrone, playNote, audioConfig.tempo, onToggle]);

  // Stop ambient audio
  const stopAudio = useCallback(() => {
    oscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop();
      } catch {
        // Already stopped
      }
    });
    oscillatorsRef.current = [];

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setIsPlaying(false);
    onToggle?.(false);
  }, [onToggle]);

  // Toggle audio
  const toggleAudio = useCallback(() => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  }, [isPlaying, startAudio, stopAudio]);

  // Update volume
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume * 0.1;
    }
  }, [volume]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAudio();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [stopAudio]);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            className="overflow-hidden"
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
              style={{
                accentColor: `rgb(${palette.primary})`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleAudio}
        className="p-3 rounded-full backdrop-blur-sm border transition-colors"
        style={{
          background: isPlaying ? `rgba(${palette.primary}, 0.2)` : "rgba(255,255,255,0.1)",
          borderColor: isPlaying ? `rgba(${palette.primary}, 0.5)` : "rgba(255,255,255,0.2)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={isPlaying ? "Mute ambient audio" : "Play ambient audio"}
      >
        {isPlaying ? (
          <Volume2 size={20} style={{ color: `rgb(${palette.primary})` }} />
        ) : (
          <VolumeX size={20} className="text-white/60" />
        )}
      </motion.button>

      {/* Audio visualizer dots */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            className="flex gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1 h-1 rounded-full"
                style={{ background: `rgb(${palette.primary})` }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
