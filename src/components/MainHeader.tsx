import { getAllGlobals } from "@/sanity/lib/lang/getAllGlobals";
import { getLocalizedTexts } from "@/sanity/lib/lang/getLocalizedTexts";
import HeaderMobile from "./header/HeaderMobile";
import HeaderDesktop from "./header/HeaderDesktop";
import BasketMessageWrapper from "./basket/BasketMessageWrapper";

const MainHeader = async () => {
  const [globals, navTexts] = await Promise.all([getAllGlobals(), getLocalizedTexts("nav")]);

  return (
    <header className="py-2 fixed font-main inset-0 bg-white/90 z-10 h-14 shadow-black/30 shadow-md">
      <HeaderMobile globals={globals} navTexts={navTexts} />
      <HeaderDesktop globals={globals} navTexts={navTexts} />
      <BasketMessageWrapper globals={globals} />
    </header>
  );
};

export default MainHeader;
