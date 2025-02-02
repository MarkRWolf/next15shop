export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import SingleProduct from "@/components/singleProduct/SingleProduct";

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
