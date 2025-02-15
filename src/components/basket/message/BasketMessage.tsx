"use client";

import useBasketStore from "@/store/basketStore";
import { useEffect, useState } from "react";
import { Language } from "../../../../sanity.types";
import useText from "@/hooks/useText";

const BasketMessage = ({ globals }: { globals: Language[] }) => {
  const { basketReduced, setBasketReduced } = useBasketStore();
  const [animateLine, setAnimateLine] = useState(false);

  const basketNoti = useText(globals, "basketNoti", "single");

  useEffect(() => {
    if (basketReduced) {
      setAnimateLine(true);

      const parentTimer = setTimeout(() => {
        setBasketReduced(false);
        const lineTimer = setTimeout(() => {
          setAnimateLine(false);
        }, 1000);
        return () => clearTimeout(lineTimer);
      }, 3000);

      return () => clearTimeout(parentTimer);
    }
  }, [basketReduced, setBasketReduced]);

  return (
    <div
      className={`absolute ${basketReduced ? "max-h-40" : "max-h-0"} overflow-hidden transition-all duration-1000 truncate top-14 left-0 to-warning from-warning/60 bg-gradient-to-r w-full text-center`}
    >
      <p className="py-1">{basketNoti}</p>
      <div
        className={`absolute w-full ${animateLine ? "translate-x-0" : "-translate-x-full"} transition-transform duration-3000 bottom-0 left-0 h-1 bg-black`}
      ></div>
    </div>
  );
};

export default BasketMessage;
