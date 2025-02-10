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
      <div className="absolute inset-0 top-[20%] mx-auto w-full h-full container-main flex flex-col gap-2 drop-shadow-[3px_3px_3px_rgba(0,0,0,1)]">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-left">{title}</h2>
        <p className="text-left text-xl sm:text-3xl font-semibold ">{description}</p>
        <div className="font-semibold">
          <span className="text-xl ">
            <p>{useCode}</p>
            <p className="text-red-600 text-2xl font-extrabold">{sale.couponCode}</p>
          </span>
          <span className="text-xl">
            {forText} {sale.discountAmount}% {off}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SaleBanner;
