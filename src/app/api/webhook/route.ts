import { backendClient } from "@/sanity/lib/backendClient";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import stripe from "@/lib/stripe";
import Stripe from "stripe";
import { Metadata } from "../../../../actions/createCheckoutSession";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");
  console.log("hit");
  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.log("Stripe webhook secret not found");
    return NextResponse.json({ error: "No webhook secret" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (e) {
    console.error("Error verifying webhook signature", e);
    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    console.log("completed");
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const order = await createOrderInSanity(session);
      console.log("Order created inSanity", order);
    } catch (e) {
      console.log("Error creating order in Sanity", e);
      return NextResponse.json({ error: "Error creating order in Sanity" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

async function createOrderInSanity(session: Stripe.Checkout.Session) {
  const { id, amount_total, currency, metadata, payment_intent, customer, total_details } = session;
  const { orderNumber, customerName, customerEmail, clerkUserId } = metadata as Metadata;

  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(id, {
    expand: ["data.price.product"],
  });

  const sanityProducts = lineItemsWithProduct.data.map((item) => ({
    _key: crypto.randomUUID(),
    product: {
      _type: "reference",
      _ref: (item.price?.product as Stripe.Product).metadata.id,
    },
    quantity: item.quantity || 0,
  }));

  const order = await backendClient.create({
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    customerName,
    stripeCustomerId: customer,
    clerkUserId: clerkUserId,
    email: customerEmail,
    currency,
    discountAmount: total_details?.amount_discount ? total_details?.amount_discount / 100 : 0,
    products: sanityProducts,
    totalPrice: amount_total ? amount_total / 100 : 0,
    status: "paid",
    orderDate: new Date().toISOString(),
  });

  await Promise.all(
    sanityProducts.map(async (item) => {
      const productId = item.product._ref;
      const quantityPurchased = item.quantity || 0;
      await decreaseProductStock(productId, quantityPurchased);
    })
  );

  return order;
}

async function decreaseProductStock(productId: string, quantity: number) {
  const product = await backendClient.fetch(`*[_type == "product" && _id == $productId][0]`, {
    productId,
  });
  if (product && product.stock !== undefined) {
    const newStock = Math.max(product.stock - quantity, 0); // Ensure stock doesn’t go negative
    await backendClient.patch(productId).set({ stock: newStock }).commit();
  }
}
