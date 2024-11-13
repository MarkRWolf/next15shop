// File: app/products/[slug]/page.tsx

import { notFound } from "next/navigation";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import NextImage from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import { Suspense } from "react";
import AddToBasketButton from "@/components/AddToBasketButton";
import { Product } from "../../../../../sanity.types";

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  // Fetch product data on the server side
  const product: Product | null = await getProductBySlug(slug);

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
            <NextImage
              src={imageUrl(product.image).url()}
              alt={product.name ?? "Product Image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width:1200px) 50vw, 33vw"
              quality={65}
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
            {/*             <div className="prose max-w-none mb-6">
              {Array.isArray(product.description) && <PortableText value={product.description} />}
            </div> */}
          </div>
          <div className="mt-6">
            <Suspense fallback={null}>
              <AddToBasketButton product={product} disabled={isOutOfStock} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
