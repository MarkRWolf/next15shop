import { getActiveSales } from "@/sanity/lib/sales/getActiveSales";
import { Sale } from "../../../sanity.types";
import SaleSwiper from "./SaleSwiper";
import { getLocalizedTexts } from "@/sanity/lib/lang/getLocalizedTexts";

const SalesSlider = async () => {
  const [sales, salesText] = await Promise.all([getActiveSales(), getLocalizedTexts("sale")]);

  if (!sales.length) return null;

  return <SaleSwiper sales={sales} salesText={salesText} />;
};

export default SalesSlider;
