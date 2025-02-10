"use client";

import dynamic from "next/dynamic";
const SaleBanner = dynamic(() => import("./SaleBanner"), { ssr: false });
import { Hero, Language, Sale } from "../../../sanity.types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import SalePagination from "./SalePagination";
import HeroBanner from "./HeroBanner";

interface SaleSwiperProps {
  sales: Sale[];
  heroes: Hero[];
  salesText: Language[];
}

const SaleSwiper = ({ sales, heroes, salesText }: SaleSwiperProps) => {
  return (
    <div className="relative w-full h-full">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="w-full h-full"
      >
        {sales.map((sale) => (
          <SwiperSlide key={sale._id}>
            <SaleBanner sale={sale} salesText={salesText} />
          </SwiperSlide>
        ))}
        {heroes.map((sale) => (
          <SwiperSlide key={sale._id}>
            <HeroBanner hero={sale} />
          </SwiperSlide>
        ))}
        <SalePagination sales={sales} />
      </Swiper>
    </div>
  );
};

export default SaleSwiper;
