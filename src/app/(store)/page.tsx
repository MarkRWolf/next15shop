export const dynamic = "force-dynamic";

import ProductsView from "@/components/ProductsView";
import SalesSlider from "@/components/saleSlider/SalesSlider";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getProductsInRange } from "@/sanity/lib/products/getProductsInRange";

export default async function Home() {
  const [products, categories] = await Promise.all([getProductsInRange(4), getAllCategories()]);

  return (
    <div className="w-full -mt-14 flex flex-col gap-12">
      <SalesSlider />

      <div className="">
        <ProductsView />
      </div>
    </div>
  );
}
