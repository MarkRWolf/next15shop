import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductsInRange = async (range: number) => {
  const PRODUCTS_IN_RANGE_QUERY =
    defineQuery(`*[_type == "product" && !(_id in path("drafts.*"))] | order(lower(name_daDK) asc) [0...$range] {
    ...,
    "category": coalesce(categories[0]->title, ""),
  }`);

  try {
    const data = await sanityFetch({ query: PRODUCTS_IN_RANGE_QUERY, params: { range } });
    return data.data || [];
  } catch (e) {
    console.error(`Error fetching products`, e);
    return [];
  }
};
