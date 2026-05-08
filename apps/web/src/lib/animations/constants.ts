// Spring physics configurations
export const SPRING_CONFIGS = {
  smooth: {
    type: 'spring' as const,
    stiffness: 280,
    damping: 30,
    mass: 1,
  },
  tactile: {
    type: 'spring' as const,
    stiffness: 600,
    damping: 28,
    mass: 0.8,
  },
  weighty: {
    type: 'spring' as const,
    stiffness: 180,
    damping: 28,
    mass: 1.2,
  },
  snappy: {
    type: 'spring' as const,
    stiffness: 500,
    damping: 35,
    mass: 0.6,
  },
} as const;

// Animation durations (in seconds)
export const DURATIONS = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  slow: 0.4,
  slower: 0.5,
} as const;

// Easing curves
export const EASINGS = {
  premiumOut: [0.16, 1, 0.3, 1] as const,
  smoothEase: [0.25, 0.1, 0.25, 1] as const,
  easeOut: [0.16, 1, 0.3, 1] as const,
  easeInOut: [0.43, 0.13, 0.23, 0.96] as const,
} as const;

// Choreography timing (in milliseconds)
export const TIMING = {
  checkboxResponse: 0,
  xpCounterStart: 100,
  celebrationDelay: 150,
  taskExitDuration: 400,
  glowPeak: 500,
} as const;
