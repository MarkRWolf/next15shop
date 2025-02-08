export const dynamic = "force-dynamic";

import OrdersWrapper from "@/components/orders/OrdersWrapper";
import { getLocalizedTexts } from "@/sanity/lib/lang/getLocalizedTexts";
import { getMyOrders } from "@/sanity/lib/orders/getMyOrders";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const OrdersPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const orders = await getMyOrders(userId);
  const ordersText = await getLocalizedTexts("orders");

  return <OrdersWrapper orders={orders} ordersText={ordersText}></OrdersWrapper>;
};

export default OrdersPage;
