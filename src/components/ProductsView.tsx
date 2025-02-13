import { getLocalizedTexts } from "@/sanity/lib/lang/getLocalizedTexts";
import CategorySelector from "./CategorySelector";
import ProductGrid from "./ProductGrid";
import ProductMsg from "./ProductMsg";
import ProductsHeader from "./ProductsHeader";
import { getProductsInRange } from "@/sanity/lib/products/getProductsInRange";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getProductsByCategory } from "@/sanity/lib/products/getProductsByCategory";
import MoreButton from "./MoreButton";

interface ProductsViewProps {
  category?: string;
  range?: number;
}

const ProductsView = async ({ category, range = 8 }: ProductsViewProps) => {
  const [products, categories, productText, categoryTexts] = await Promise.all([
    category ? getProductsByCategory(category, range) : getProductsInRange(range),
    getAllCategories(),
    getLocalizedTexts("product"),
    getLocalizedTexts("categorySelector"),
  ]);

  return (
    <div className="flex flex-col gap-8 mt-6">
      <ProductsHeader productsText={productText} category={category} />
      <div className="container-main px-2 xs:px-0 flex flex-col gap-8">
        <CategorySelector categories={categories} categoryTexts={categoryTexts} />
        <ProductMsg productText={productText} />
        <ProductGrid products={products} />
        <MoreButton category={category} productText={productText} range={range} />
      </div>
    </div>
  );
};

export default ProductsView;
