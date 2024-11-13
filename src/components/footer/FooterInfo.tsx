"use client";
import { Language } from "../../../sanity.types";
import useLangStore from "@/store/langStore";
import { LanguageKey, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from "@/types/languages";

interface FooterInfoProps {
  globals: Language[];
}

const FooterInfo = ({ globals }: FooterInfoProps) => {
  const lang = useLangStore((state) => state.lang);
  const validLang: LanguageKey = SUPPORTED_LANGUAGES.includes(lang) ? lang : DEFAULT_LANGUAGE;

  const globalsContent = globals[0]?.content || [];

  const privacy = globalsContent?.find((g) => g.key === "privacy")?.localizedText?.[validLang];
  const terms = globalsContent?.find((g) => g.key === "terms")?.localizedText?.[validLang];

  return (
    <div>
      <p>{validLang}</p>
      <p>{privacy}</p>
      <p>{terms}</p>
    </div>
  );
};

export default FooterInfo;
