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
    <div className="relative w-full h-full bg-stone-400 text-gray-200 font-main">
      {hero.image && (
        <NextImage
          className={`object-cover w-full h-full`}
          src={imageUrl(hero.image).url()}
          alt={title ?? "Product Image"}
          priority
          width={1920}
          height={1080}
        />
      )}
      <div className="absolute inset-0 top-[15%] mx-auto w-full h-[70%] container-main flex flex-col lg:justify-start justify-center gap-2 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]">
        <span className="lg:text-left text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-4">{title}</h2>
          <p className="text-xl sm:text-3xl font-semibold mb-6">{description}</p>
        </span>
        <BetterLink
          href={hero.btnLink}
          className="w-max lg:mx-0 mx-auto text-xl px-4 py-2 border-2 rounded-sm border-stone-200 hover:bg-stone-200/40"
        >
          {btnText}
        </BetterLink>
      </div>
    </div>
  );
};

export default HeroBanner;
