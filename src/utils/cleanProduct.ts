/* import { Product } from "../../sanity.types";
import { LanguageKey, DEFAULT_LANGUAGE } from "@/types/languages";

type LocalizedField<T extends string> = `${T}_${LanguageKey}`;

export interface CleanedProduct extends Product {
  name: Product[LocalizedField<"name">];
  description: Product[LocalizedField<"description">];
}

export const cleanProduct = (product: Product, lang: LanguageKey): CleanedProduct => {
  const nameKey: LocalizedField<"name"> = `name_${lang}`;
  const descriptionKey: LocalizedField<"description"> = `description_${lang}`;
  const defaultNameKey: LocalizedField<"name"> = `name_${DEFAULT_LANGUAGE}`;
  const defaultDescriptionKey: LocalizedField<"description"> = `description_${DEFAULT_LANGUAGE}`;

  return {
    ...product,
    name: product[nameKey] ?? product[defaultNameKey],
    description: product[descriptionKey] ?? product[defaultDescriptionKey],
  };
};
 */
