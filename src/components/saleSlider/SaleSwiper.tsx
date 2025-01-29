"use client";

import SaleBanner from "./SaleBanner";
import { Language, Sale } from "../../../sanity.types";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import SalePagination from "./SalePagination";

const SaleSwiper = ({ sales, salesText }: { sales: Sale[]; salesText: Language[] }) => {
  const swiper = useSwiper();

  return (
    <div className="relative w-full">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="w-full"
      >
        {sales.map((sale) => (
          <SwiperSlide key={sale._id}>
            <SaleBanner sale={sale} salesText={salesText} />
          </SwiperSlide>
        ))}
        <SalePagination sales={sales} />
      </Swiper>
    </div>
  );
};

export default SaleSwiper;
