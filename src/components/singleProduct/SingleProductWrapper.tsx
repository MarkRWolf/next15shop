"use client";
import dynamic from "next/dynamic";
import { Language, Product } from "../../../sanity.types";
const SingleProduct = dynamic(() => import("./SingleProduct"), { ssr: false });

interface SingleProductWrapperProps {
  product: Product;
  products: Product[];
  globals: Language[];
}

const SingleProductWrapper = ({ product, products, globals }: SingleProductWrapperProps) => {
  return <SingleProduct globals={globals} product={product} products={products} />;
};

export default SingleProductWrapper;
