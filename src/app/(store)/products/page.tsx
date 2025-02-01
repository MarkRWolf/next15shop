// File: app/products/[slug]/page.tsx

import { notFound } from "next/navigation";
import { Product } from "../../../../sanity.types";
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { Suspense } from "react";

const ProductPage = async () => {
  const categories = await getAllCategories();
  const products: Product[] = await getAllProducts();

  if (!products.length) return notFound();
  return (
    <div className="">
      <div className="container-main">
        <Suspense fallback={<p>Loading</p>}>
          <ProductsView products={products} categories={categories} />
        </Suspense>{" "}
      </div>
    </div>
  );
};

export default ProductPage;
