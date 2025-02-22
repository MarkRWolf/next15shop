import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const searchProducts = async (searchParam: string) => {
  const PRODUCT_SEARCH_QUERY = defineQuery(`
    *[_type == "product" && name_daDK match $searchParam] | order(name asc)`);

  try {
    const products = await sanityFetch({
      query: PRODUCT_SEARCH_QUERY,
      params: { searchParam: `${searchParam}*` },
    });
    return products.data || [];
  } catch (e) {
    console.log("error fetching products by queryObjects", e);
    return [];
  }
};
