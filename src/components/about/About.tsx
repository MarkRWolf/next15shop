"use client";
import { Language } from "../../../sanity.types";
import useLangStore from "@/store/langStore";
import { DEFAULT_LANGUAGE } from "@/types/languages";
import Link from "next/link";
interface AboutProps {
  globals: Language[];
}

const About = ({ globals }: AboutProps) => {
  const { lang } = useLangStore();
  const globalsContent = globals[0]?.content || [];

  const getLocalizedText = (key: string) => {
    const contentItem = globalsContent?.find((g) => g.key === key);
    const localizedText = contentItem?.localizedText?.[lang];
    return localizedText && localizedText.length > 0
      ? localizedText
      : contentItem?.localizedText?.[DEFAULT_LANGUAGE];
  };

  console.log("Globals", globalsContent);
  console.log("_______________________");

  const privacy = getLocalizedText("privacy");
  console.log("privacy", getLocalizedText("privacy"));
  const terms = getLocalizedText("terms");
  const about = getLocalizedText("about");

  return (
    <div>
      <h1>{about}</h1>
    </div>
  );
};

export default About;
