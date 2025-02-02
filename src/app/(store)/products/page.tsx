export const dynamic = "force-dynamic";

import { Product } from "../../../../sanity.types";
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

const ProductPage = async () => {
  const categories = await getAllCategories();
  const products: Product[] = await getAllProducts();

  return (
    <div className="">
      <div className="container-main">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
};

export default ProductPage;
