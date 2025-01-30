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
    <div className="grid max-w-4xl lg:max-w-7xl grid-cols-1 mx-auto mt-8 gap-y-4 sm:gap-x-8 sm:grid-cols-2 lg:grid-cols-3 sm:mt-12 lg:mt-20 ">
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
  );
};

export default ProductGrid;
