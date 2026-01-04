"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { initSounds, toggleSounds, getSoundEnabled, playSound } from "@/lib/sounds";
import { haptic } from "@/lib/haptics";

interface SoundToggleProps {
  className?: string;
}

export function SoundToggle({ className }: SoundToggleProps) {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    initSounds();
    setEnabled(getSoundEnabled());
  }, []);

  const handleToggle = () => {
    haptic("selection");
    const newState = toggleSounds();
    setEnabled(newState);
    
    // Play a sound to confirm it's working
    if (newState) {
      playSound("success");
    }
  };

  if (!mounted) return null;

  return (
    <motion.button
      onClick={handleToggle}
      className={cn(
        "p-2 rounded-lg text-foreground-muted hover:text-foreground hover:bg-foreground/5 transition-colors",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={enabled ? "Disable UI sounds" : "Enable UI sounds"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: enabled ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {enabled ? (
          <Volume2 className="w-5 h-5" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </motion.div>
    </motion.button>
  );
}
