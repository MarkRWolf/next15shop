import { getLocalizedTexts } from "@/sanity/lib/lang/getLocalizedTexts";
import { Category, Product } from "../../sanity.types";
import CategorySelector from "./CategorySelector";
import ProductGrid from "./ProductGrid";

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
}

const ProductsView = async ({ products, categories }: ProductsViewProps) => {
  const productMsg = await getLocalizedTexts("productMsg");

  return (
    <div className="xl:max-w-7xl lg:max-w-4xl md:max-w-3xl sm:max-w-xl max-w-lg mx-auto mt-20">
      <CategorySelector categories={categories} />
      {productMsg && <p className="text-center text-lg mt-4">{}</p>}
      <div className="mt-12">
        <ProductGrid products={products} productMsg={productMsg} />
      </div>
    </div>
  );
};

export default ProductsView;
