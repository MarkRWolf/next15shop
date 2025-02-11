import { Swiper } from "swiper/types";
import { Hero, Sale } from "../../../sanity.types";
import { useSwiper } from "swiper/react";

const SalePagination = ({ sales, heroes }: { sales: Sale[]; heroes: Hero[] }) => {
  const swiper: Swiper = useSwiper();
    const allSlides = [...sales, ...heroes];
    
  return (
    <div className="absolute bottom-0 left-0 right-0 flex justify-center z-10 text-white gap-2">
      {sales.map((sale, index) => (
        <div
          key={sale._id}
          className="flex justify-center items-center p-1 "
          onClick={() => swiper.slideTo(index, 500, true)}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default SalePagination;
