"use client";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { Language } from "../../sanity.types";
import useText from "@/hooks/useText";

const MoreButton = ({
  range,
  productText,
  category,
}: {
  range: number;
  productText: Language[];
  category?: string;
}) => {
  const path = usePathname();
  const router = useTransitionRouter();
  const url = category
    ? `/products/${category.toLowerCase()}?range=${range + 8}`
    : path === "/"
      ? `/products`
      : `/products?range=${range + 8}`;

  const moreBtnText = useText(productText, "moreBtn", "single");
  const moreBtnHomeText = useText(productText, "moreBtnHome", "single");
  const text = path === "/" ? moreBtnHomeText : moreBtnText;
  return (
    <button
      onMouseOver={() => router.prefetch(url)}
      onClick={() => router.push(url)}
      className={`w-max mx-auto px-12 py-4 bg-black rounded-md text-gray-200`}
    >
      {text}
    </button>
  );
};

export default MoreButton;
