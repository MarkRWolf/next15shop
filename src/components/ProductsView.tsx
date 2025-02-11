import { getLocalizedTexts } from "@/sanity/lib/lang/getLocalizedTexts";
import { Category, Product } from "../../sanity.types";
import CategorySelector from "./CategorySelector";
import ProductGrid from "./ProductGrid";
import ProductMsg from "./ProductMsg";

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
}

const ProductsView = async ({ products, categories }: ProductsViewProps) => {
  const [productMsg, categoryTexts] = await Promise.all([
    getLocalizedTexts("productMsg"),
    getLocalizedTexts("categorySelector"),
  ]);

  return (
    <div className="container-main px-2 xs:px-0 flex flex-col gap-8">
      <CategorySelector categories={categories} categoryTexts={categoryTexts} />
      <ProductMsg productMsg={productMsg} />
      <ProductGrid products={products} />
    </div>
  );
};

export default ProductsView;
