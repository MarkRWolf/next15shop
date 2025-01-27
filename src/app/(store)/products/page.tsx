// File: app/products/[slug]/page.tsx

import { notFound } from "next/navigation";
import { Product } from "../../../../sanity.types";
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProductsOld";

const ProductPage = async () => {
  const categories = await getAllCategories();
  const products: Product[] = await getAllProducts();

  if (!products.length) {
    notFound();
  }

  return (
    <div className="">
      <div className="mx-auto max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-7xl ">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
};

export default ProductPage;
