import ProductsView from "@/components/ProductsView";
import SalesSlider from "@/components/SalesSlider";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <div className="">
      <SalesSlider />

      <div className="mx-auto max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-7xl ">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
