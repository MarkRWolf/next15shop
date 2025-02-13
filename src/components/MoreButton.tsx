"use client";
import { useTransitionRouter } from "next-view-transitions";

const MoreButton = ({ range, category }: { range: number; category?: string }) => {
  const router = useTransitionRouter();
  const url = category
    ? `/products/${category.toLowerCase()}?range=${range + 4}`
    : `/products?range=${range + 4}`;
  return (
    <button
      onMouseOver={() => router.prefetch(url)}
      onClick={() => router.push(url)}
      className={`w-max mx-auto px-12 py-4 bg-black rounded-md text-gray-200`}
    >
      Load More
    </button>
  );
};

export default MoreButton;
