// File: app/products/[slug]/page.tsx

import { notFound } from "next/navigation";
import { Product } from "../../../../../sanity.types";
import { getProductsByCategory } from "@/sanity/lib/products/getProductsByCategory";
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";

const ProductPage = async ({ params }: { params: { category: string } }) => {
  const { category } = await params;

  const categories = await getAllCategories();
  const categoryExists = categories?.find((c) => c.title?.toLowerCase() === category.toLowerCase());
  if (!categoryExists) {
    notFound();
  }
  // Fetch product data on the server side
  const products: Product[] = await getProductsByCategory(category);

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
