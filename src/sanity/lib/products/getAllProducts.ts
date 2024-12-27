import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllProducts = async () => {
  const ALL_PRODUCTS_QUERY = defineQuery(
    `*[ 
  _type == "product" &&
  !(_id in path("drafts.*"))
] | order(lower(names[0].value) asc) {
  ...,
"category": coalesce(categories[0]->title, ""),
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
