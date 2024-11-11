// File: app/api/prefetch-images/[...rest]/route.ts

import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { NextRequest, NextResponse } from "next/server";

interface ProductData {
  name: string;
  price: number;
  description: string;
  stock: number;
  image: string;
  srcset: string;
  sizes: string;
  alt: string;
  loading: string;
}

export async function GET(request: NextRequest) {
  console.log("API Route Hit");

  // Extract the slug from the dynamic route
  const slug = await request.nextUrl.pathname.split("/").pop(); // Get the last part of the URL as slug
  if (!slug) {
    return NextResponse.json({ error: "Missing slug in URL" }, { status: 400 });
  }

  const PRODUCT_QUERY = defineQuery(
    `*[_type == "product" && !(_id in path("drafts.*")) && slug.current == $slug][0] {
      name,
      price,
      description,
      stock,
      "image": image.asset->url,
      "srcset": image.asset->metadata.lqip,
      "sizes": "100vw",
      "alt": name,
      "loading": "lazy"
    }`
  );

  try {
    // Fetch the product data using the slug parameter
    const product = await sanityFetch({
      query: PRODUCT_QUERY,
      params: { slug },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product }, { headers: { "Cache-Control": "public, max-age=36" } });
  } catch (error) {
    console.error("Error fetching product data for prefetch:", error);
    return NextResponse.json({ error: "Failed to fetch product data" }, { status: 500 });
  }
}
