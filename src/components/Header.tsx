"use client";
import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { PiMagnifyingGlass, PiShoppingCartSimpleDuotone, PiUser } from "react-icons/pi";
import useLangStore from "@/store/langStore";
import Image from "next/image";
import NextLink from "next/link";
import Form from "next/form";
import { useState, useRef } from "react";
import { Language } from "../../sanity.types";
import { DEFAULT_LANGUAGE } from "@/types/languages";

function Header({ globals }: { globals: Language[] }) {
  const { user } = useUser();
  const { lang, toggleLang } = useLangStore();
  const searchRef = useRef<HTMLInputElement>(null);
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  const [searchVal, setSearchVal] = useState("");
  const globalsContent = globals[0]?.content || [];

  const getLocalizedText = (key: string) => {
    const contentItem = globalsContent?.find((g) => g.key === key);
    const localizedText = contentItem?.localizedText?.[lang];
    return localizedText && localizedText.length > 0
      ? localizedText
      : contentItem?.localizedText?.[DEFAULT_LANGUAGE];
  };

  const searchPlaceholder = getLocalizedText("search");
  return (
    <header className="py-2 fixed inset-0 bg-white z-10 max-h-14 shadow-black/30 shadow-md">
      <div className="xl:max-w-7xl lg:max-w-4xl md:max-w-3xl sm:max-w-xl mx-auto flex justify-between items-center gap-4">
        <NextLink
          href="/"
          className="text-3xl font-bold text-green-700 hover:opacity-80 cursor-pointer mx-auto sm:mx-0"
        >
          Shop
        </NextLink>

        <div className="flex items-center gap-0 sm:gap-1 md:gap-2 space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
          <Form
            action="/search"
            className={`relative max-w-96 flex-1`}
            onMouseOver={() => {
              const timer = setTimeout(() => {
                searchRef.current?.focus();
              }, 1000);
              searchRef.current?.addEventListener("mouseleave", () => clearTimeout(timer), {
                once: true,
              });
            }}
          >
            <input
              ref={searchRef}
              type="text"
              name="query"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder={searchPlaceholder}
              className={`absolute top-1/2 right-0 -translate-y-1/2 mt-[0.125rem] bg-transparent text-gray-800 pl-0 focus:outline-none focus:ring-opacity-50 border-b border-gray-400  w-44 max-w-4xl `}
            />
            <button
              ref={searchBtnRef}
              disabled={!searchVal.length}
              type="submit"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (searchVal.length > 0) searchBtnRef.current?.click();
                }
              }}
            >
              <PiMagnifyingGlass className="absolute top-1/2 right-0 -translate-y-1/2 h-6 w-6 cursor-pointer" />
            </button>
          </Form>
          <ClerkLoaded>
            {user && (
              <NextLink href="/profile/orders" className="">
                <PiUser className="h-6 w-6" />
              </NextLink>
            )}
          </ClerkLoaded>
          <NextLink href="/basket" className="relative">
            <PiShoppingCartSimpleDuotone className="w-6 h-6 fill-black" />
          </NextLink>{" "}
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
