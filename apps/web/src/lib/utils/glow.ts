import { colors } from '@/styles/tokens';

export const glowStyles = {
  purple: {
    boxShadow: `0 0 20px ${colors.accent.glow}, 0 0 40px ${colors.accent.glow}`,
  },
  green: {
    boxShadow: `0 0 20px ${colors.success.glow}, 0 0 40px ${colors.success.glow}`,
  },
  subtle: {
    boxShadow: `0 0 10px ${colors.accent.glow}`,
  },
} as const;

export const getGlowClass = (color: 'purple' | 'green' = 'purple') => {
  return color === 'purple'
    ? 'shadow-[0_0_20px_rgba(139,92,246,0.3)]'
    : 'shadow-[0_0_20px_rgba(16,185,129,0.3)]';
};
