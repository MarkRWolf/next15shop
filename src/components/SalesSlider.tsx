import { getActiveSales } from "@/sanity/lib/sales/getActiveSales";
import SaleBanner from "./SaleBanner";
import { Sale } from "../../sanity.types";
import { Swiper, SwiperSlide } from "swiper/react";
import SaleSwiper from "./SaleSwiper";

const SalesSlider = async () => {
  const sales: Sale[] = await getActiveSales();
  if (!sales.length) return null;

  return <SaleSwiper sales={sales} />;
};

export default SalesSlider;
