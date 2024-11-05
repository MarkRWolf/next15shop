import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllSomething = async (value: string) => {
  const ALL_PRODUCTS_QUERY = defineQuery(`*[_type == "product"] | order(name asc)`);
  const ALL_CATEGORIES_QUERY = defineQuery(`*[_type == "category"] | order(name asc)`);

  const finalQuery =
    value === "product" ? ALL_PRODUCTS_QUERY : value === "category" && ALL_CATEGORIES_QUERY;

  if (!finalQuery) {
    console.error(`Invalid value: ${value}`);
    return [];
  }

  try {
    const data = await sanityFetch({ query: finalQuery });
    return data.data || [];
  } catch (e) {
    console.error(`Error fetching ${value}s`, e);
    return [];
  }
};
