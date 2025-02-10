import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getActiveHeroes = async () => {
  const GET_ACTIVE_HEROES = defineQuery(
    `*[_type == "hero" && isActive == true && !(_id in path("drafts.*"))] | order(name_daDK desc)`
  );

  try {
    const data = await sanityFetch({
      query: GET_ACTIVE_HEROES,
    });

    return data?.data || [];
  } catch (e) {
    console.error(`Error fetching active sales`, e);
    return [];
  }
};
