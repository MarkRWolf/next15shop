import { getAllGlobals } from "@/sanity/lib/lang/getAllGlobals";
import Header from "./Header";
import { getLocalizedTexts } from "@/sanity/lib/lang/getLocalizedTexts";

const MainHeader = async () => {
  const globalLangs = await getAllGlobals();
  const navTexts = await getLocalizedTexts("nav");
  return <Header globals={globalLangs} navTexts={navTexts}></Header>;
};

export default MainHeader;
