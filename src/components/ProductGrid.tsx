"use client";
import { Product } from "../../sanity.types";
import ProductCard from "./ProductCard";
import useLangStore from "@/store/langStore";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import useBasketStore from "@/store/basketStore";

const ProductGrid = ({ products }: { products: Product[] }) => {
  const { lang } = useLangStore();

  useEffect(() => {
    useBasketStore.getState().validateBasket(products);
  }, [products, lang]);

  return (
    <div
      className="grid w-full gap-y-4 sm:gap-x-8 grid-cols-1 sm:grid-cols-2 
      md:grid-cols-3 xl:grid-cols-4 "
    >
      {products.map((product) => (
        <AnimatePresence key={product._id}>
          <motion.div
            layout
            key={product._id}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ProductCard product={product} />
          </motion.div>
        </AnimatePresence>
      ))}
    </div>
  );
};

export default ProductGrid;
