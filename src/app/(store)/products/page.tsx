import ProductsView from "@/components/ProductsView";

export const dynamic = "force-dynamic";

const ProductPage = async ({ searchParams }: { searchParams: Promise<{ range?: string }> }) => {
  const { range } = await searchParams;
  const rangeInt = parseInt(range || "4", 10);
  return (
    <div className="">
      <ProductsView range={rangeInt} />
    </div>
  );
};

export default ProductPage;
