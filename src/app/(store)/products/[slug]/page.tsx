// File: app/products/[slug]/page.tsx

import { notFound } from "next/navigation";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import { PortableText } from "@portabletext/react";
import AddToBasketButton from "@/components/AddToBasketButton";
import { Product } from "../../../../../sanity.types";

// Enable ISR with revalidation every 60 seconds
export const revalidate = 60;

interface ProductPageProps {
  params: { slug: string };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params;

  // Fetch product data on the server side
  const product: Product[] = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const isOutOfStock = !product.stock || product.stock <= 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${
            isOutOfStock ? "opacity-50" : ""
          }`}
        >
          {product.image && (
            <Image
              loading="eager"
              decoding="sync"
              src={imageUrl(product.image).url()}
              alt={product.name ?? "Product Image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width:1200px) 50vw, 33vw"
              quality={65}
              priority
              className="object-contain transition-transform duration-300 hover:scale-105"
            />
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="text-xl font-semibold mb-4">{product.price?.toFixed(2)},-</div>
            <div className="prose max-w-none mb-6">
              {Array.isArray(product.description) && <PortableText value={product.description} />}
            </div>
          </div>
          <div className="mt-6">
            <AddToBasketButton product={product} disabled={isOutOfStock} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
