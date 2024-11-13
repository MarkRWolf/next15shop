import { LanguageKey } from "@/types/languages";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LangState {
  lang: LanguageKey;
  setLang: (lang: LanguageKey) => void;
}

const useLangStore = create<LangState>()(
  persist(
    (set) => ({
      lang: "enGB",
      setLang: (lang) => set({ lang }),
    }),
    { name: "lang-store" }
  )
);

export default useLangStore;
