"use client";
import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { PiUser } from "react-icons/pi";
import { useState } from "react";
import Image from "next/image";
import { Language } from "../../../sanity.types";
import useLangStore from "@/store/langStore";
import BetterLink from "../BetterLink";
import NavLink from "./NavLink";
import { SUPPORTED_LANGUAGES } from "@/types/languages";
import Search from "../Search";
import NextImage from "next/image";
import useText from "@/hooks/useText";

interface HeaderDesktopProps {
  globals: Language[];
  navTexts: Language[];
}

function HeaderDesktop({ globals, navTexts }: HeaderDesktopProps) {
  const { lang, setLang } = useLangStore();
  const { user } = useUser();
  const [langOpen, setLangOpen] = useState(false);
  const signIn = useText(globals, "signIn", "single");
  
  return (
    <div className="hidden lg:flex relative container-main justify-between items-center gap-4 z-10">
      <div className="flex items-center gap-6">
        <BetterLink
          href={"/"}
          className="flex items-center gap-1 text-sm font-main font-bold hover:opacity-80 cursor-pointer sm:mx-0"
        >
          <NextImage
            src={"/logo.png"}
            className="h-10 w-10 object-cover"
            alt="logo"
            width={96}
            height={96}
          />
          DemoShop
        </BetterLink>
        <div className="flex items-center gap-2">
          {navTexts?.[0]?.content?.map((item) => (
            <NavLink key={item.key} navTexts={navTexts} item={item} />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
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
        <ClerkLoaded>
          {user && (
            <BetterLink href={"/profile/orders"} className="">
              <PiUser className="h-6 w-6" />
            </BetterLink>
          )}
        </ClerkLoaded>
        <BetterLink href={"/basket"} className="relative">
          <HiOutlineShoppingBag className="w-6 h-6" />
        </BetterLink>
        <ClerkLoaded>
          {user ? <UserButton /> : <SignInButton mode="modal">{signIn}</SignInButton>}
        </ClerkLoaded>
      </div>
    </div>
  );
}

export default HeaderDesktop;
