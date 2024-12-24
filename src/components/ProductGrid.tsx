"use client";
import { Product } from "../../sanity.types";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "./ProductCard";
const ProductGrid = ({ products }: { products: Product[] }) => {
  return (
    <div className="w-full flex flex-wrap gap-20 justify-start mt-4">
      {products.map((product) => (
        <AnimatePresence key={product._id}>
          <motion.div
            layout
            key={product._id}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-[350px] max-w-[370px] flex-grow"
          >
            <ProductCard product={product} />
          </motion.div>
        </AnimatePresence>
      ))}
    </div>
  );
};

export default ProductGrid;
// grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-24 mt-4 place-items-center
