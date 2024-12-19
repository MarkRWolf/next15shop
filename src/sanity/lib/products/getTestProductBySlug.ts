// File: src/sanity/lib/products/getProductBySlug.ts

import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getTestProductBySlug = async (slug: string) => {
  const TESTPRODUCT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "producttest" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    ...,
    "names": names[] { ..., "language": lang->name },
    "descriptions": descriptions[] { ..., "language": lang->name },
    "category": coalesce(categories[0]->title, "")
  }
`);

  try {
    const result = await sanityFetch({
      query: TESTPRODUCT_BY_SLUG_QUERY,
      params: { slug },
    });
    return result.data || null;
  } catch (e) {
    console.log("Error fetching product by slug", e);
    return null;
  }
};
