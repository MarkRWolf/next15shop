// File: app/products/[slug]/ClientPage.tsx

"use client";

import { useEffect, useState } from "react";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import AddToBasketButton from "@/components/AddToBasketButton";
import { Product } from "../../../../../sanity.types";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";

interface ClientPageProps {
  initialProduct: Product;
}

const ClientPage = ({ initialProduct }: ClientPageProps) => {
  const [product, setProduct] = useState<Product>(initialProduct);

  useEffect(() => {
    // Fetch live product data after the component has mounted
    const fetchProduct = async () => {
      const liveProduct = await getProductBySlug(initialProduct.slug.current);
      setProduct((prev) => liveProduct ?? prev);
    };

    fetchProduct();
  }, [initialProduct.slug.current]);

  const isOutOfStock = !product.stock || product.stock <= 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${
            isOutOfStock && "opacity-50"
          }`}
        >
          {product.image && (
            <Image
              loading="eager"
              decoding="sync"
              src={imageUrl(product.image).url()}
              alt={product.name ?? "Product Image"}
              fill
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

export default ClientPage;
