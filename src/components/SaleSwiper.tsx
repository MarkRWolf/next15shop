"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import SaleBanner from "./SaleBanner";
import { Sale } from "../../sanity.types";

const SaleSwiper = ({ sales }: { sales: Sale[] }) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={100}
      loop={true}
      pagination={{ clickable: false }}
      navigation
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      className=""
    >
      {sales.map((sale) => (
        <SwiperSlide key={sale._id}>
          <SaleBanner sale={sale} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SaleSwiper;
