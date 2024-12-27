import { create } from 'zustand';

interface ExamStore {
  isExamActive: boolean;
  recordings: Blob[];
  stream: MediaStream | null;
  setExamActive: (active: boolean) => void;
  submitExam: () => Promise<void>;
  addRecording: (recording: Blob) => void;
  setStream: (stream: MediaStream | null) => void;
}

export const useExamStore = create<ExamStore>((set) => ({
  isExamActive: false,
  recordings: [],
  stream: null,
  setExamActive: (active) => set({ isExamActive: active }),
  submitExam: async () => {
    set({ isExamActive: false });
    set({ stream: null });
  },
  addRecording: (recording) => 
    set((state) => ({ recordings: [...state.recordings, recording] })),
  setStream: (stream) => set({ stream }),
})); 