import { getAllGlobals } from "@/sanity/lib/lang/getAllGlobals";
import { getLocalizedTexts } from "@/sanity/lib/lang/getLocalizedTexts";
import HeaderMobile from "./header/HeaderMobile";
import HeaderDesktop from "./header/HeaderDesktop";

const MainHeader = async () => {
  const [globals, navTexts] = await Promise.all([getAllGlobals(), getLocalizedTexts("nav")]);

  return (
    <header className="py-2 fixed inset-0 bg-white z-10 h-14 shadow-black/30 shadow-md font-main">
      <HeaderMobile globals={globals} navTexts={navTexts} />
      <HeaderDesktop globals={globals} navTexts={navTexts} />
    </header>
  );
};

export default MainHeader;
