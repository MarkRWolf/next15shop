import { getActiveSales } from "@/sanity/lib/sales/getActiveSales";
import SaleSwiper from "./SaleSwiper";
import { getLocalizedTexts } from "@/sanity/lib/lang/getLocalizedTexts";
import { getActiveHeroes } from "@/sanity/lib/sales/getActiveHeroes";

const SalesSlider = async () => {
  const [sales, heroes, salesText] = await Promise.all([
    getActiveSales(),
    getActiveHeroes(),
    getLocalizedTexts("sale"),
  ]);

  return (
    <div className={`w-full h-[75vh]`}>
      <SaleSwiper sales={sales} heroes={heroes} salesText={salesText} />
    </div>
  );
};

export default SalesSlider;
