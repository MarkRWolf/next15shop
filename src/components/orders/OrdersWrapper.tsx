"use client";

import dynamic from "next/dynamic";
import { Language, MY_ORDERS_QUERYResult } from "../../../sanity.types";
const Orders = dynamic(() => import("@/components/orders/Orders"), { ssr: false });

interface OrdersWrapperProps {
  orders: MY_ORDERS_QUERYResult;
  ordersText: Language[];
}

const OrdersWrapper = ({ orders, ordersText }: OrdersWrapperProps) => {
  return <Orders orders={orders} ordersText={ordersText} />;
};

export default OrdersWrapper;
