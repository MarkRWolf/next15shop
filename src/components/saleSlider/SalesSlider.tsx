import { getActiveSales } from "@/sanity/lib/sales/getActiveSales";
import { Sale } from "../../../sanity.types";
import SaleSwiper from "./SaleSwiper";

const SalesSlider = async () => {
  const sales: Sale[] = await getActiveSales();
  if (!sales.length) return null;

  return <SaleSwiper sales={sales} />;
};

export default SalesSlider;
