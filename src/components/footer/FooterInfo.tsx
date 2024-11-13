"use client";
import { Language } from "../../../sanity.types";
import useLangStore from "@/store/langStore";

interface FooterInfoProps {
  globals: Language[];
}

const FooterInfo = ({ globals }: FooterInfoProps) => {
  const lang = useLangStore((state) => state.lang);

  const globalsContent = globals[0]?.content || [];

  const getLocalizedText = (key: string) => {
    const contentItem = globalsContent?.find((g) => g.key === key);
    const localizedText = contentItem?.localizedText?.[lang];
    return localizedText && localizedText.length > 0
      ? localizedText
      : contentItem?.localizedText?.["enGB"];
  };

  const privacy = getLocalizedText("privacy");
  const terms = getLocalizedText("terms");

  return (
    <div>
      <p>{lang}</p>
      <p>{privacy}</p>
      <p>{terms}</p>
    </div>
  );
};

export default FooterInfo;
