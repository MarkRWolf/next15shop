import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getTestProductsByCategory = async (category: string) => {
  const TESTPRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
        *[_type == "producttest" && references(*[_type == "category" && slug.current == $category]._id) && !(_id in path("drafts.*"))] | order(name asc) {
  ...,
  "names": names[] { ..., "language": lang->name },
  "descriptions": descriptions[] { ..., "language": lang->name },
"category": coalesce(categories[0]->title, ""),
}`);

  try {
    const products = await sanityFetch({
      query: TESTPRODUCTS_BY_CATEGORY_QUERY,
      params: { category },
    });

    return products.data || [];
  } catch (e) {
    console.log("error fetching products by category", e);
    return [];
  }
};
