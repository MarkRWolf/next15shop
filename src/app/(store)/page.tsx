export const dynamic = "force-dynamic";

import ProductsView from "@/components/ProductsView";
import SalesSlider from "@/components/saleSlider/SalesSlider";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { Suspense } from "react";

export default async function Home() {
  const [products, categories] = await Promise.all([getAllProducts(), getAllCategories()]);

  return (
    <div className="w-full">
      <Suspense fallback={<p>Loading</p>}>
        <SalesSlider />
      </Suspense>
      <div className="container-main">
        <Suspense fallback={<p>Loading</p>}>
          <ProductsView products={products} categories={categories} />
        </Suspense>{" "}
      </div>
    </div>
  );
}
