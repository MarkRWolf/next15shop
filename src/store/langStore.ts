import { DEFAULT_LANGUAGE, LanguageKey } from "@/types/languages";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LangState {
  lang: LanguageKey;
  defaultLang: LanguageKey;
  setLang: (lang: LanguageKey) => void;
  toggleLang: () => void;
}

const useLangStore = create<LangState>()(
  persist(
    (set, get) => ({
      lang: "daDK",
      defaultLang: DEFAULT_LANGUAGE,
      setLang: (lang) => set({ lang }),
      toggleLang: () => set({ lang: get().lang === "enGB" ? "daDK" : "enGB" }),
    }),
    { name: "lang-store" }
  )
);

export default useLangStore;
