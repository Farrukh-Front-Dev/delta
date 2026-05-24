import { create } from 'zustand';

export interface User {
  id: string;
  email: string;
  name: string | null;
  xp: number;
  level: number;
  streak: number;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  addXp: (amount: number) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  addXp: (amount) =>
    set((state) => {
      if (!state.user) return state;
      const newXp = state.user.xp + amount;
      const newLevel = Math.floor(newXp / 100) + 1;
      return {
        user: {
          ...state.user,
          xp: newXp,
          level: newLevel,
        },
      };
    }),
}));
