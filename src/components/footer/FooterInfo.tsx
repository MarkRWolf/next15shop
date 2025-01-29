"use client";
import { Language } from "../../../sanity.types";
import useLangStore from "@/store/langStore";
import { DEFAULT_LANGUAGE } from "@/types/languages";
import Link from "next/link";
import { useEffect, useState } from "react";
interface FooterInfoProps {
  globals: Language[];
}

const FooterInfo = ({ globals }: FooterInfoProps) => {
  const { lang } = useLangStore();
  const globalsContent = globals[0]?.content || [];
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

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
    <div>
      <p>
        <Link href={"/about"}>{about}</Link>
      </p>
      <p>
        <Link href={"/privacy"}>{privacy}</Link>
      </p>
      <p>
        <Link href={"/terms"}>{terms}</Link>
      </p>
    </div>
  );
};

export default FooterInfo;
