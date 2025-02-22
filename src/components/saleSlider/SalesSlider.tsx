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
    <div className={`w-full h-[80vh] bg-stone-300`}>
      <SaleSwiper sales={sales} heroes={heroes} salesText={salesText} />
    </div>
  );
};

export default SalesSlider;
