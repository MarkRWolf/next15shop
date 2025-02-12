"use client";
import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { PiUser } from "react-icons/pi";
import { useState } from "react";
import Image from "next/image";
import { Language } from "../../../../sanity.types";
import useLangStore from "@/store/langStore";
import BetterLink from "../../BetterLink";
import { SUPPORTED_LANGUAGES } from "@/types/languages";
import Search from "../../Search";
import useText from "@/hooks/useText";
import HeaderDesktopNav from "./HeaderDesktopNav";
import useBasketStore from "@/store/basketStore";

interface HeaderDesktopProps {
  globals: Language[];
  navTexts: Language[];
}

function HeaderDesktop({ globals, navTexts }: HeaderDesktopProps) {
  const { lang, setLang } = useLangStore();
  const { items, shaking } = useBasketStore();
  const { user } = useUser();
  const [langOpen, setLangOpen] = useState(false);
  const signIn = useText(globals, "signIn", "single");
  const uniqueItems = items.length;

  return (
    <div className="hidden h-full lg:flex relative container-main justify-between items-center gap-4 z-10">
      <HeaderDesktopNav navTexts={navTexts} />

      {/* Right */}
      <div className="flex items-center gap-4">
        <Search globals={globals} />

        <div
          className="relative w-6 h-full mt-0.5"
          onMouseOver={() => setLangOpen(true)}
          onMouseLeave={() => setLangOpen(false)}
        >
          <Image
            src={`https://flagcdn.com/w40/${lang.slice(-2).toLowerCase()}.png`}
            alt={lang + " flag"}
            width={96}
            height={96}
            quality={100}
            className="w-6 object-contain cursor-pointer"
          />
          <div
            className={`absolute pt-1 ${langOpen ? "h-auto" : "h-0"} truncate top-full left-0 flex flex-col items-center z-20`}
          >
            {SUPPORTED_LANGUAGES.map(
              (l) =>
                l.code !== lang && (
                  <span
                    key={l.code}
                    className="py-1 cursor-pointer"
                    onClick={() => setLang(l.code)}
                  >
                    <Image
                      src={`https://flagcdn.com/w40/${l.code.slice(-2).toLowerCase()}.png`}
                      alt={lang + " flag"}
                      width={96}
                      height={96}
                      quality={100}
                      className="w-6 object-contain"
                    />
                  </span>
                )
            )}
          </div>
        </div>
        {/* Profile page if logged in */}
        <ClerkLoaded>
          {user && (
            <BetterLink href={"/profile/orders"} className="">
              <PiUser className="h-6 w-6" />
            </BetterLink>
          )}
        </ClerkLoaded>

        {/* Basket */}
        <BetterLink href={"/basket"} className="relative">
          {/* Number if items in cart */}
          {uniqueItems > 0 && (
            <div className="absolute top-full left-0 w-full flex items-center pt-[1px] justify-center leading-none text-xs">
              {uniqueItems}
            </div>
          )}
          <HiOutlineShoppingBag
            className="w-6 h-6 transition-all duration-150"
            style={{
              transform: shaking ? "rotate(10deg)" : "rotate(0deg)",
            }}
          />
        </BetterLink>

        {/* Sign in or user button */}
        <ClerkLoaded>
          {user ? <UserButton /> : <SignInButton mode="modal">{signIn}</SignInButton>}
        </ClerkLoaded>
      </div>
    </div>
  );
}

export default HeaderDesktop;
