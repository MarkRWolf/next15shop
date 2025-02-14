import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
export const getProductsCount = async () => {
  const PRODUCTS_COUNT_QUERY = defineQuery(
    `count(*[_type == "product" && !(_id in path("drafts.*"))])`
  );

  try {
    const data = await sanityFetch({ query: PRODUCTS_COUNT_QUERY });
    return data.data || 0;
  } catch (e) {
    console.error(`Error fetching products`, e);
    return 0;
  }
};
