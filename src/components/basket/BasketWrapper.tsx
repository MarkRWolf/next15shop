"use client";

import { Language, Product } from "../../../sanity.types";

import dynamicImport from "next/dynamic";
const Basket = dynamicImport(() => import("@/components/basket/Basket"), { ssr: false });

interface BasketProps {
  basketText: Language[];
  products: Product[];
}

const BasketWrapper = ({ basketText, products }: BasketProps) => {
  return <Basket basketText={basketText} products={products} />;
};

export default BasketWrapper;
