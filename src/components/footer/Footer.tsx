import { getAllGlobals } from "@/sanity/lib/lang/getAllGlobals";
import { Language } from "../../../sanity.types";
import FooterInfo from "./FooterInfo";
import { Suspense } from "react"; // Import Suspense

const Footer = async () => {
  const globalLangs: Language[] = await getAllGlobals();

  return (
    <footer className="border-t p-4 w-full absolute bottom-0 left-0 border-black border-1 ">
      FOOTER
      <Suspense fallback={null}>
        <FooterInfo globals={globalLangs} />
      </Suspense>
    </footer>
  );
};

export default Footer;
