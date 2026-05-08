export const appConfig = {
  name: 'Dopamine',
  description: 'Discipline made emotionally satisfying',
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  },
} as const;
