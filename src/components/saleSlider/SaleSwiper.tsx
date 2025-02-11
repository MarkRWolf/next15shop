"use client";

import dynamic from "next/dynamic";
import { Hero, Language, Sale } from "../../../sanity.types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import SalePagination from "./SalePagination";
import HeroBanner from "./HeroBanner";

const SaleBanner = dynamic(() => import("./SaleBanner"), { ssr: false });

interface SaleSwiperProps {
  sales: Sale[];
  heroes: Hero[];
  salesText: Language[];
}

const SaleSwiper = ({ sales, heroes, salesText }: SaleSwiperProps) => {
  return (
    <div className="relative w-full h-full select-none">
      <Swiper
        modules={[Autoplay]}
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="w-full h-full"
      >
        {sales.map((sale) => (
          <SwiperSlide key={sale._id}>
            <SaleBanner sale={sale} salesText={salesText} />
          </SwiperSlide>
        ))}
        {heroes.map((hero) => (
          <SwiperSlide key={hero._id}>
            <HeroBanner hero={hero} />
          </SwiperSlide>
        ))}
        <SalePagination sales={sales} heroes={heroes} />
      </Swiper>
    </div>
  );
};

export default SaleSwiper;
