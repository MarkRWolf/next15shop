import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllGlobals = async () => {
  const ALL_GLOBALS_QUERY = defineQuery(
    `*[_type == "language" && sectionName == "global"] | order(name asc)`
  );

  try {
    const data = await sanityFetch({ query: ALL_GLOBALS_QUERY });
    return data.data || [];
  } catch (e) {
    console.error(`Error fetching products`, e);
    return [];
  }
};
