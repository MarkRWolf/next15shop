export const dynamic = "force-dynamic";

import ProductsView from "@/components/ProductsView";
import SalesSlider from "@/components/saleSlider/SalesSlider";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {
  const [products, categories] = await Promise.all([getAllProducts(), getAllCategories()]);

  return (
    <div className="w-full -mt-14 flex flex-col gap-12">
      <SalesSlider />

      <div className="">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
