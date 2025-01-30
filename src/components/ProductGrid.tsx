"use client";
import { Language, Product } from "../../sanity.types";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { cleanProducts } from "@/utils/cleanProducts";
import useLangStore from "@/store/langStore";
import { DEFAULT_LANGUAGE } from "@/types/languages";
const ProductGrid = ({ products, productMsg }: { products: Product[]; productMsg: Language[] }) => {
  const { lang } = useLangStore();
  const cleanedProducts = cleanProducts(products, lang);

  const msgContent = productMsg[0]?.content || [];

  const getLocalizedText = (key: string) => {
    const item = msgContent?.find((g) => g.key === key);
    const localizedText = item?.localizedText?.[lang];
    return localizedText && localizedText.length > 0
      ? localizedText
      : item?.localizedText?.[DEFAULT_LANGUAGE];
  };

  const msg = getLocalizedText("msg");

  return (
    <>
      <div className="w-full text-center bg-red-600 text-white">{msg}</div>
      <div
        className="grid w-full mt-8 gap-y-4 sm:gap-x-8 grid-cols-1 sm:grid-cols-2 
      md:grid-cols-3 xl:grid-cols-4 sm:mt-12 lg:mt-20 "
      >
        {cleanedProducts.map((product) => (
          <AnimatePresence key={product._id}>
            <motion.div
              layout
              key={product._id}
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className=""
            >
              <ProductCard product={product} />
            </motion.div>
          </AnimatePresence>
        ))}
      </div>
    </>
  );
};

export default ProductGrid;
