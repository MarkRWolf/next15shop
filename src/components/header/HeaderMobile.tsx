"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { PiUser } from "react-icons/pi";
import Image from "next/image";
import { SUPPORTED_LANGUAGES } from "@/types/languages";
import { Language } from "../../../sanity.types";
import useLangStore from "@/store/langStore";
import BetterLink from "../BetterLink";
import NavLink from "./NavLink";
import Search from "../Search";
import NextImage from "next/image";

interface HeaderMobileProps {
  globals: Language[];
  navTexts: Language[];
}

function HeaderMobile({ globals, navTexts }: HeaderMobileProps) {
  const path = usePathname();
  const { lang, setLang } = useLangStore();
  const { user } = useUser();
  const [langOpen, setLangOpen] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);

  useEffect(() => {
    setBurgerOpen(false);
  }, [path]);

  return (
    <div className="lg:hidden flex relative container-main justify-between items-center gap-4 z-10">
      {/* Hidden nav slide in */}
      <div
        className={`fixed top-14 left-0 ${burgerOpen ? "translate-x-0" : "-translate-x-[100%]"} transition-translate duration-300 ease-out min-w-[200px] h-screen bg-slate-50`}
      >
        <div className="p-2 flex flex-col">
          {navTexts?.[0]?.content?.map((item) => (
            <NavLink key={item._key} mobile={true} navTexts={navTexts} item={item} />
          ))}
          <Search mobile={true} globals={globals} />
        </div>
      </div>

      {/* Left */}
      <div className="flex items-center gap-2">
        <label>
          <div className="w-9 h-10 cursor-pointer flex flex-col items-center justify-center">
            <input
              className="hidden peer"
              type="checkbox"
              onClick={() => setBurgerOpen((prev) => !prev)}
            />
            <div className="w-[50%] h-[2px] bg-black rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] peer-checked:rotate-[-45deg]"></div>
            <div className="w-[50%] h-[2px] bg-black rounded-md transition-all duration-300 origin-center peer-checked:hidden"></div>
            <div className="w-[50%] h-[2px] bg-black rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] peer-checked:rotate-[45deg]"></div>
          </div>
        </label>
        <BetterLink
          href={"/"}
          className="text-3xl font-main font-extrabold hover:opacity-80 cursor-pointer sm:mx-0"
        >
          <NextImage
            src={"/logo.png"}
            className="h-10 w-10 object-cover"
            alt="logo"
            width={96}
            height={96}
          />
        </BetterLink>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 pr-2 sm:pr-0">
        {/* Lang */}
        <div className="relative w-6 h-full mt-0.5" onClick={() => setLangOpen((prev) => !prev)}>
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

        {/* Profile if logged in */}
        <ClerkLoaded>
          {user && (
            <BetterLink href={"/profile/orders"} className="">
              <PiUser className="h-6 w-6" />
            </BetterLink>
          )}
        </ClerkLoaded>

        {/* Basket */}
        <BetterLink href={"/basket"} className="relative">
          <HiOutlineShoppingBag className="w-6 h-6" />
        </BetterLink>

        {/* pfp clerk modal || sign in */}
        <ClerkLoaded>{user ? <UserButton /> : <SignInButton mode="modal" />}</ClerkLoaded>
      </div>
    </div>
  );
}

export default HeaderMobile;
/*
 */
