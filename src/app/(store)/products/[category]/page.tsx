export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { Product } from "../../../../../sanity.types";
import { getProductsByCategory } from "@/sanity/lib/products/getProductsByCategory";
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";

const ProductPage = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params;

  const categories = await getAllCategories();
  const categoryExists = categories?.find((c) => c.title?.toLowerCase() === category.toLowerCase());
  if (!categoryExists) {
    notFound();
  }
  // Fetch product data on the server side
  const products: Product[] = await getProductsByCategory(category);

  return (
    <div className="">
      <div className="container-main">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
};

export default ProductPage;
