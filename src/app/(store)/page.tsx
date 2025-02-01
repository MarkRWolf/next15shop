export const dynamic = "auto";

import ProductsView from "@/components/ProductsView";
import SalesSlider from "@/components/saleSlider/SalesSlider";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {
  const [products, categories] = await Promise.all([getAllProducts(), getAllCategories()]);

  return (
    <div className="w-full">
      <SalesSlider />
      <div className="container-main">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
