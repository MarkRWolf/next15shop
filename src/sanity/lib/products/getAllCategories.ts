import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllCategories = async () => {
  const ALL_CATEGORIES_QUERY = defineQuery(`*[_type == "category"] | order(name asc)`);

  try {
    const data = await sanityFetch({ query: ALL_CATEGORIES_QUERY });
    return data.data || [];
  } catch (e) {
    console.error(`Error fetching categories`, e);
    return [];
  }
};
