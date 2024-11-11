import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface langStates {
  lang: string;
}

interface LangState {
  lang: string;
  setLang: (lang: string | ((lang: string) => string)) => void;
}

const useLangStore = create<LangState>()(
  persist(
    (set) => ({
      lang: "daDK",
      setLang: (lang) =>
        set((state) => ({
          lang: typeof lang === "function" ? lang(state.lang) : lang,
        })),
    }),
    { name: "lang-store" }
  )
);

export default useLangStore;
