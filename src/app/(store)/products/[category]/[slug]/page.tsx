export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { getLocalizedTexts } from "@/sanity/lib/lang/getLocalizedTexts";
import SingleProductWrapper from "@/components/singleProduct/SingleProductWrapper";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

const ProductPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const [product, products, globals] = await Promise.all([
    getProductBySlug(slug),
    getAllProducts(),
    getLocalizedTexts("global"),
  ]);

  if (!product) {
    return notFound();
  }

  return (
    <>
      <SingleProductWrapper globals={globals} product={product} products={products} />
    </>
  );
};

export default ProductPage;
