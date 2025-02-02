export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { Product } from "../../../../../../sanity.types";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import SingleProduct from "@/components/singleProduct/SingleProduct";
import { getLocalizedTexts } from "@/sanity/lib/lang/getLocalizedTexts";
import CategorySelector from "@/components/CategorySelector";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import MainHeader from "@/components/MainHeader";
import Breadcrumb from "@/components/Breadcrumb";

const ProductPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const [product, categoryTexts, categories] = await Promise.all([
    getProductBySlug(slug),
    getLocalizedTexts("categorySelector"),
    getAllCategories(),
  ]);

  if (!product) {
    return notFound();
  }

  return (
    <>
      <MainHeader />
      <Breadcrumb />
      <CategorySelector categories={categories} categoryTexts={categoryTexts} />
      <SingleProduct product={product} />
    </>
  );
};

export default ProductPage;
