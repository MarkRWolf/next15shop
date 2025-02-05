import useText from "@/hooks/useText";
import BetterLink from "../BetterLink";
import { Language } from "../../../sanity.types";
import { LanguageKey, SUPPORTED_LANGUAGES } from "@/types/languages";
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
}
const NavLink = ({ navTexts, item, mobile = false }: NavProps) => {
  const text = useText(navTexts, item.key, "single");
  return mobile ? (
    <>
      <BetterLink
        href={`/${item.key}`}
        className="py-2 border-b border-slate-400 flex justify-between cursor pointer"
      >
        {text}
        <p className="text-xl pr-2">&gt;</p>
      </BetterLink>
    </>
  ) : (
    <BetterLink href={`/${item.key}`}>{text}</BetterLink>
  );
};

export default NavLink;
