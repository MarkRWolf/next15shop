export const dynamic = "force-dynamic";

import { getLocalizedTexts } from "@/sanity/lib/lang/getLocalizedTexts";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import BasketWrapper from "@/components/basket/BasketWrapper";

const BasketPage = async () => {
  const [basketText, ordersText, products] = await Promise.all([
    getLocalizedTexts("basket"),
    getLocalizedTexts("orders"),
    getAllProducts(),
  ]);

  return <BasketWrapper basketText={basketText} ordersText={ordersText} products={products} />;
};

export default BasketPage;
