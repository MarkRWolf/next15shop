// src/store/useNavigationStore.ts
import { create } from "zustand";

interface NaviState {
  isNavigating: boolean;
  startNavigating: () => void;
}

const useNaviStore = create<NaviState>()((set) => ({
  isNavigating: false,
  startNavigating: () => {
    set({ isNavigating: true });
    setTimeout(() => set({ isNavigating: false }), 300);
  },
}));

export default useNaviStore;
