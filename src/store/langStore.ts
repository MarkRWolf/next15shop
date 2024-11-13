import { LanguageKey } from "@/types/languages";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LangState {
  lang: LanguageKey;
  setLang: (lang: LanguageKey) => void;
  toggleLang: () => void;
}

const useLangStore = create<LangState>()(
  persist(
    (set, get) => ({
      lang: "enGB",
      setLang: (lang) => set({ lang }),
      toggleLang: () => set({ lang: get().lang === "enGB" ? "daDK" : "enGB" }),
    }),
    { name: "lang-store" }
  )
);

export default useLangStore;
