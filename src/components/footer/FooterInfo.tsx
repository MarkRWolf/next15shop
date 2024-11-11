"use client";
import { Language } from "../../../sanity.types";
import useLangStore from "@/store/langStore";

interface FooterInfoProps {
  globals: Language[];
}

const FooterInfo: React.FC<FooterInfoProps> = ({ globals }) => {
  const lang = useLangStore((state) => state.lang); // Ensure lang is a string
  const validLang: "daDK" | "enGB" = (lang === "daDK" || lang === "enGB" ? lang : "daDK") as
    | "daDK"
    | "enGB"; // Forcefully cast to validLang type

  const globalsContent = globals[0]?.content || [];

  const privacy = globalsContent?.find((g) => g.key === "privacy")?.localizedText?.[validLang];
  const terms = globalsContent?.find((g) => g.key === "terms")?.localizedText?.[validLang];

  console.log("privacy", privacy);
  console.log("terms", terms);
  console.log("globals", globals[0]);

  return (
    <div>
      <p>{validLang}</p>
      <p>{privacy}</p>
      <p>{terms}</p>
    </div>
  );
};

export default FooterInfo;
