"use client";
import useText from "@/hooks/useText";
import { Language } from "../../../sanity.types";
import BetterLink from "../BetterLink";
import { RiFacebookBoxLine, RiInstagramLine, RiTwitterXLine } from "react-icons/ri";

const SoMe = ({ globals }: { globals: Language[] }) => {
  const meetUs = useText(globals, "meetUsSoMe", "single");

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <h3 className="text-xl font-main">{meetUs}</h3>
      <div className="flex gap-4">
        <BetterLink href="/about" className="hover:opacity-80">
          <RiFacebookBoxLine className="w-10 h-10" />
        </BetterLink>
        <BetterLink href="/about" className="hover:opacity-80">
          <RiInstagramLine className="w-10 h-10" />
        </BetterLink>
        <BetterLink href="/about" className="hover:opacity-80">
          <RiTwitterXLine className="w-10 h-10" />
        </BetterLink>
      </div>
    </div>
  );
};

export default SoMe;
