import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getLocalizedTexts = async (section: string) => {
  const LOCALIZED_TEXTS_QUERY = defineQuery(
    `*[_type == "language" && sectionName == $section] | order(name asc)`
  );

  try {
    const data = await sanityFetch({ query: LOCALIZED_TEXTS_QUERY, params: { section } });
    return data.data || [];
  } catch (e) {
    console.error(`Error fetching products`, e);
    return [];
  }
};
