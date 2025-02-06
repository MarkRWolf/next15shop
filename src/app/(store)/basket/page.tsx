export const dynamic = "force-dynamic";

import { getLocalizedTexts } from "@/sanity/lib/lang/getLocalizedTexts";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import BasketWrapper from "@/components/basket/BasketWrapper";

const BasketPage = async () => {
  const basketText = await getLocalizedTexts("basket");
  const products = await getAllProducts();
  return <BasketWrapper basketText={basketText} products={products} />;
};

export default BasketPage;
