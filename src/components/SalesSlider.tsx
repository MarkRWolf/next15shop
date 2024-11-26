import { getActiveSales } from "@/sanity/lib/sales/getActiveSales";
import SaleBanner from "./SaleBanner";
import { Sale } from "../../sanity.types";

const SalesSlider = async () => {
  const sales: Sale[] = await getActiveSales();
  if (!sales.length) return null;

  if (sales.length === 1) {
    const sale = sales[0];
    return <SaleBanner sale={sale} />;
  }

  return <></>;
};

export default SalesSlider;
