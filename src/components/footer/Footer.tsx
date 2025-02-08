import { getAllGlobals } from "@/sanity/lib/lang/getAllGlobals";
import { Language } from "../../../sanity.types";
import FooterInfo from "./FooterInfo";
import BetterLink from "../BetterLink";
import NextImage from "next/image";
import SoMe from "./SoMe";

const Footer = async () => {
  const globalLangs: Language[] = await getAllGlobals();

  return (
    <footer className="mt-24 w-full xs:py-10 py-14 bg-stone-300/40">
      <div className="container-main flex flex-col xs:flex-row items-center justify-between xs:gap-4 gap-10">
        <span className="order-2 xs:order-1 text-center xs:text-left">
          <FooterInfo globals={globalLangs} />
        </span>
        <BetterLink
          href={"/"}
          className="order-1 xs:order-2 text-3xl font-main font-extrabold hover:opacity-80 cursor-pointer sm:mx-0"
        >
          <NextImage
            src={"/logo.png"}
            className="h-20 w-20 object-cover"
            alt="logo"
            width={256}
            height={256}
          />
        </BetterLink>
        <span className="order-3">
          <SoMe globals={globalLangs} />
        </span>
      </div>
    </footer>
  );
};

export default Footer;
