"use client";
import useLangStore from "@/store/langStore";
import { Language, Sale } from "../../../sanity.types";
import { DEFAULT_LANGUAGE } from "@/types/languages";

const SaleBanner = ({ sale, salesText }: { sale: Sale; salesText: Language[] }) => {
  const { lang } = useLangStore();
  const title = sale[`title_${lang}`] ?? sale[`title_${DEFAULT_LANGUAGE}`];
  const description = sale[`description_${lang}`] ?? sale[`description_${DEFAULT_LANGUAGE}`];

  const salesContent = salesText?.[0]?.content || [];

  const getLocalizedText = (key: string) => {
    const item = salesContent?.find((g) => g.key === key);
    const localizedText = item?.localizedText?.[lang];
    return localizedText && localizedText.length > 0
      ? localizedText
      : item?.localizedText?.[DEFAULT_LANGUAGE];
  };

  const useCode = getLocalizedText("useCode");
  const forText = getLocalizedText("for");
  const off = getLocalizedText("off");

  return (
    <div className="w-full mx-auto bg-gradient-to-r from-slate-900 to-slate-900/90 text-gray-200 px-6 py-10 mt-2">
      <div className="w-full  md:max-w-3xl sm:max-w-2xl lg:max-w-4xl xl:max-w-7xl px-4 mx-auto flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-left mb-4">{title}</h2>
          <p className="text-left text-xl sm:text-3xl font-semibold mb-6">{description}</p>
          <div className="flex">
            <div className="bg-white text-black py-4 px-6 rounded-full shadow-md transform hover:scale-105 transition duration-300">
              <span className="font-bold text-base sm:text-xl">
                {useCode} <span className="text-red-600">{sale.couponCode}</span>
              </span>
              <span className="ml-2 font-bold text-base sm:text-xl">
                {forText} {sale.discountAmount}% {off}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleBanner;

/* <div className="w-full mx-auto bg-gradient-to-r from-slate-900 to-slate-900/90 text-gray-200 px-6 py-10 mt-2">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-left mb-4">{title}</h2>
            <p className="text-left text-xl sm:text-3xl font-semibold mb-6">{description}</p>
            <div className="flex">
              <div className="bg-white text-black py-4 px-6 rounded-full shadow-md transform hover:scale-105 transition duration-300">
                <span className="font-bold text-base sm:text-xl">
                  Use code:<span className="text-red-600">{sale.couponCode}</span>
                </span>
                <span className="ml-2 font-bold text-base sm:text-xl">
                  for {sale.discountAmount}% OFF
                </span>
              </div>
            </div>
          </div>
        </div>
      </div> */
