"use client";

import ProductsView from "@/components/ProductsView";
import { useSearchParams } from "next/navigation";

const PageWrapper = () => {
  const searchParams = useSearchParams();
  const range = searchParams.get("range") || "8";

  return (
    <>
      <ProductsView />
    </>
  );
};

export default PageWrapper;
