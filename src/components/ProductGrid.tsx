"use client";
import { Product } from "../../sanity.types";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { cleanProducts } from "@/utils/cleanProducts";
import useLangStore from "@/store/langStore";
const ProductGrid = ({ products }: { products: Product[] }) => {
  const { lang } = useLangStore();
  const cleanedProducts = cleanProducts(products, lang);
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 mt-4 place-items-center
"
    >
      {cleanedProducts.map((product) => (
        <AnimatePresence key={product._id}>
          <motion.div
            layout
            key={product._id}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-[370px]"
          >
            <ProductCard product={product} />
          </motion.div>
        </AnimatePresence>
      ))}
    </div>
  );
};

export default ProductGrid;
