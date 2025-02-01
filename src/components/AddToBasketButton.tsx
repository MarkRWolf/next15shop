"use client";

import useBasketStore from "@/store/basketStore";
import { useEffect, useState } from "react";
import { motion, useTime, useTransform } from "framer-motion";
import { CleanedProduct } from "@/utils/cleanProducts";

interface AddToBasketButtonProps {
  product: CleanedProduct;
  disabled?: boolean;
  isOutOfStock?: boolean;
}

const AddToBasketButton = ({ product }: AddToBasketButtonProps) => {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const [clickedElement, setClickedElement] = useState<string>("");
  const itemCount = getItemCount(product._id);
  const isOutOfStock = product.stock != null && product.stock < 1;
  const time = useTime();
  const rotate = useTransform(time, [0, 3000], [0, 360], {
    clamp: false,
  });

  const rotatingBg = useTransform(rotate, (r) => {
    return isOutOfStock
      ? `conic-gradient(from ${r}deg, rgb(185, 16, 16), rgb(170, 16, 16), rgb(155, 16, 16), rgb(140, 16, 16))`
      : `conic-gradient(from ${r}deg, rgb(16, 185, 130), rgb(16, 170, 127), rgb(16, 155, 124), rgb(16, 140, 120))`;
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div
      className={`w-24 relative transition-all ${clickedElement === "-" ? "translate-y-0.5" : clickedElement === "+" && "-translate-y-0.5"}`}
    >
      {
        <motion.div
          className={`absolute rounded-full h-[46px] border w-[102.5px] -translate-x-[3.2px] -translate-y-[3.2px]`}
          style={{ background: rotatingBg }}
        ></motion.div>
      }
      <div className="relative z-10 flex items-center justify-between rounded-full bg-white ">
        <button
          onMouseDown={() => setClickedElement("-")}
          onMouseUp={() => setClickedElement("")}
          onTouchStart={() => setClickedElement("-")}
          onTouchEnd={() => setClickedElement("")}
          onClick={(e) => {
            removeItem(product._id);
          }}
          className={`px-3 h-full -translate-y-0.5 text-4xl  ${itemCount === 0 && "cursor-not-allowed"}`}
          disabled={isOutOfStock}
        >
          -
        </button>
        <span className={`w-8 text-center font-semibold cursor-default`}>{itemCount}</span>
        <button
          onMouseDown={() => setClickedElement("+")}
          onMouseUp={() => setClickedElement("")}
          onTouchStart={() => setClickedElement("+")}
          onTouchEnd={() => setClickedElement("")}
          onClick={() => {
            addItem(product);
          }}
          className={`px-3 h-full -translate-y-[1px] text-2xl ${itemCount >= (product.stock ?? 0) && "cursor-not-allowed"} ${itemCount >= (product.stock ?? 0) && "text-red-600"}`}
          disabled={itemCount >= (product.stock ?? 0)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default AddToBasketButton;
