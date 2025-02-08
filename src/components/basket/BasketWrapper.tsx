"use client";

import { Language, Product } from "../../../sanity.types";

import dynamicImport from "next/dynamic";
const Basket = dynamicImport(() => import("@/components/basket/Basket"), { ssr: false });

interface BasketProps {
  basketText: Language[];
  ordersText: Language[];
  products: Product[];
}

const BasketWrapper = ({ basketText, ordersText, products }: BasketProps) => {
  return <Basket basketText={basketText} ordersText={ordersText} products={products} />;
};

export default BasketWrapper;
