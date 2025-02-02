export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { Product } from "../../../../../../sanity.types";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import SingleProduct from "@/components/singleProduct/SingleProduct";
import { getLocalizedTexts } from "@/sanity/lib/lang/getLocalizedTexts";
import CategorySelector from "@/components/CategorySelector";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";

const ProductPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  return (
    <>
      <SingleProduct product={product} />
    </>
  );
};

export default ProductPage;
