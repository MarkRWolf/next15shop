"use client";
import useBasketStore from "@/store/basketStore";
import { PRODUCT_SIZES, ProductSize } from "@/types/productSizes";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Product } from "../../sanity.types";

interface AddToBasketProps {
  product: Product;
}

const AddToBasket = ({ product }: AddToBasketProps) => {
  const { items, addItem } = useBasketStore();

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      className="border-t border-b border-stone-400 flex items-stretch"
    >
      <div className="basis-1/6 p-1 flex justify-center items-center bg-black text-white cursor-default">
        <HiOutlineShoppingBag className="w-6 h-6" />
      </div>
      <div className="basis-5/6 flex flex-wrap">
        {...PRODUCT_SIZES.map((size, index) => (
          <div
            key={size}
            onClick={() => (product[`stock${size}`] > 0 ? addItem(product, size) : null)}
            className={`w-[20%] grow border-r ${
              product[`stock${size}`] < 1 ? "bg-rose-700/40" : "bg-stone-300/20"
            } border-stone-300 flex flex-col justify-center items-center`}
          >
            <p>{size}</p>
            <p className="text-xs">
              <span className="text-[10px]">
                {items.find((item) => item.product._id === product._id && item.size === size)
                  ?.quantity
                  ? items.find((item) => item.product._id === product._id && item.size === size)
                      ?.quantity + "/"
                  : ""}
              </span>
              {product[`stock${size}`]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddToBasket;
