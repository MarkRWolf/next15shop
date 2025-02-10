"use client";
import useLangStore from "@/store/langStore";
import { Hero } from "../../../sanity.types";
import { DEFAULT_LANGUAGE } from "@/types/languages";
import NextImage from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import BetterLink from "../BetterLink";

const HeroBanner = ({ hero }: { hero: Hero }) => {
  const { lang } = useLangStore();

  const title = hero[`title_${lang}`] ?? hero[`title_${DEFAULT_LANGUAGE}`];
  const description = hero[`description_${lang}`] ?? hero[`description_${DEFAULT_LANGUAGE}`];
  const btnText = hero[`btnText_${lang}`] ?? hero[`btnText_${DEFAULT_LANGUAGE}`];

  return (
    <div className="relative w-full h-full bg-black text-gray-200 font-main">
      {hero.image && (
        <NextImage
          className={`object-cover w-full h-full`}
          src={imageUrl(hero.image).url()}
          alt={title ?? "Product Image"}
          width={1920}
          height={1080}
          quality={65}
        />
      )}
      <div className="absolute inset-0 top-[20%] w-full h-full container-main flex flex-col drop-shadow-[3px_3px_3px_rgba(0,0,0,0.8)]">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-left mb-4">{title}</h2>
        <p className="text-left text-xl sm:text-3xl font-semibold mb-6">{description}</p>
        <BetterLink
          href={hero.btnLink}
          className="w-max text-xl px-4 py-2 border-2 rounded-sm border-stone-200 hover:bg-stone-200/40"
        >
          {btnText}
        </BetterLink>
      </div>
    </div>
  );
};

export default HeroBanner;
