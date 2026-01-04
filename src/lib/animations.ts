import type { Transition, Variants } from "framer-motion";

// ============================================================================
// SPRING CONFIGS
// ============================================================================

export const springs = {
  // Snappy interactions (buttons, hover states)
  snappy: { type: "spring", stiffness: 400, damping: 25 } as const,

  // Smooth content transitions
  smooth: { type: "spring", stiffness: 200, damping: 20 } as const,

  // Gentle, slow movements
  gentle: { type: "spring", stiffness: 100, damping: 20 } as const,

  // Bouncy effects (easter eggs, celebrations)
  bouncy: { type: "spring", stiffness: 300, damping: 10 } as const,

  // Heavy, sluggish movements
  heavy: { type: "spring", stiffness: 100, damping: 30 } as const,

  // Card tilt/3D effects
  tilt: { stiffness: 150, damping: 15, mass: 0.1 } as const,
} satisfies Record<string, Transition>;

// ============================================================================
// EASING CURVES
// ============================================================================

export const easings = {
  // Default ease-out
  out: [0.25, 0.1, 0.25, 1] as const,

  // Smooth ease-in-out
  inOut: [0.4, 0, 0.2, 1] as const,

  // Expo-style ease
  expo: [0.21, 0.47, 0.32, 0.98] as const,

  // Back ease (slight overshoot)
  back: [0.34, 1.56, 0.64, 1] as const,
};

// ============================================================================
// DURATION PRESETS
// ============================================================================

export const durations = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
};

// ============================================================================
// COMMON TRANSITIONS
// ============================================================================

export const transitions = {
  // Fade in
  fadeIn: {
    duration: durations.normal,
    ease: easings.out,
  } as Transition,

  // Slide up fade
  slideUp: {
    duration: durations.slow,
    ease: easings.expo,
  } as Transition,

  // Staggered children
  stagger: (staggerDelay = 0.1) => ({
    staggerChildren: staggerDelay,
  }),
} as const;

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

export const variants = {
  // Fade in from bottom
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  } satisfies Variants,

  // Fade in from left
  fadeLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  } satisfies Variants,

  // Fade in from right
  fadeRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  } satisfies Variants,

  // Scale fade
  scaleFade: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  } satisfies Variants,

  // Pop in (scale from center)
  popIn: {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
  } satisfies Variants,

  // Container for staggered children
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  } satisfies Variants,

  // List item variant (for use with staggerContainer)
  listItem: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.slow,
        ease: easings.expo,
      },
    },
  } satisfies Variants,
} as const;

// ============================================================================
// HOVER ANIMATIONS
// ============================================================================

export const hover = {
  // Subtle lift
  lift: {
    y: -2,
    transition: { duration: durations.fast },
  },

  // Scale up
  scale: {
    scale: 1.02,
    transition: { duration: durations.fast },
  },

  // Glow effect (for use with opacity)
  glow: {
    opacity: 1,
    transition: { duration: durations.normal },
  },
} as const;

// ============================================================================
// TAP ANIMATIONS
// ============================================================================

export const tap = {
  scale: { scale: 0.98 },
  shrink: { scale: 0.95 },
} as const;

// ============================================================================
// VIEWPORT CONFIG
// ============================================================================

export const viewport = {
  // Default - trigger once when in view
  once: { once: true, margin: "-50px" },

  // Trigger every time
  always: { once: false, margin: "-50px" },

  // Trigger earlier (larger margin)
  eager: { once: true, margin: "-100px" },
} as const;

// ============================================================================
// DELAY HELPERS
// ============================================================================

export const staggerDelay = (index: number, baseDelay = 0, increment = 0.1) =>
  baseDelay + index * increment;
