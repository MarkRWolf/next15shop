"use client";
import styles from "./singleProduct.module.css";
import NextImage from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import AddToBasketButton from "@/components/AddToBasketButton";
import { PortableText } from "next-sanity";
import { Product } from "../../../sanity.types";
import useLangStore from "@/store/langStore";
import { useState } from "react";
import { cleanProduct } from "@/utils/cleanProduct";

const SingleProduct = ({ product }: { product: Product }) => {
  const { lang } = useLangStore();
  const [selectedImg, setSelectedImg] = useState(0);
  const [hoveredImg, setHoveredImg] = useState(-1);
  const isOutOfStock = !product.stock || product.stock <= 0;
  const cleanedProduct = cleanProduct(product, lang);
  const { name, description } = cleanedProduct;
  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-7xl flex gap-8 lg:gap-16">
        <div
          className={`relative w-2/5 h-100 flex flex-wrap rounded-lg  ${isOutOfStock && "opacity-50"}`}
        >
          <div className="w-full h-96 relative border">
            {product.images?.length && (
              <NextImage
                src={imageUrl(product.images[hoveredImg < 0 ? selectedImg : hoveredImg]).url()}
                alt={name ?? "Product Image"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width:1200px) 50vw, 33vw"
                quality={65}
                className="object-contain transition-transform duration-300 hover:scale-105"
              />
            )}
            {isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                <span className="text-white font-bold text-lg">Out of Stock</span>
              </div>
            )}
          </div>

          {product.images && product.images.length > 1 && (
            <div className="w-full flex flex-wrap justify-start gap-8 my-4">
              {product.images.map((img, i) => (
                <NextImage
                  className={`max-w-[100px] border p-2 aspect-square object-contain ${i === selectedImg && "border-black scale-110"} ${i === hoveredImg && i !== selectedImg && "border-gray-500 scale-105"}`}
                  onMouseEnter={() => setHoveredImg(i)}
                  onMouseLeave={() => setHoveredImg(-1)}
                  onClick={() => setSelectedImg(i)}
                  key={i}
                  src={imageUrl(img).url()}
                  alt={name ?? "Product Image"}
                  width={200}
                  height={200}
                />
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-grow flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{name}</h1>
            <div className="text-xl font-semibold mb-4">{product.price?.toFixed(2)},-</div>
            <div className="prose max-w-none mb-6">
              {Array.isArray(description) && <PortableText value={description} />}
            </div>
          </div>
          <div className="mt-6 mb-20">
            <p className="text-center">{product.stock} stk på lager</p>
            <AddToBasketButton product={cleanedProduct} disabled={isOutOfStock} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
