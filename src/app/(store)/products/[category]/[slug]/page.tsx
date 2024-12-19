// File: app/products/[slug]/page.tsx

import { notFound } from "next/navigation";
import { Product, Producttest } from "../../../../../../sanity.types";
import { getTestProductBySlug } from "@/sanity/lib/products/getTestProductBySlug";
import useLang from "@/hooks/useLang";
import SingleProduct from "@/components/singleProduct/SingleProduct";

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  // Fetch product data on the server side
  const product: Producttest | null = await getTestProductBySlug(slug);
  if (!product) {
    return notFound();
  }

  return <SingleProduct product={product} />;
};

export default ProductPage;
