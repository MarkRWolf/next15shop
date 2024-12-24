import { Category, Product } from "../../sanity.types";
import CategorySelector from "./CategorySelector";
import ProductGrid from "./ProductGrid";

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
}

const ProductsView = ({ products, categories }: ProductsViewProps) => {
  return (
    <div className="max-w-7xl mt-20">
      <CategorySelector categories={categories} />

      <div className="mt-12">
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default ProductsView;
