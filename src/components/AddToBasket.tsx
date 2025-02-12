"use client";
import useBasketStore from "@/store/basketStore";
import { PRODUCT_SIZES, ProductSize } from "@/types/productSizes";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Product } from "../../sanity.types";
import { useEffect, useRef, useState } from "react";
import { FaX } from "react-icons/fa6";

interface AddToBasketProps {
  product: Product;
}

const AddToBasket = ({ product }: AddToBasketProps) => {
  const { items, addItem, removeItem, getItemCount, shaking, shake } = useBasketStore();
  const [sizeHovered, setSizeHovered] = useState<ProductSize | null>(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      className="grow max-w-[400px] h-[41px] max-h-[41px] border-b border-stone-400 flex items-stretch"
    >
      {/* Left Icon */}
      <div className="relative basis-1/6 p-1 flex justify-center items-center bg-stone-800 text-white cursor-default">
        {/* X Overlay on mobile when size active */}
        <div
          className="absolute inset-0 w-full h-full flex justify-center items-center bg-stone-800"
          style={{
            display: sizeHovered ? (isMobile ? "flex" : "none") : "none",
          }}
        >
          <FaX className="w-5 h-4" />
        </div>
        <span className="w-6 h-6">
          <HiOutlineShoppingBag
            className="w-full h-full transition-all duration-150"
            style={{
              display: sizeHovered ? "none" : "block",
              transform: shaking && sizeHovered ? "rotate(10deg)" : "rotate(0deg)",
            }}
          />
        </span>
      </div>

      {/* Sizes */}
      <div className="basis-5/6 flex flex-wrap">
        {...PRODUCT_SIZES.map((size, index) => {
          const itemInCart = items.find(
            (item) => item.product._id === product._id && item.size === size
          );
          const outOfStock = product[`stock${size}`] < 1;
          return (
            <button
              key={size}
              onMouseEnter={() => setSizeHovered(size)}
              onMouseLeave={() => setSizeHovered(null)}
              disabled={outOfStock}
              className={`w-[20%] btn relative grow border-l border-t ${
                outOfStock ? "bg-rose-700/40" : "bg-stone-300/30"
              } border-l-stone-300 border-t-stone-400 flex flex-col justify-center items-center select-none`}
            >
              <p className="leading-none">{size}</p>
              <span className="text-xs leading-none  flex items-center">
                <p className="text-[10px] ">
                  {itemInCart?.quantity ? itemInCart?.quantity + "/" : ""}
                </p>
                <p
                  className={`${itemInCart?.quantity === product[`stock${size}`] && "text-red-500"}`}
                >
                  {product[`stock${size}`]}
                </p>
              </span>

              {/* overlay */}
              <div
                className={`absolute ${sizeHovered === size ? "flex bg-gradient-to-b from-stone-300/95 to-stone-200/20" : "hidden"} text-2xl w-full h-full   text-stone-700`}
              >
                {/* Minus */}
                <span
                  className="grow border-r lg:hover:bg-gradient-to-b lg:hover:from-stone-300/70 lg:hover:to-stone-200/20 border-stone-600/35 flex justify-center items-center"
                  onClick={() => {
                    if (itemInCart) {
                      removeItem(product._id, size);
                      shake();
                    }
                  }}
                  onTouchStart={(e) =>
                    (e.currentTarget.style.background =
                      "linear-gradient(to bottom, rgba(214, 211, 209, 0.5) 100%, rgba(231, 229, 228, 0.1) 0%)")
                  }
                  onTouchEnd={(e) => (e.currentTarget.style.background = "")}
                >
                  -
                </span>
                {/* Plus */}
                <span
                  className={`grow lg:hover:bg-gradient-to-b lg:hover:from-stone-300/70 lg:hover:to-stone-200/20 flex justify-center items-center ${itemInCart?.quantity === product[`stock${size}`] && "text-red-500"}`}
                  onClick={() => {
                    if (getItemCount(product._id, size) < (product[`stock${size}`] ?? 0)) {
                      addItem(product, size);
                      shake();
                    }
                  }}
                  onTouchStart={(e) =>
                    (e.currentTarget.style.background =
                      "linear-gradient(to bottom, rgba(214, 211, 209, 0.5) 100%, rgba(231, 229, 228, 0.1) 0%)")
                  }
                  onTouchEnd={(e) => (e.currentTarget.style.background = "")}
                >
                  +
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AddToBasket;
