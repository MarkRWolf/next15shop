import useText from "@/hooks/useText";
import BetterLink from "../BetterLink";
import { Language } from "../../../sanity.types";
import { SUPPORTED_LANGUAGES } from "@/types/languages";
interface NavProps {
  navTexts: Language[];
  item: {
    key: string;
    localizedText: {
      [key in (typeof SUPPORTED_LANGUAGES)[number]["code"]]?: string;
    };
    _key: string;
  };
  mobile?: boolean;
  activePath: string;
}
const NavLink = ({ navTexts, item, mobile = false, activePath }: NavProps) => {
  const text = useText(navTexts, item.key, "single");

  return mobile ? (
    <>
      <BetterLink
        href={`/${item.key}`}
        className={`py-2 border-b border-slate-400 flex justify-between cursor pointer ${activePath === item.key ? "font-semibold" : "font-normal"}`}
      >
        {text}
        <p className="text-xl pr-2">&gt;</p>
      </BetterLink>
    </>
  ) : (
    <BetterLink
      href={`/${item.key}`}
      className={`${activePath === item.key ? "font-semibold" : "font-normal"}`}
    >
      {text}
    </BetterLink>
  );
};

export default NavLink;
