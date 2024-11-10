import { getAllGlobals } from "@/sanity/lib/lang/getAllGlobals";
import { Language } from "../../../sanity.types";
import FooterInfo from "./FooterInfo";

const Footer = async () => {
  const globalLangs: Language[] = await getAllGlobals();

  return (
    <footer className="border-t border-t-gray-600 py-4 flex flex-col gap-2">
      FOOTER
      <FooterInfo globals={globalLangs} />
    </footer>
  );
};

export default Footer;
