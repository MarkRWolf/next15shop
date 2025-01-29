import { getActiveSales } from "@/sanity/lib/sales/getActiveSales";
import { Sale } from "../../../sanity.types";
import SaleSwiper from "./SaleSwiper";
import { getLocalizedTexts } from "@/sanity/lib/lang/getLocalizedTexts";

const SalesSlider = async () => {
  const sales: Sale[] = await getActiveSales();
  if (!sales.length) return null;
  const salesText = await getLocalizedTexts("sale");

  return <SaleSwiper sales={sales} salesText={salesText} />;
};

export default SalesSlider;
