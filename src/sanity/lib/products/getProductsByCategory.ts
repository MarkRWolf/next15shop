import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductsByCategory = async (category: string, range: number) => {
  const cat = category.toLowerCase();
  const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
        *[_type == "product" && references(*[_type == "category" && slug.current == $cat]._id) && !(_id in path("drafts.*"))] | order(name asc) [0...$range] {
    ...,
    "category": coalesce(categories[0]->title, ""),
  }`);

  try {
    const products = await sanityFetch({
      query: PRODUCTS_BY_CATEGORY_QUERY,
      params: { cat, range },
    });

    return products.data || [];
  } catch (e) {
    console.log("error fetching products by category", e);
    return [];
  }
};
