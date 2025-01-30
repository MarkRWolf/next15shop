"use client";

import { useState, useEffect } from "react";
import { Language } from "../../sanity.types";
import useLangStore from "@/store/langStore";
import { DEFAULT_LANGUAGE } from "@/types/languages";

type Mode = "single" | "chapters";

// Overload signatures
function useText(input: Language[], key: string, mode: "single"): string;
function useText(input: Language[], key: string, mode: "chapters"): string[];

function useText(input: Language[], key: string, mode: Mode = "single"): string | string[] {
  const content = input[0]?.content || [];
  const { lang } = useLangStore();

  const getLocalizedText = (key: string): string => {
    const item = content.find((g) => g.key === key);
    const localizedText = item?.localizedText?.[lang];
    return localizedText && localizedText.length > 0
      ? localizedText
      : item?.localizedText?.[DEFAULT_LANGUAGE] || "";
  };

  const getAllSections = (key: string): string[] => {
    const sections = content
      .filter((g) => g.key.startsWith(key))
      .sort((a, b) => {
        const getNumericPart = (key: string) => parseInt(key.replace(/\D/g, ""), 10);
        return getNumericPart(a.key) - getNumericPart(b.key);
      });

    return sections
      .map((section) => {
        const localizedText = section?.localizedText?.[lang];
        return localizedText && localizedText.length > 0
          ? localizedText
          : section?.localizedText?.[DEFAULT_LANGUAGE] || "";
      })
      .filter((text): text is string => text !== "");
  };

  const [localized, setLocalized] = useState<string | string[]>(
    mode === "single" ? getLocalizedText(key) : getAllSections(key)
  );

  useEffect(() => {
    setLocalized(
      mode === "single" ? getLocalizedText(key) : mode === "chapters" ? getAllSections(key) : ""
    );
  }, [input, key, lang, mode]);

  return localized;
}

export default useText;
