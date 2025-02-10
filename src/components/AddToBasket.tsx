"use client";
import useBasketStore from "@/store/basketStore";
import { PRODUCT_SIZES, ProductSize } from "@/types/productSizes";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Product } from "../../sanity.types";
import { useState } from "react";

interface AddToBasketProps {
  product: Product;
}

const AddToBasket = ({ product }: AddToBasketProps) => {
  const { items, addItem, removeItem, getItemCount } = useBasketStore();
  const [sizeHovered, setSizeHovered] = useState<ProductSize | null>(null);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      className="grow max-w-[400px] h-[41px] max-h-[41px] border-t border-b border-stone-400 flex items-stretch"
    >
      <div className="basis-1/6 p-1 flex justify-center items-center bg-black text-white cursor-default">
        <HiOutlineShoppingBag className="w-6 h-6" />
      </div>
      <div className="basis-5/6 flex flex-wrap ">
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
              className={`w-[20%] btn relative grow border-r ${
                outOfStock ? "bg-rose-700/40" : "bg-stone-300/30"
              } border-stone-300 flex flex-col justify-center items-center select-none`}
            >
              <div
                className={`absolute ${sizeHovered === size ? "flex" : "hidden"} text-xl w-full h-full bg-stone-200/90 text-stone-500`}
              >
                <span
                  className="grow border-r lg:hover:bg-stone-300/90 hover:bg-stone-200/90 border-stone-600/35 flex justify-center items-center"
                  onClick={() => itemInCart && removeItem(product._id, size)}
                >
                  -
                </span>
                <span
                  className={`grow hover:bg-stone-300/90 flex justify-center items-center ${itemInCart?.quantity === product[`stock${size}`] && "text-red-500"}`}
                  onClick={() =>
                    getItemCount(product._id, size) < (product[`stock${size}`] ?? 0)
                      ? addItem(product, size)
                      : null
                  }
                >
                  +
                </span>
              </div>
              <p className="leading-none">{size}</p>
              <p className="text-xs leading-none">
                <span className="text-[10px] ">
                  {itemInCart?.quantity ? itemInCart?.quantity + "/" : ""}
                </span>
                <span
                  className={`${itemInCart?.quantity === product[`stock${size}`] && "text-red-500"}`}
                >
                  {product[`stock${size}`]}
                </span>
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AddToBasket;
