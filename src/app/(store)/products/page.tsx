export const dynamic = "force-dynamic";

import { Product } from "../../../../sanity.types";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import ProductsView from "@/components/ProductsView";

const ProductPage = async () => {
  const categories = await getAllCategories();
  const products: Product[] = await getAllProducts();

  return (
    <div className="container-main">
      <ProductsView products={products} categories={categories} />
    </div>
  );
};

export default ProductPage;
