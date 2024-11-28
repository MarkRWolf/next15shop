import { getAllGlobals } from "@/sanity/lib/lang/getAllGlobals";
import { Language } from "../../../sanity.types";
import FooterInfo from "./FooterInfo";

const Footer = async () => {
  const globalLangs: Language[] = await getAllGlobals();

  return (
    <footer className="border-t p-4 w-full left-0 border-black border-1 ">
    
      <FooterInfo globals={globalLangs} />
    </footer>
  );
};

export default Footer;
