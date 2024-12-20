import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductsByCategory = async (category: string) => {
  const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
        *[_type == "producttest" && references(*[_type == "category" && slug.current == $category]._id) && !(_id in path("drafts.*"))] | order(name asc) {
    ...,
    "names": names[] { ..., "language": lang->name },
    "descriptions": descriptions[] { ..., "language": lang->name },
    "category": coalesce(categories[0]->title, "")
  }`);

  try {
    const products = await sanityFetch({
      query: PRODUCTS_BY_CATEGORY_QUERY,
      params: { category },
    });

    return products.data || [];
  } catch (e) {
    console.log("error fetching products by category", e);
    return [];
  }
};
