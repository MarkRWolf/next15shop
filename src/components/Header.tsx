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
import useText from "@/hooks/useText";

function Header({ globals, navTexts }: { globals: Language[]; navTexts: Language[] }) {
  const { user } = useUser();
  const { lang, toggleLang } = useLangStore();
  const [burgerOpen, setBurgerOpen] = useState(false);

  const productsText = useText(navTexts, "products", "single");

  return (
    <header className="">
      <div></div>
    </header>
  );
}

export default Header;
