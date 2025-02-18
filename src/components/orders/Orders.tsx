"use client";

import Image from "next/image";
import { Language, MY_ORDERS_QUERYResult } from "../../../sanity.types";
import { imageUrl } from "@/lib/imageUrl";
import { formatCurrency } from "@/lib/formatCurrency";
import { DEFAULT_LANGUAGE } from "@/types/languages";
import useText from "@/hooks/useText";
import useLangStore from "@/store/langStore";

interface OrdersProps {
  orders: MY_ORDERS_QUERYResult;
  ordersText: Language[];
}
function Orders({ orders, ordersText }: OrdersProps) {
  const { lang } = useLangStore();
  const ordersHeader = useText(ordersText, "orders", "single");
  const number = useText(ordersText, "number", "single");
  const date = useText(ordersText, "date", "single");
  const amount = useText(ordersText, "amount", "single");
  const items = useText(ordersText, "items", "single");
  const quantity = useText(ordersText, "quantity", "single");
  const none = useText(ordersText, "none", "single");
  const discount = useText(ordersText, "discount", "single");
  const original = useText(ordersText, "original", "single");
  const status = useText(ordersText, "status", "single");

  return (
    <div className="container-main px-2 sm:px-0">
      <div className="bg-stone-100 p-4 sm:p-8 rounded-xl">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-8">{ordersHeader}</h1>
        {orders.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>{none}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {orders.map((order) => (
              <div
                key={order.orderNumber}
                className="bg-stone-100 border border-gray-300 rounded-lg shadow-sm overflow-hidden"
              >
                <div className="p-4 sm:p-6 borer-b border-gray-200">
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1 font-bold">{number}</p>
                      <p className="text-sm  break-all">{order.orderNumber}</p>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-sm text-gray-600 mb-1">{date}</p>
                      <p className="font-medium">
                        {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                    <div className="flex items-center">
                      <span className="tex-tsm mr-2">{status}</span>
                      <span
                        className={`px-4 py-1.5 rounded-full text-sm ${order.status === "paid" ? "bg-black/90 text-white/95" : "bg-gray-100 text-gray-800"}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-sm text-gray-600 mb-1">{amount}</p>
                      <p className="font-bold text-lg">
                        {formatCurrency(order.totalPrice ?? 0, order.currency)}
                      </p>
                    </div>
                  </div>
                  {/* Discount if applied */}
                  {order.discountAmount ? (
                    <div className="mt-4 p-3 sm:p-4 bg-red-50 rounded-lg">
                      <p className="text-red-600 font-medium mb-1 text-sm sm:text-base">
                        {discount} {formatCurrency(order.discountAmount, order.currency)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {original}{" "}
                        {formatCurrency(
                          (order.totalPrice ?? 0) + order.discountAmount,
                          order.currency
                        )}
                      </p>
                    </div>
                  ) : null}
                </div>
                <div className="px-4 py-3 sm:px-6 sm:py-4">
                  <p className="text-sm font-semibold text-gray-600 mb-3 sm:mb-4">{items}</p>
                  {order.products?.map((product) => (
                    <div
                      key={product.size! + product.product?._id}
                      className="py-2 border-b last:border-b-0"
                    >
                      <div className="flex w-full items-center gap-3">
                        {product.product?.images && (
                          <div className="relative w-16 h-16">
                            <Image
                              src={imageUrl(product.product.images[0]).url()}
                              alt={
                                product.product?.[`name_${lang}`] ??
                                product.product?.[`name_${DEFAULT_LANGUAGE}`] ??
                                ""
                              }
                              className="object-cover"
                              fill
                            />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-sm sm:text-base">
                            {product.product?.[`name_${lang}`] ??
                              product.product?.[`name_${DEFAULT_LANGUAGE}`] ??
                              "Unknown product"}
                          </p>
                          <p>
                            {product.quantity ?? "N/A"}x {product.size}
                          </p>
                        </div>
                        <p className="font-medium grow text-right">
                          {product.product?.price && product.quantity
                            ? formatCurrency(
                                product.product.price * product.quantity,
                                order.currency
                              )
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
