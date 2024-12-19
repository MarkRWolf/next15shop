import { getAllGlobals } from "@/sanity/lib/lang/getAllGlobals";
import Header from "./Header";

const MainHeader = async () => {
  const globalLangs = await getAllGlobals();

  return <Header globals={globalLangs}></Header>;
};

export default MainHeader;
