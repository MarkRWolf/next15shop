"use client";
import useBasketStore from "@/store/basketStore";
import { useEffect } from "react";
import { Button } from "../ui/button";
import BetterLink from "../BetterLink";
import { Language } from "../../../sanity.types";
import useText from "@/hooks/useText";

const Success = ({ orderNumber, texts }: { orderNumber: string; texts: Language[] }) => {
  const clearBasket = useBasketStore((state) => state.clearBasket);

  const thanks = useText(texts, "thanks", "single");
  const processing = useText(texts, "processing", "single");
  const number = useText(texts, "number", "single");
  const view = useText(texts, "view", "single");
  const home = useText(texts, "home", "single");
  console.log("texts", texts);

  useEffect(() => {
    if (orderNumber) {
      clearBasket();
    }
  }, [orderNumber, clearBasket]);

  return (
    <div className="bg-gray-50">
      <div className="bg-white p-12 sm:mt-0 mt-12 rounded-xl shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-6 text-center">{thanks}</h1>
        <div className="border-t border-b border-gray-200 py-6 mb-6 text-gray-700">
          <p className="text-lg mb-4">{processing}</p>
          <div className="space-y-2 flex justify-center">
            {orderNumber && (
              <p className="flex items-center space-x-5">
                <span>{number}:</span>
                <span className=" text-sm font-semibold">{orderNumber}</span>
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-black/90 hover:bg-black/85">
            <BetterLink href="/profile/orders">{view}</BetterLink>
          </Button>
          <Button asChild variant="outline">
            <BetterLink href="/">{home}</BetterLink>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;
