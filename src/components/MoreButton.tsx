"use client";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { Language } from "../../sanity.types";
import useText from "@/hooks/useText";

const MoreButton = ({
  range,
  productsCount,
  productText,
  category,
}: {
  range: number;
  productsCount: number;
  productText: Language[];
  category?: string;
}) => {
  const path = usePathname();
  const router = useTransitionRouter();

  const noMoreText = useText(productText, "noMore", "single");
  const moreBtnText = useText(productText, "moreBtn", "single");
  const moreBtnHomeText = useText(productText, "moreBtnHome", "single");

  const caughtUp = range >= productsCount;

  const text = path === "/" ? moreBtnHomeText : caughtUp ? noMoreText : moreBtnText;
  const inc = 8;
  const newRange = range + inc > productsCount ? productsCount : range + inc;

  const url = category
    ? `/products/${category.toLowerCase()}?range=${newRange}`
    : path === "/"
      ? `/products`
      : `/products?range=${newRange}`;
  return (
    <button
      onMouseOver={() => router.prefetch(url)}
      onClick={() => (path === "/" || !caughtUp) && router.push(url)}
      className={`w-max mx-auto px-12 py-4 bg-black/90 hover:bg-black/85 rounded-md text-gray-200`}
    >
      {text}
    </button>
  );
};

export default MoreButton;
