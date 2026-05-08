export const spacing = {
  xs: '0.5rem',    // 8px
  sm: '0.75rem',   // 12px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  '4xl': '6rem',   // 96px
} as const;

export const colors = {
  background: {
    primary: '#000000',
    secondary: '#0a0a0a',
    tertiary: '#141414',
  },
  text: {
    primary: '#ffffff',
    secondary: '#a1a1a1',
    tertiary: '#6b6b6b',
  },
  accent: {
    primary: '#8b5cf6',
    secondary: '#a78bfa',
    glow: 'rgba(139, 92, 246, 0.5)',
  },
  success: {
    primary: '#10b981',
    glow: 'rgba(16, 185, 129, 0.5)',
  },
  border: {
    subtle: '#1f1f1f',
    medium: '#2a2a2a',
  },
} as const;

export const typography = {
  fontFamily: {
    sans: 'var(--font-geist-sans)',
    mono: 'var(--font-geist-mono)',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

export const borderRadius = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  glow: {
    purple: {
      sm: '0 0 12px rgba(139, 92, 246, 0.3)',
      md: '0 0 20px rgba(139, 92, 246, 0.3)',
      lg: '0 0 30px rgba(139, 92, 246, 0.4)',
      xl: '0 0 40px rgba(139, 92, 246, 0.5)',
    },
    green: {
      sm: '0 0 12px rgba(16, 185, 129, 0.3)',
      md: '0 0 20px rgba(16, 185, 129, 0.3)',
    },
  },
} as const;
