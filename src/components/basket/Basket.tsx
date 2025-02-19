"use client";
import NextImage from "next/image";
import { useEffect, useRef, useState } from "react";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { createCheckoutSession, Metadata } from "../../../actions/createCheckoutSession";
import { DEFAULT_LANGUAGE } from "@/types/languages";
import { Language, Product } from "../../../sanity.types";
import { useTransitionRouter } from "next-view-transitions";
import { imageUrl } from "@/lib/imageUrl";
import useBasketStore from "@/store/basketStore";
import useLangStore from "@/store/langStore";
import useText from "@/hooks/useText";
import QuantityControls from "./QuantityControls";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface BasketProps {
  basketText: Language[];
  ordersText: Language[];
  products: Product[];
}

const Basket = ({ basketText, ordersText, products }: BasketProps) => {
  const pathname = usePathname();
  const router = useTransitionRouter();
  const basketItems = useBasketStore((state) => state.getGroupedItems());
  const { basketOpen, setBasketOpen, getTotalPrice } = useBasketStore();
  const { isSignedIn } = useAuth();
  const { lang } = useLangStore();
  const { user } = useUser();
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const basket = useText(basketText, "basket", "single");
  const summary = useText(basketText, "summary", "single");
  const items = useText(basketText, "items", "single");
  const total = useText(basketText, "total", "single");
  const processing = useText(basketText, "processing", "single");
  const checkout = useText(basketText, "checkout", "single");
  const empty = useText(basketText, "empty", "single");
  const signin = useText(basketText, "signin", "single");
  const size = useText(basketText, "size", "single");
  const quantity = useText(ordersText, "quantity", "single");

  useEffect(() => {
    useBasketStore.getState().validateBasket(products);
  }, [products, lang]);

  useEffect(() => {
    setBasketOpen(false);
  }, [pathname]);

  const handleCheckout = async () => {
    if (!isSignedIn) return;
    setIsLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
        clerkUserId: user!.id,
      };
      const checkoutUrl = await createCheckoutSession(basketItems, lang, metadata);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (e) {
      console.error("Error creating checkout session", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: -350, right: 0 }}
      onDragEnd={(e, info) => info.offset.x > 100 && setBasketOpen(false)}
      animate={{ x: basketOpen ? -350 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        position: "fixed",
        top: "0",
        left: "100%",
        paddingTop: "3.5rem",
        height: "100dvh",
        width: "350px",
      }}
    >
      <div className="w-full h-full px-4 flex flex-col gap-6 bg-gradient-to-bl from-white/95 to-white/90 shadow-[inset_0_3px_0_rgba(128,128,128,0.4)]">
        <h2 className="text-3xl text-center py-7 mb-6 border-b border-black/80">{basket}</h2>
        <div
          className="flex flex-col gap-8 overflow-scroll no-scrollbar"
          style={{ paddingBottom: bottomRef.current?.offsetHeight ?? 0, marginBottom: "16px" }}
        >
          {basketItems.length ? (
            basketItems.map((item) => {
              const dbProduct = products.find((product) => product._id === item.product._id)!;
              return (
                <div
                  key={item.size + item.product._id}
                  className="flex h-28 items-stretch justify-between"
                >
                  <NextImage
                    src={imageUrl(item.product.images[0]).url()}
                    alt={
                      item.product[`name_${lang}`] ||
                      item.product[`name_${DEFAULT_LANGUAGE}`] ||
                      "Product image"
                    }
                    className="h-full object-contain rounded cursor-pointer"
                    width={96}
                    height={96}
                    onClick={() =>
                      router.push(
                        `/products/${item?.product?.category?.toLowerCase()}/${item?.product?.slug.current}`
                      )
                    }
                  />
                  <div className="flex flex-col items-end justify-between">
                    <h3 className="text-lg sm:text-xl font-semibold truncate">
                      {item.size}{" "}
                      {item.product[`name_${lang}`] || item.product[`name_${DEFAULT_LANGUAGE}`]}
                    </h3>
                    <p className="text-sm xl:text-lg sm:text-base">
                      {((item.product.price ?? 0) * item.quantity).toFixed(2)},-
                    </p>
                    <QuantityControls item={item} dbProduct={dbProduct} />
                  </div>
                </div>
              );
            })
          ) : (
            <h3 className="text-center text-2xl">{empty}</h3>
          )}
        </div>
      </div>
      <div
        ref={bottomRef}
        className="absolute bottom-0 left-0 w-full px-4 py-6 shadow-[inset_0_4px_0_rgba(128,128,128,0.2)] bg-white flex flex-col gap-4"
      >
        <h3 className="text-2xl text-center">{summary}</h3>
        <p>
          {items} {basketItems.reduce((acc, item) => acc + item.quantity, 0)}
        </p>
        <p>
          {total} {getTotalPrice().toFixed(2)},-
        </p>
        {isSignedIn ? (
          <button
            onClick={() => basketItems.length && handleCheckout()}
            disabled={isLoading}
            className="mt-4 w-full bg-black/90 hover:bg-black/85 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            {isLoading ? processing : checkout}
          </button>
        ) : (
          <SignInButton mode="modal">
            <button className="mt-4 w-full bg-black/90 hover:bg-black/85 text-white px-4 py-2 rounded">
              {signin}
            </button>
          </SignInButton>
        )}
      </div>
    </motion.div>
  );
};

export default Basket;
