"use client";
import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { PiUser, PiShoppingCartSimpleDuotone } from "react-icons/pi";
import useLangStore from "@/store/langStore";
import Image from "next/image";
import BetterLink from "./BetterLink";
import { Language } from "../../sanity.types";
import { DEFAULT_LANGUAGE } from "@/types/languages";
import Search from "./Search";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import useText from "@/hooks/useText";
import { Link, useTransitionRouter } from "next-view-transitions";
import NextLink from "next/link";

function Header({ globals, navTexts }: { globals: Language[]; navTexts: Language[] }) {
  const { user } = useUser();
  const { lang, toggleLang } = useLangStore();
  const [burgerOpen, setBurgerOpen] = useState(false);
  const router = useTransitionRouter();

  const productsText = useText(navTexts, "products", "single");

  return (
    <header className="py-2  fixed inset-0 bg-white z-10 max-h-14 shadow-black/30 shadow-md">
      <div className="relative pl-2 pr-10 sm:pl-0 sm:pr-8 xl:max-w-7xl lg:max-w-4xl md:max-w-3xl sm:max-w-xl max-w-lg mx-auto flex justify-between items-center gap-4 z-10">
        <div onClick={() => setBurgerOpen(false)}>
          <Link
            onMouseOver={() => router.prefetch("/")}
            href="/"
            className="text-3xl font-main font-extrabold hover:opacity-80 cursor-pointer sm:mx-0"
          >
            SHOP
          </Link>
        </div>

        <div onClick={() => setBurgerOpen(false)}>
          <Link
            onMouseOver={() => router.prefetch("/products")}
            href="/products"
            className="text-lg hover:opacity-80 cursor-pointer"
          >
            {productsText}
          </Link>
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
              <div onClick={() => setBurgerOpen(false)}>
                <NextLink
                  onMouseOver={() => router.prefetch("/profile/orders")}
                  onClick={() => router.push("/profile/orders")}
                  href="/profile/orders"
                  className=""
                >
                  <PiUser className="h-6 w-6" />
                </NextLink>
              </div>
            )}
          </ClerkLoaded>
          <div onClick={() => setBurgerOpen(false)}>
            <a
              onMouseOver={() => router.prefetch("/basket")}
              onClick={() => router.push("/basket")}
              href="/basket"
              className="relative"
            >
              <PiShoppingCartSimpleDuotone className="w-6 h-6 fill-black" />
            </a>
          </div>
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
