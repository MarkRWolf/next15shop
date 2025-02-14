export const dynamic = "force-dynamic";

import ProductsView from "@/components/ProductsView";
import SalesSlider from "@/components/saleSlider/SalesSlider";

export default async function Home() {

  return (
    <div className="w-full -mt-14 flex flex-col gap-12">
      <SalesSlider />

      <div className="">
        <ProductsView />
      </div>
    </div>
  );
}
