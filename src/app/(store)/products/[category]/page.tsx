export const dynamic = "force-dynamic";

import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";

const ProductPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ range: string }>;
}) => {
  const { category } = await params;
  const { range } = await searchParams;
  const rangeInt = parseInt(range || "4", 10);

  const categories = await getAllCategories();
  const dbCategory = categories?.find((c) => c.title?.toLowerCase() === category.toLowerCase());
  if (!dbCategory) return <h2 className="text-4xl text-center">404</h2>;
  // Continue if category exists

  return (
    <div className="">
      <ProductsView range={rangeInt} category={dbCategory.title} />
    </div>
  );
};

export default ProductPage;
