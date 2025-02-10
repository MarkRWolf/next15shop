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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-12 rounded-xl shadow-lg max-w-2xl w-full mx-4">
        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-6 text-center">{thanks}</h1>
        <div className="border-t border-b border-gray-200 py-6 mb-6">
          <p className="text-lg text-gray-700 mb-4">{processing}</p>
          <div className="space-y-2">
            {orderNumber && (
              <p className="text-gray-600 flex items-center space-x-5">
                <span>{number}:</span>
                <span className=" text-sm text-green-600">{orderNumber}</span>
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-green-600 hover:bg-green-700">
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
