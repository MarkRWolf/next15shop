export const dynamic = "force-dynamic";

import Breadcrumb from "@/components/Breadcrumb";
import MainHeader from "@/components/MainHeader";
import ProductsView from "@/components/ProductsView";
import SalesSlider from "@/components/saleSlider/SalesSlider";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {
  const [products, categories] = await Promise.all([getAllProducts(), getAllCategories()]);

  return (
    <>
      <MainHeader />
      <Breadcrumb />
      <div className="w-full">
        <SalesSlider />
        <div className="container-main">
          <ProductsView products={products} categories={categories} />
        </div>
      </div>
    </>
  );
}
