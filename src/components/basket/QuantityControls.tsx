import useBasketStore, { BasketItem } from "@/store/basketStore";
import { Product } from "../../../sanity.types";

const QuantityControls = ({ item, dbProduct }: { item: BasketItem; dbProduct: Product }) => {
  const { addItem, removeItem } = useBasketStore();
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      className="w-24 flex justify-between select-none"
    >
      <span
        className="cursor-pointer grow text-white text-xl border border-stone-950/80 bg-black/90 hover:bg-black/85 flex justify-center items-center"
        onClick={() => removeItem(item.product._id, item.size)}
      >
        -
      </span>
      <span className="grow border-t border-b border-stone-950/80 flex justify-center items-center">
        <span className="text-[10px] leading-none  flex items-center">
          <p className="text-xs">{item.quantity}</p>
          <p>/</p>
          <p
            className={`mt-0.5 ${item?.quantity === dbProduct![`stock${item.size}`] && "text-red-500"}`}
          >
            {dbProduct![`stock${item.size}`]}
          </p>
        </span>
      </span>
      <span
        className="cursor-pointer grow text-white text-xl border border-stone-950/80 bg-black/90 hover:bg-black/85 flex justify-center items-center"
        onClick={() => addItem(item.product, item.size)}
      >
        +
      </span>
    </div>
  );
};

export default QuantityControls;
