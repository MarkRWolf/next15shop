import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductSize } from "@/types/productSizes";
import { Product } from "../../sanity.types";

export interface BasketItem {
  product: Product;
  size: ProductSize;
  quantity: number;
}

interface BasketState {
  items: BasketItem[];
  basketReduced: boolean;
  setBasketReduced: (value: boolean) => void;
  addItem: (product: Product, size: ProductSize) => void;
  removeItem: (productId: string, size: ProductSize) => void;
  clearBasket: () => void;
  getTotalPrice: () => number;
  getItemCount: (productId: string, size: ProductSize) => number;
  getGroupedItems: () => BasketItem[];
  validateBasket: (products: Product[]) => void;
}

const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      items: [],
      basketReduced: false,
      setBasketReduced: (value: boolean) => set({ basketReduced: value }),
      addItem: (product, size) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id && item.size === size
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id && item.size === size
                  ? {
                      ...item,
                      quantity:
                        item.quantity + 1 <= item.product[`stock${size}`]
                          ? item.quantity + 1
                          : item.quantity,
                    }
                  : item
              ),
            };
          } else {
            return { items: [...state.items, { product, size, quantity: 1 }] };
          }
        }),
      removeItem: (productId, size) =>
        set((state) => ({
          items: state.items.reduce<BasketItem[]>((acc, item) => {
            if (item.product._id === productId && item.size === size) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, []),
        })),
      clearBasket: () => set({ items: [] }),
      getTotalPrice: () =>
        get().items.reduce((acc, item) => acc + (item.product.price ?? 0) * item.quantity, 0),
      getItemCount: (productId, size) => {
        const item = get().items.find(
          (item) => item.product._id === productId && item.size === size
        );
        return item ? item.quantity : 0;
      },
      getGroupedItems: () => get().items,
      validateBasket: (products: Product[]) =>
        set((state) => ({
          items: state.items.filter((item) => {
            const dbProduct: Product | undefined = products.find(
              (prod) => prod._id === item.product._id
            );
            if (!dbProduct) return false;
            const availableStock = dbProduct[`stock${item.size}`];

            if (availableStock < 1) return false;
            if (item.quantity > availableStock) {
              set({ basketReduced: true });
              item.quantity = availableStock;
            }
            return true;
          }),
        })),
    }),
    { name: "basket-store" }
  )
);

export default useBasketStore;
