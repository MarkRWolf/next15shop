import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllProducts = async () => {
  const ALL_PRODUCTS_QUERY = defineQuery(
    `*[_type == "product" && !(_id in path("drafts.*"))] | order(lower(name) asc) {
  ...,
  "category": (coalesce(categories[0]->title, "Uncategorized") + "")
}
`
  );

  try {
    const data = await sanityFetch({ query: ALL_PRODUCTS_QUERY });
    return data.data || [];
  } catch (e) {
    console.error(`Error fetching products`, e);
    return [];
  }
};
