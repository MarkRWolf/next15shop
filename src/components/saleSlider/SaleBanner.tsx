"use client";
import useLangStore from "@/store/langStore";
import { Language, Sale } from "../../../sanity.types";
import { DEFAULT_LANGUAGE } from "@/types/languages";
import NextImage from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import useText from "@/hooks/useText";

const SaleBanner = ({ sale, salesText }: { sale: Sale; salesText: Language[] }) => {
  const { lang } = useLangStore();

  const useCode = useText(salesText, "useCode", "single");
  const forText = useText(salesText, "for", "single");
  const off = useText(salesText, "off", "single");

  const title = sale[`title_${lang}`] ?? sale[`title_${DEFAULT_LANGUAGE}`];
  const description = sale[`description_${lang}`] ?? sale[`description_${DEFAULT_LANGUAGE}`];

  return (
    <div className="relative w-full h-full bg-black text-gray-200 font-main">
      {sale.image && (
        <NextImage
          className={`object-cover w-full h-full`}
          src={imageUrl(sale.image).url()}
          alt={title ?? "Product Image"}
          width={1920}
          height={1080}
          quality={65}
        />
      )}
      <div className="absolute inset-0 top-[15%] mx-auto w-full h-[70%] container-main flex flex-col lg:justify-start justify-between lg:gap-20 gap-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.8)]">
        <span>
          <h2 className="text-3xl sm:text-5xl font-extrabold lg:text-left text-center">{title}</h2>
          <p className="lg:text-left text-center text-xl sm:text-3xl font-semibold ">
            {description}
          </p>
        </span>
        <div className="font-semibold lg:text-left text-center">
          <span className="text-2xl">
            <p>{useCode}</p>
            <p className="text-red-600 text-3xl font-extrabold">{sale.couponCode}</p>
          </span>
          <span className="text-2xl">
            {forText} {sale.discountAmount}% {off}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SaleBanner;
