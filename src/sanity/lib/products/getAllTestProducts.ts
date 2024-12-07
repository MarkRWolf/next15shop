import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllTestProducts = async () => {
  const ALL_TEST_PRODUCTS_QUERY = defineQuery(
    `*[ 
  _type == "producttest" &&
  !(_id in path("drafts.*"))
] | order(lower(names[0].value) asc) {
  ...,
  "names": names[] { ..., "language": lang->name },
"category": (coalesce(categories[0]->title, "Uncategorized") + "")
  }
`
  );

  try {
    const data = await sanityFetch({ query: ALL_TEST_PRODUCTS_QUERY });
    return data.data || [];
  } catch (e) {
    console.error(`Error fetching products`, e);
    return [];
  }
};
