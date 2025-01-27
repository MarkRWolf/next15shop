import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllTestSlugs = async () => {
  const ALL_SLUGS_QUERY = defineQuery(
    `*[
        _type == "product" &&
        !(_id in path("drafts.*"))
    ] | order(lower(names[0].value) asc) {
        "slug": slug.current
    }`
  );

  try {
    const data = await sanityFetch({ query: ALL_SLUGS_QUERY });
    return data.data || [];
  } catch (e) {
    console.error(`Error fetching products`, e);
    return [];
  }
};
