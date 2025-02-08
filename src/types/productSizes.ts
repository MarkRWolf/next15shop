export type ProductSize = "S" | "M" | "L" | "XL";

export const PRODUCT_SIZES: ProductSize[] = ["S", "M", "L", "XL"];
export type StockKey = `stock${ProductSize}`;
export type cleanedStockFields = {
  [K in StockKey]: number;
};
