import { Swiper } from "swiper/types";
import { Sale } from "../../../sanity.types";
import { useSwiper } from "swiper/react";

const SalePagination = ({ sales }: { sales: Sale[] }) => {
  const swiper: Swiper = useSwiper();
  return (
    <div className="absolute bottom-0 left-0 right-0 flex justify-center z-10 text-white gap-2">
      {sales.map((sale, index) => (
        <div
          key={sale._id}
          className="flex justify-center items-center p-1 "
          onClick={() => swiper.slideTo(index, 300, true)}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default SalePagination;
