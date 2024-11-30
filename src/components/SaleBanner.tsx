import { Sale } from "../../sanity.types";

const SaleBanner = ({ sale }: { sale: Sale }) => {
  return (
    <>
      <div className="w-full xl:max-w-7xl max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto bg-gradient-to-r from-slate-900 to-slate-900/90 text-gray-200 px-6 py-10 mt-2">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-left mb-4">{sale.title}</h2>
            <p className="text-left text-xl sm:text-3xl font-semibold mb-6">{sale.description}</p>
            <div className="flex">
              <div className="bg-white text-black py-4 px-6 rounded-full shadow-md transform hover:scale-105 transition duration-300">
                <span className="font-bold text-base sm:text-xl">
                  Use code:<span className="text-red-600">{sale.couponCode}</span>
                </span>
                <span className="ml-2 font-bold text-base sm:text-xl">
                  for {sale.discountAmount}% OFF
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SaleBanner;
