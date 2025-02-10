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
  const { items, addItem, getItemCount } = useBasketStore();
  const [sizeHovered, setSizeHovered] = useState<ProductSize | null>(null);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      className="grow h-[41px] max-h-[41px] border-t border-b border-stone-400 flex items-stretch"
    >
      <div className="basis-1/6 p-1 flex justify-center items-center bg-black text-white cursor-default">
        <HiOutlineShoppingBag className="w-6 h-6" />
      </div>
      <div className="basis-5/6 flex flex-wrap ">
        {...PRODUCT_SIZES.map((size, index) => {
          const itemInCart = items.find(
            (item) => item.product._id === product._id && item.size === size
          );
          return (
            <button
              key={size}
              onMouseEnter={() => setSizeHovered(size)}
              onMouseLeave={() => setSizeHovered(null)}
              onClick={() => (product[`stock${size}`] > 0 ? addItem(product, size) : null)}
              disabled={getItemCount(product._id, size) >= (product[`stock${size}`] ?? 0)}
              className={`w-[20%] grow border-r ${
                product[`stock${size}`] < 1
                  ? "bg-rose-700/40"
                  : sizeHovered === size
                    ? "bg-stone-300/80"
                    : "bg-stone-300/30"
              } border-stone-300 flex flex-col justify-center items-center`}
            >
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
