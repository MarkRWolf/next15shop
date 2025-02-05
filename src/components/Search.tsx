"use client";
import { DEFAULT_LANGUAGE } from "@/types/languages";
import Form from "next/form";
import { SetStateAction, useRef, useState } from "react";
import { PiMagnifyingGlass } from "react-icons/pi";
import { Language } from "../../sanity.types";
import useLangStore from "@/store/langStore";
import useText from "@/hooks/useText";

const Search = ({
  globals,
  setBurgerOpen,
  mobile = false,
}: {
  globals: Language[];
  setBurgerOpen?: (value: SetStateAction<boolean>) => void;
  mobile?: boolean;
}) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  const [searchVal, setSearchVal] = useState("");

  const searchPlaceholder = useText(globals, "search", "single");

  return (
    <Form
      action="/search"
      className={`${mobile && "py-2 mr-1"} relative max-w-48 flex-1`}
      onSubmit={() => setBurgerOpen && setBurgerOpen((prev) => !prev)}
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
  );
};

export default Search;
