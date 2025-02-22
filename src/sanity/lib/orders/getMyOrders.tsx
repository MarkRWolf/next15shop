import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getMyOrders(userId: string) {
  if (!userId) throw new Error("No user ID provided");
  const MY_ORDERS_QUERY = defineQuery(`
    *[_type == "order" && clerkUserId == $userId] | order(orderDate desc) {
        ...,
        products[] {
            ...,
            product->
        }
    }
    `);

  try {
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    });

    return orders.data || [];
  } catch (e) {
    console.log("error fetching orders", e);
    throw new Error("Error fetching orders");
  }
}
