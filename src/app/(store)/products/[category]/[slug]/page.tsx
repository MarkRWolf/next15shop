// File: app/products/[slug]/page.tsx
export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { Product } from "../../../../../../sanity.types";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import SingleProduct from "@/components/singleProduct/SingleProduct";

const ProductPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  // Fetch product data on the server side
  const product: Product | null = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  return <SingleProduct product={product} />;
};

export default ProductPage;
