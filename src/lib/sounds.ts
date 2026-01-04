"use client";

// Subtle UI sound effects using Web Audio API
// Sounds are generated programmatically - no audio files needed

let audioContext: AudioContext | null = null;
let isSoundEnabled = false;

// Initialize audio context on user interaction
export function initSounds() {
  if (typeof window === "undefined") return;
  
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  
  // Check localStorage for sound preference
  const stored = localStorage.getItem("portfolio-sounds");
  isSoundEnabled = stored === "true";
  
  return audioContext;
}

export function toggleSounds(enabled?: boolean) {
  isSoundEnabled = enabled ?? !isSoundEnabled;
  localStorage.setItem("portfolio-sounds", String(isSoundEnabled));
  return isSoundEnabled;
}

export function getSoundEnabled() {
  return isSoundEnabled;
}

// Generate a soft click sound
function createClick(ctx: AudioContext, frequency = 1200, duration = 0.05) {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.5, ctx.currentTime + duration);
  
  gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration);
}

// Generate a soft pop sound
function createPop(ctx: AudioContext) {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(400, ctx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.1);
  
  gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
  
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.1);
}

// Generate a subtle whoosh
function createWhoosh(ctx: AudioContext) {
  const bufferSize = ctx.sampleRate * 0.15;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  
  const source = ctx.createBufferSource();
  const gainNode = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  
  source.buffer = buffer;
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(2000, ctx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);
  
  source.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  gainNode.gain.setValueAtTime(0.03, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
  
  source.start(ctx.currentTime);
}

// Play different sound types
export type SoundType = "click" | "pop" | "whoosh" | "hover" | "success";

export function playSound(type: SoundType = "click") {
  if (!isSoundEnabled || !audioContext) return;
  
  // Ensure audio context is running
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  
  switch (type) {
    case "click":
      createClick(audioContext, 1200, 0.05);
      break;
    case "pop":
      createPop(audioContext);
      break;
    case "whoosh":
      createWhoosh(audioContext);
      break;
    case "hover":
      createClick(audioContext, 800, 0.03);
      break;
    case "success":
      createClick(audioContext, 800, 0.08);
      setTimeout(() => {
        if (audioContext) createClick(audioContext, 1200, 0.08);
      }, 100);
      break;
  }
}
