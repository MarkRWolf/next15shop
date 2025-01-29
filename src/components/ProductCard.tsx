"use client";
import { Product } from "../../sanity.types";
import NextLink from "next/link";
import NextImage from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import AddToBasketButton from "./AddToBasketButton";
import useLangStore from "@/store/langStore";
import { CleanedProduct } from "@/utils/cleanProducts";
import { useState } from "react";

interface ProductCardProps {
  product: CleanedProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { lang } = useLangStore();
  const isOutOfStock = product.stock != null && product.stock < 1;
  const name = product.name;
  const description = product.description;
  const [imgHovered, setImgHovered] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState("50% 50%"); // Default center

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!imgHovered) return;
    const img = e.currentTarget.querySelector("img");
    if (!img) return;
    const rect = img.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setTransformOrigin(`${x}% ${y}%`);
  };

  return (
    <NextLink
      href={`/products/${product.category?.toLowerCase()}/${product.slug.current}`}
      className="w-[350px] max-w-[370px] relative group z-[3] bg-white"
    >
      {/* Card */}
      <div
        className={`relative h-full z-[2] bg-transparent flex flex-col border-b border-r ${
          product?.stock > 0 ? "border-emerald-400/40" : "border-red-400/40"
        } items-center justify-between shadow shadow-gray-400/40 rounded-md`}
      >
        {product?.images && (
          <div
            className="w-full h-full relative overflow-hidden"
            onMouseEnter={() => setImgHovered(true)}
            onMouseLeave={() => setImgHovered(false)}
            onMouseMove={handleMouseMove}
          >
            <NextImage
              className={`w-full overflow-hidden transition-transform duration-500 ${
                imgHovered ? "scale-150" : "scale-100"
              }`}
              style={{
                transformOrigin: transformOrigin,
              }}
              src={imageUrl(product.images[0]).url()}
              alt={name ?? "Product Image"}
              width={400}
              height={400}
            />
          </div>
        )}
        <div className="w-full font-mono self-start  px-2 py-4">
          <h2 className="text-2xl capitalize">{name}</h2>
          <p className="my-4">
            {description?.map((block, index) =>
              block._type === "block"
                ? block.children?.map((child) => child.text).join("")
                : `No description${index}`
            )}
          </p>
          <div className="relative z-[3] w-full flex items-center justify-between">
            <p className="text-xl relative z-50">{product.price?.toFixed(2)},-</p>
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <AddToBasketButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </NextLink>
  );
};

export default ProductCard;
