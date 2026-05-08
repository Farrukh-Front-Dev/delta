// Audio feedback system using Web Audio API
// All sounds are synthesized for consistency and small bundle size

let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
  }
  return audioContext;
};

// Soft completion tick - subtle, premium feel
const playTaskComplete = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  // Create oscillator for the "tick"
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  // Soft, high-pitched tick
  osc.frequency.setValueAtTime(1200, now);
  osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);

  // Quick fade out
  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

  osc.start(now);
  osc.stop(now + 0.08);
};

// Subtle XP gain chime - rewarding but not aggressive
const playXpGain = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  // Two-tone chime
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);

  // Harmonious frequencies
  osc1.frequency.setValueAtTime(800, now);
  osc2.frequency.setValueAtTime(1200, now);

  // Soft volume
  gain.gain.setValueAtTime(0.06, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 0.15);
  osc2.stop(now + 0.15);
};

// Ambient energy pulse - very subtle background hum
const playEnergyPulse = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  // Low, warm frequency
  osc.frequency.setValueAtTime(200, now);
  osc.type = 'sine';

  // Very quiet
  gain.gain.setValueAtTime(0.02, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

  osc.start(now);
  osc.stop(now + 0.3);
};

// Hover feedback - extremely subtle
const playHover = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.frequency.setValueAtTime(600, now);
  gain.gain.setValueAtTime(0.02, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

  osc.start(now);
  osc.stop(now + 0.05);
};

export const playSound = (sound: 'taskComplete' | 'xpGain' | 'energyPulse' | 'hover') => {
  try {
    switch (sound) {
      case 'taskComplete':
        playTaskComplete();
        break;
      case 'xpGain':
        playXpGain();
        break;
      case 'energyPulse':
        playEnergyPulse();
        break;
      case 'hover':
        playHover();
        break;
    }
  } catch (error) {
    // Silently fail if audio context is not available
    console.debug('Audio playback failed:', error);
  }
};

// Initialize audio context on first user interaction
export const initAudio = () => {
  if (!audioContext) {
    getAudioContext();
  }
};
