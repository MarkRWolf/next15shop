import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getActiveSales = async () => {
  const GET_ACTIVE_SALES = defineQuery(
    `*[_type == "sale" && isActive == true && !(_id in path("drafts.*"))] | order(validFrom desc)`
  );
  /* { _id, title, description, discountAmount, couponCode, startDate, endDate, isActive } */

  try {
    const data = await sanityFetch({
      query: GET_ACTIVE_SALES,
    });

    return data?.data || [];
  } catch (e) {
    console.error(`Error fetching active sales`, e);
    return [];
  }
};
