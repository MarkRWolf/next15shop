import { Product, Category } from "../../sanity.types";
import CategorySelector from "./CategorySelector";
import ProductGrid from "./ProductGrid";

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
}

const ProductsView = ({ products, categories }: ProductsViewProps) => {
  return (
    <div className="w-full max-w-7xl">
      {/* Categories */}
      <div className="w-full sm:w-[200px]">
        <CategorySelector categories={categories} />
      </div>

      {/* Products */}
      <div className="flex-1">
        <div>
          <ProductGrid products={products} />

          <hr className="w-1/2 sm:w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
