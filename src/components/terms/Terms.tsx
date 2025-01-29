"use client";
import { Language } from "../../../sanity.types";
import useLangStore from "@/store/langStore";
import { DEFAULT_LANGUAGE } from "@/types/languages";
import Link from "next/link";
interface TermsProps {
  termsText: Language[];
}

const Terms = ({ termsText }: TermsProps) => {
  const { lang } = useLangStore();
  const getAllSections = (key: string) => {
    const content = termsText[0]?.content || [];

    const sections = content
      .filter((g) => g.key.startsWith(key))
      .sort((a, b) => {
        const getNumericPart = (key: string) => parseInt(key.replace(/\D/g, ""), 10);
        return getNumericPart(a.key) - getNumericPart(b.key);
      });

    const chapters = sections
      .map((section) => {
        const localizedText = section?.localizedText?.[lang];
        return localizedText && localizedText.length > 0
          ? localizedText
          : section?.localizedText?.[DEFAULT_LANGUAGE];
      })
      .filter((text): text is string => text !== undefined);

    return chapters;
  };

  const terms = getAllSections("chap");

  const chapterLines = (text: string) => {
    const normalizedText = text.replace(/\\n/g, "\n");
    return normalizedText.split("\n");
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="w-full flex flex-col">
        {terms?.length &&
          terms.map((chap, index) =>
            index === 0 ? (
              <h1 className="font-semibold text-lg border-b border-slate-600" key={index}>
                {chap}
              </h1>
            ) : (
              <div key={index} className="border-b border-slate-500">
                {chapterLines(chap)?.map((line, i) => <p key={i}>{line}</p>)}
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default Terms;
