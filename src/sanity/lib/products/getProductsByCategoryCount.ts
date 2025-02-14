import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductsByCategoryCount = async (category: string) => {
  const cat = category.toLowerCase();

  const PRODUCTS_BY_CATEGORY_COUNT_QUERY = defineQuery(
    `count(*[_type == "product" && references(*[_type == "category" && slug.current == $cat]._id) && !(_id in path("drafts.*"))])`
  );

  try {
    const data = await sanityFetch({ query: PRODUCTS_BY_CATEGORY_COUNT_QUERY, params: { cat } });
    return data.data || 0;
  } catch (e) {
    console.error(`Error fetching products`, e);
    return 0;
  }
};
