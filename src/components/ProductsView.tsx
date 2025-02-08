import { getLocalizedTexts } from "@/sanity/lib/lang/getLocalizedTexts";
import { Category, Product } from "../../sanity.types";
import CategorySelector from "./CategorySelector";
import ProductGrid from "./ProductGrid";

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
    <div className="mt-20 container-main px-2 xs:px-0">
      <CategorySelector categories={categories} categoryTexts={categoryTexts} />
      {productMsg && <p className="text-center text-lg mt-4">{}</p>}
      <div className="mt-12">
        <ProductGrid products={products} productMsg={productMsg} />
      </div>
    </div>
  );
};

export default ProductsView;
