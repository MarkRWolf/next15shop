// src/store/naviStore.ts
import { create } from "zustand";

interface NaviState {
  progress: number;
  status: "idle" | "loading" | "complete";
  startNavi: () => void;
  setProgress: (value: number | ((prev: number) => number)) => void;
  finishNavi: () => void;
  resetNaviState: () => void;
}

const useNaviStore = create<NaviState>((set) => ({
  progress: 0,
  status: "idle",
  startNavi: () => set({ status: "loading", progress: 0 }),
  setProgress: (value) =>
    set((state) => ({
      progress: typeof value === "function" ? value(state.progress) : value,
    })),
  finishNavi: () => set({ progress: 100, status: "complete" }),
  resetNaviState: () => set({ progress: 0, status: "idle" }),
}));

export default useNaviStore;
