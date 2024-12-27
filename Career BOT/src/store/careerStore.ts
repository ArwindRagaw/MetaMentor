import { create } from 'zustand';
import { UserProfile } from '../types/user';

interface CareerState {
  selectedPath: string | null;
  skills: string[];
  userProfile: UserProfile | null;
  setSelectedPath: (path: string) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  setUserProfile: (profile: UserProfile) => void;
}

export const useCareerStore = create<CareerState>((set) => ({
  selectedPath: null,
  skills: [],
  userProfile: null,
  setSelectedPath: (path) => set({ selectedPath: path }),
  addSkill: (skill) => set((state) => ({ skills: [...state.skills, skill] })),
  removeSkill: (skill) => 
    set((state) => ({ skills: state.skills.filter((s) => s !== skill) })),
  setUserProfile: (profile) => set({ userProfile: profile }),
}));