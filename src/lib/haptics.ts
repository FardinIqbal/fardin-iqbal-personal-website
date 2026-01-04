/**
 * Haptic Feedback Utility
 * Uses the Vibration API for tactile feedback on mobile devices
 */

type HapticPattern = "light" | "medium" | "heavy" | "success" | "error" | "warning" | "selection";

const patterns: Record<HapticPattern, number | number[]> = {
  light: 10,
  medium: 25,
  heavy: 50,
  success: [30, 50, 30],      // Double tap - satisfying
  error: [50, 30, 50, 30, 50], // Rapid buzz - attention
  warning: [40, 100, 40],      // Pause in middle
  selection: 15,               // Quick tap for selections
};

/**
 * Check if haptic feedback is supported
 */
export function isHapticSupported(): boolean {
  return typeof navigator !== "undefined" && "vibrate" in navigator;
}

/**
 * Trigger haptic feedback
 * @param pattern - The haptic pattern to use
 */
export function haptic(pattern: HapticPattern = "light"): void {
  if (!isHapticSupported()) return;

  try {
    navigator.vibrate(patterns[pattern]);
  } catch {
    // Silently fail if vibration not allowed
  }
}

/**
 * React hook for haptic feedback
 */
export function useHaptic() {
  return {
    light: () => haptic("light"),
    medium: () => haptic("medium"),
    heavy: () => haptic("heavy"),
    success: () => haptic("success"),
    error: () => haptic("error"),
    warning: () => haptic("warning"),
    selection: () => haptic("selection"),
    trigger: haptic,
    isSupported: isHapticSupported(),
  };
}
