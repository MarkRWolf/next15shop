"use client";
import { Language } from "../../../sanity.types";
import useLangStore from "@/store/langStore";
import { DEFAULT_LANGUAGE } from "@/types/languages";
interface PrivacyProps {
  privacyText: Language[];
}

const Privacy = ({ privacyText }: PrivacyProps) => {
  const { lang } = useLangStore();

  const getAllSections = (key: string) => {
    const content = privacyText[0]?.content || [];

    /** Put all chapters in array in order
     * [chap01, chap02, chap03, ...] */
    const sections = content
      .filter((g) => g.key.startsWith(key))
      .sort((a, b) => {
        const getNumericPart = (key: string) => parseInt(key.replace(/\D/g, ""), 10);
        return getNumericPart(a.key) - getNumericPart(b.key);
      });

    /** Return an array of the chapters as strings in selected language
     *  or fall back to default language */
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

  const privacy = getAllSections("chap");

  const chapterLines = (text: string) => {
    const normalizedText = text.replace(/\\n/g, "\n");
    return normalizedText.split("\n");
  };

  return privacy?.length ? (
    <div className="w-full max-w-7xl mx-auto">
      <div className="w-full flex flex-col gap-2">
        {privacy?.map((chap, index) =>
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
  ) : null;
};

export default Privacy;
