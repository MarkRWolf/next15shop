export const dynamic = "force-dynamic";

import Basket from "@/components/basket/page";
import { Language } from "../../../../sanity.types";
import { getLocalizedTexts } from "@/sanity/lib/lang/getLocalizedTexts";

const BasketPage = async () => {
  const basketText: Language[] = await getLocalizedTexts("basket");

  return <Basket basketText={basketText} />;
};

export default BasketPage;
