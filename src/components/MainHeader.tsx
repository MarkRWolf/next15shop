import { getAllGlobals } from "@/sanity/lib/lang/getAllGlobals";
import { getLocalizedTexts } from "@/sanity/lib/lang/getLocalizedTexts";
import HeaderMobile from "./header/HeaderMobile";
import HeaderDesktop from "./header/headerDesktop/HeaderDesktop";
import BasketMessageWrapper from "./basket/BasketMessageWrapper";

const MainHeader = async () => {
  const [globals, navTexts] = await Promise.all([getAllGlobals(), getLocalizedTexts("nav")]);

  return (
    <header className="fixed font-main inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/95 z-10 h-14 shadow-black/30 shadow-md">
      <HeaderMobile globals={globals} navTexts={navTexts} />
      <HeaderDesktop globals={globals} navTexts={navTexts} />
      <BasketMessageWrapper globals={globals} />
    </header>
  );
};

export default MainHeader;
