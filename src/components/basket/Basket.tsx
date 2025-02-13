"use client";
import NextImage from "next/image";
import { useEffect, useState } from "react";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { createCheckoutSession, Metadata } from "../../../actions/createCheckoutSession";
import { DEFAULT_LANGUAGE } from "@/types/languages";
import { Language, Product } from "../../../sanity.types";
import { useTransitionRouter } from "next-view-transitions";
import { imageUrl } from "@/lib/imageUrl";
import useBasketStore from "@/store/basketStore";
import useLangStore from "@/store/langStore";
import useText from "@/hooks/useText";

interface BasketProps {
  basketText: Language[];
  ordersText: Language[];
  products: Product[];
}
const Basket = ({ basketText, ordersText, products }: BasketProps) => {
  const router = useTransitionRouter();
  const basketItems = useBasketStore((state) => state.getGroupedItems());
  const { removeItem, addItem } = useBasketStore();
  const { isSignedIn } = useAuth();
  const { lang } = useLangStore();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const basket = useText(basketText, "basket", "single");
  const summary = useText(basketText, "summary", "single");
  const items = useText(basketText, "items", "single");
  const total = useText(basketText, "total", "single");
  const checkout = useText(basketText, "checkout", "single");
  const empty = useText(basketText, "empty", "single");
  const signin = useText(basketText, "signin", "single");
  const size = useText(basketText, "size", "single");
  const quantity = useText(ordersText, "quantity", "single");

  useEffect(() => {
    useBasketStore.getState().validateBasket(products);
  }, [products, lang]);

  if (basketItems.length === 0)
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50dvh]">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">{basket}</h1>
        <p className="text-gray-600 text-lg">{empty}</p>
      </div>
    );

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
    <div className="container-main">
      <h1 className="text-2xl font-bold mb-4">{basket}</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          {basketItems?.map((item) => {
            const dbProduct = products.find((product) => product._id === item.product._id);
            return (
              <div
                key={item.size + item.product._id}
                className="mb-4 p-4 border rounded flex items-center justify-between"
              >
                <div
                  className="flex items-center cursor-pointer flex-1 min-w-0"
                  onClick={() =>
                    router.push(
                      `/products/${item?.product?.category?.toLowerCase()}/${item?.product?.slug.current}`
                    )
                  }
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
                    {item.product.images && (
                      <NextImage
                        src={imageUrl(item.product.images[0]).url()}
                        alt={
                          item.product[`name_${lang}`] ||
                          item.product[`name_${DEFAULT_LANGUAGE}`] ||
                          "Product image"
                        }
                        className="w-full h-full object-contain rounded"
                        width={96}
                        height={96}
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg sm:text-xl font-semibold truncate">
                      {item.product[`name_${lang}`] || item.product[`name_${DEFAULT_LANGUAGE}`]}
                    </h2>
                    <p>
                      {item.quantity ?? "N/A"}x {item.size}
                    </p>
                    <p className="text-sm sm:text-base">
                      {((item.product.price ?? 0) * item.quantity).toFixed(2)},-
                    </p>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                      className="w-24 flex justify-between select-none"
                    >
                      <span
                        className="grow text-white text-xl border border-stone-950/80 bg-black/90 hover:bg-black/85 flex justify-center items-center"
                        onClick={() => removeItem(item.product._id, item.size)}
                      >
                        -
                      </span>
                      <span className="grow border-t border-b border-stone-950/80 flex justify-center items-center">
                        <span className="text-[10px] leading-none  flex items-center">
                          <p className="text-xs">{item.quantity}</p>
                          <p>/</p>
                          <p
                            className={`mt-0.5 ${item?.quantity === dbProduct![`stock${item.size}`] && "text-red-500"}`}
                          >
                            {dbProduct![`stock${item.size}`]}
                          </p>
                        </span>
                      </span>
                      <span
                        className="grow text-white text-xl border border-stone-950/80 bg-black/90 hover:bg-black/85 flex justify-center items-center"
                        onClick={() => addItem(item.product, item.size)}
                      >
                        +
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className=" w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
          <h3 className="text-xl font-semibold">{summary}</h3>
          <div className="mt-4 space-y-2">
            <p className="flex justify-between">
              <span>{items}</span>
              <span>{basketItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
            </p>
            <p className="flex justify-between text-2xl font-bold border-t pt-2">
              <span>{total}</span>
              <span>{useBasketStore.getState().getTotalPrice().toFixed(2)},-</span>
            </p>
          </div>

          {isSignedIn ? (
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="mt-4 w-full bg-black/90 hover:bg-black/85 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
              {isLoading ? "Processing..." : checkout}
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="mt-4 w-full bg-black/90 hover:bg-black/85 text-white px-4 py-2 rounded">
                {signin}
              </button>
            </SignInButton>
          )}
        </div>
        <div className="h-64 lg:h-0"></div>
      </div>
    </div>
  );
};

export default Basket;
