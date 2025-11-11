"use server";

import { imageUrl } from "@/lib/imageUrl";
import stripe from "@/lib/stripe";
import { BasketItem } from "@/store/basketStore";
import { DEFAULT_LANGUAGE, LanguageKey } from "@/types/languages";
import { auth } from "@clerk/nextjs/server";

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
};

export type GroupedBasketItem = {
  product: BasketItem["product"];
  size: BasketItem["size"];
  quantity: number;
};

export const createCheckoutSession = async (
  items: GroupedBasketItem[],
  lang: LanguageKey = DEFAULT_LANGUAGE,
  metadata: Metadata
) => {
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

    const customerId: string | undefined =
      customers.data.length > 0 ? customers.data[0].id : undefined;

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : "always",
      customer_email: !customerId ? metadata.customerEmail : undefined,
      metadata,
      mode: "payment",
      allow_promotion_codes: true,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL ? process.env.VERCEL_URL : `https://next15shop.vercel.app`}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL ? process.env.VERCEL_URL ? `https://next15shop.vercel.app`}/`,
      line_items: items.map((item) => ({
        price_data: {
          currency: "dkk",
          unit_amount: Math.round(item.product.price! * 100),
          product_data: {
            name: item.product[`name_${lang}`] ?? "Unknown product",
            description: `Product ID: ${item.product._id}`,
            metadata: {
              id: item.product._id,
              size: item.size,
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
