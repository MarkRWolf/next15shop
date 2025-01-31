// src/store/useNavigationStore.ts
import { create } from "zustand";

interface NaviState {
  isNavigating: boolean;
}

const useNaviStore = create<NaviState>()((set) => ({
  isNavigating: false,
}));

export default useNaviStore;
