import { getLocalizedTexts } from "@/sanity/lib/lang/getLocalizedTexts";
import { Category, Product } from "../../sanity.types";
import CategorySelector from "./CategorySelector";
import ProductGrid from "./ProductGrid";
import ProductMsg from "./ProductMsg";
import ProductsHeader from "./ProductsHeader";

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
  category?: string;
}

const ProductsView = async ({ products, categories, category }: ProductsViewProps) => {
  const [productText, categoryTexts] = await Promise.all([
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
      </div>
    </div>
  );
};

export default ProductsView;
