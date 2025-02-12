"use client";
import useText from "@/hooks/useText";
import { Language } from "../../sanity.types";

const ProductMsg = ({ productText }: { productText: Language[] }) => {
  const msg = useText(productText, "msg", "single");

  return (
    msg && (
      <div className="w-full font-main text-center bg-warning text-white py-4 md:py-2 px-4">
        {msg}
      </div>
    )
  );
};

export default ProductMsg;
