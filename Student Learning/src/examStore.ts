import { create } from 'zustand';

interface ExamStore {
  stream: MediaStream | null;
  setStream: (stream: MediaStream) => void;
}

export const useExamStore = create<ExamStore>((set) => ({
  stream: null,
  setStream: (stream) => set({ stream }),
})); 