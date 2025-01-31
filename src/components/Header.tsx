"use client";
import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { PiUser, PiShoppingCartSimpleDuotone } from "react-icons/pi";
import useLangStore from "@/store/langStore";
import Image from "next/image";
import NextLink from "next/link";
import { Language } from "../../sanity.types";
import { DEFAULT_LANGUAGE } from "@/types/languages";
import Search from "./Search";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";

function Header({ globals, navTexts }: { globals: Language[]; navTexts: Language[] }) {
  const { user } = useUser();
  const { lang, toggleLang } = useLangStore();
  const [burgerOpen, setBurgerOpen] = useState(false);
  const navContent = navTexts[0]?.content || [];

  const getLocalizedText = (key: string) => {
    const contentItem = navContent?.find((g) => g.key === key);
    const localizedText = contentItem?.localizedText?.[lang];
    return localizedText && localizedText.length > 0
      ? localizedText
      : contentItem?.localizedText?.[DEFAULT_LANGUAGE];
  };

  const productsText = getLocalizedText("products");

  return (
    <header className="py-2  fixed inset-0 bg-white z-10 max-h-14 shadow-black/30 shadow-md">
      <div className="relative pl-2 pr-10 sm:pl-0 sm:pr-8 xl:max-w-7xl lg:max-w-4xl md:max-w-3xl sm:max-w-xl max-w-lg mx-auto flex justify-between items-center gap-4 z-10">
        <NextLink
          onClick={() => setBurgerOpen(false)}
          href="/"
          className="text-3xl font-bold text-green-700 hover:opacity-80 cursor-pointer sm:mx-0"
        >
          Shop
        </NextLink>

        <div>
          <NextLink
            onClick={() => setBurgerOpen(false)}
            href="/products"
            className={`text-lg hover:opacity-80 cursor-pointer`}
          >
            {productsText}
          </NextLink>
        </div>

        <div
          onClick={() => setBurgerOpen((prev) => !prev)}
          className="absolute top-0 right-0 h-full flex items-center pr-2 sm:pr-0 cursor-pointer"
        >
          <FaBars
            className={`transition-all ${burgerOpen ? "-rotate-90" : "rotate-0"} h-6 w-6 text-black`}
          />
        </div>
      </div>
      <div
        className={`absolute top-full left-0 w-full transition-all ${burgerOpen ? "h-full" : "h-0"} truncate z-0 bg-white flex justify-center items-center`}
      >
        <div className="w-full xl:max-w-7xl lg:max-w-4xl md:max-w-3xl sm:max-w-xl flex items-center justify-end gap-4">
          <Search setBurgerOpen={setBurgerOpen} globals={globals} />
          <ClerkLoaded>
            {user && (
              <NextLink href="/profile/orders" className="" onClick={() => setBurgerOpen(false)}>
                <PiUser className="h-6 w-6" />
              </NextLink>
            )}
          </ClerkLoaded>
          <NextLink href="/basket" className="relative" onClick={() => setBurgerOpen(false)}>
            <PiShoppingCartSimpleDuotone className="w-6 h-6 fill-black" />
          </NextLink>
          <Image
            src={`https://flagcdn.com/w40/${lang.slice(-2).toLowerCase()}.png`}
            alt={lang + " flag"}
            width={96}
            height={96}
            quality={100}
            className="object-contain w-6 cursor-pointer"
            onClick={toggleLang}
          />
          <ClerkLoaded>{user ? <UserButton /> : <SignInButton mode="modal" />}</ClerkLoaded>
        </div>
      </div>
    </header>
  );
}

export default Header;
