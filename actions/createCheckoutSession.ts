"use server";

import { imageUrl } from "@/lib/imageUrl";
import stripe from "@/lib/stripe";
import { BasketItem } from "@/store/basketStore";
import { auth } from "@clerk/nextjs/server";

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
};

export type GroupedBasketItem = {
  product: BasketItem["product"];
  quantity: number;
};

export const createCheckoutSession = async (items: GroupedBasketItem[], metadata: Metadata) => {
  try {
    const { userId } = await auth();

    if (!userId || userId !== metadata.clerkUserId) {
      throw new Error("User authentication failed.");
    }

    const itemsWithoutPrice = items.filter((item) => !item.product.price);
    if (itemsWithoutPrice.length > 0) throw new Error("some items do not have a price");

    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : "always",
      customer_email: !customerId ? metadata.customerEmail : undefined,
      metadata,
      mode: "payment",
      allow_promotion_codes: true,
      success_url: `${process.env.VERCEL_URL ? `https://next15shop.vercel.app` : process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `${process.env.VERCEL_URL ? `https://next15shop.vercel.app` : process.env.NEXT_PUBLIC_BASE_URL}/basket`,
      line_items: items.map((item) => ({
        price_data: {
          currency: "dkk",
          unit_amount: Math.round(item.product.price! * 100),
          product_data: {
            name: item.product.name ?? "Unknown product",
            description: `Product ID: ${item.product._id}`,
            metadata: {
              id: item.product._id,
            },
            images: item.product.images ? [imageUrl(item.product.images[0]).url()] : undefined,
          },
        },
        quantity: item.quantity,
      })),
    });

    return session.url;
  } catch (e) {
    console.error("Error creating checkout session", e);
    throw e;
  }
};
