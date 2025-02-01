export const dynamic = "force-dynamic";

import ProductGrid from "@/components/ProductGrid";
import { getLocalizedTexts } from "@/sanity/lib/lang/getLocalizedTexts";
import { searchProducts } from "@/sanity/lib/products/searchProducts";

async function SearchPage({ searchParams }: { searchParams: Promise<{ query: string }> }) {
  const { query } = await searchParams;
  const products = await searchProducts(query);
  const productMsg = await getLocalizedTexts("productMsg");

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
          <h1 className="text-3xl font-bold mb-2 text-center">No products found for: </h1>
          <p className="text-2xl text-center mb-3">{query}</p>
          <p className="text-gray-600 text-center">Try searching with different keywords</p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-6 text-center"></h1>
      <ProductGrid products={products} productMsg={productMsg} />
    </div>
  );
}

export default SearchPage;
