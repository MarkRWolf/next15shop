// NextFaster/src/app/api/prefetch-images/[...rest]/route.ts

import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { NextRequest, NextResponse } from "next/server";

interface PrefetchImage {
  srcset: string;
  sizes: string;
  src: string;
  alt: string;
  loading: string;
}

export async function GET(request: NextRequest) {
  // Extract the pathname from the dynamic route (e.g., t-shirt-black)
  console.log("API Route Hit");
  const slug = request.nextUrl.pathname;
  const pathname = "t-shirt-blue";
  console.log("pathname: ", pathname);

  if (!pathname) {
    return NextResponse.json({ error: "Missing pathname in URL" }, { status: 400 });
  }

  const IMAGES_QUERY = defineQuery(
    `*[_type == "product" && !(_id in path("drafts.*")) && slug.current == ${pathname}] {
      "srcset": image.asset->url,
      "sizes": "100vw",
      "src": image.asset->url,
      "alt": name,
      "loading": "lazy"
    }`
  );

  try {
    // Fetch images from Sanity using the pathname parameter
    const result = await sanityFetch({
      query: IMAGES_QUERY,
      params: { pathname },
    });

    console.log("result", result);

    const images: PrefetchImage[] = (result?.data || []).map((image) => ({
      srcset: image.srcset || "",
      sizes: image.sizes,
      src: image.src || "",
      alt: image.alt || "",
      loading: image.loading,
    })); // Fallback to empty array if data is not found

    return NextResponse.json({ images }, { headers: { "Cache-Control": "public, max-age=3600" } });
  } catch (error) {
    console.error("Error fetching images for prefetch:", error);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}
