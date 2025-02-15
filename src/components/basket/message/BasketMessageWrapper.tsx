"use client";
import dynamic from "next/dynamic";
import { Language } from "../../../../sanity.types";
const BasketMessage = dynamic(() => import("@/components/basket/message/BasketMessage"), {
  ssr: false,
});

const BasketMessageWrapper = ({ globals }: { globals: Language[] }) => {
  return <BasketMessage globals={globals} />;
};

export default BasketMessageWrapper;
