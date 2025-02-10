"use client";
import { Language } from "../../../sanity.types";
import useLangStore from "@/store/langStore";
import { DEFAULT_LANGUAGE } from "@/types/languages";
import BetterLink from "../BetterLink";

interface FooterInfoProps {
  globals: Language[];
}

const FooterInfo = ({ globals }: FooterInfoProps) => {
  const { lang } = useLangStore();
  const globalsContent = globals[0]?.content || [];

  const getLocalizedText = (key: string) => {
    const contentItem = globalsContent?.find((g) => g.key === key);
    const localizedText = contentItem?.localizedText?.[lang];
    return localizedText && localizedText.length > 0
      ? localizedText
      : contentItem?.localizedText?.[DEFAULT_LANGUAGE];
  };

  const privacy = getLocalizedText("privacy");
  const terms = getLocalizedText("terms");
  const about = getLocalizedText("about");

  return (
    <div className="flex flex-col gap-1">
      <p>
        <BetterLink href={"/about"}>{about}</BetterLink>
      </p>
      <p>
        <BetterLink href={"/privacy"}>{privacy}</BetterLink>
      </p>
      <p>
        <BetterLink href={"/terms"}>{terms}</BetterLink>
      </p>
    </div>
  );
};

export default FooterInfo;
