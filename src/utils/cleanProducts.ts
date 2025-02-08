/* import { Product } from "../../sanity.types";
import { LanguageKey, DEFAULT_LANGUAGE, nameFields, SUPPORTED_LANGUAGES } from "@/types/languages";
import { PRODUCT_SIZES, StockKey, cleanedStockFields } from "@/types/productSizes";

type LocalizedField<T extends string> = `${T}_${LanguageKey}`;

export type CleanedProduct = Omit<Product, LocalizedField<"name"> | LocalizedField<"description">> &
  cleanedStockFields &
  nameFields & {
    name: Product[LocalizedField<"name">];
    description: Product[LocalizedField<"description">];
    price: Product["price"];
  };

export const cleanProducts = (products: Product[], lang: LanguageKey): CleanedProduct[] => {
  return products.map((product) => {
    const nameKey: LocalizedField<"name"> = `name_${lang}`;
    const descriptionKey: LocalizedField<"description"> = `description_${lang}`;
    const defaultNameKey: LocalizedField<"name"> = `name_${DEFAULT_LANGUAGE}`;
    const defaultDescriptionKey: LocalizedField<"description"> = `description_${DEFAULT_LANGUAGE}`;
    const nameValues = SUPPORTED_LANGUAGES.reduce(
      (acc, langObj) => {
        const nameKey = `name_${langObj.code}` as LocalizedField<"name">;
        acc[langObj.code] = product[nameKey]!;
        return acc;
      },
      {} as Record<LanguageKey, string>
    );
    const stockValues = PRODUCT_SIZES.reduce(
      (acc, size) => {
        const key: StockKey = `stock${size}`;
        acc[key] = product[key]!;
        return acc;
      },
      {} as Record<StockKey, number>
    );

    return {
      ...product,
      name: product[nameKey] ?? product[defaultNameKey],
      description: product[descriptionKey] ?? product[defaultDescriptionKey],
      ...stockValues,
      ...nameValues,
    };
  });
};
 */
