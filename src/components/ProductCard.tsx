"use client";
import { useState } from "react";
import NextImage from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import BetterLink from "./BetterLink";
import dynamic from "next/dynamic";
const AddToBasket = dynamic(() => import("./AddToBasket"), { ssr: false });
import { Product } from "../../sanity.types";
import useLangStore from "@/store/langStore";
import { DEFAULT_LANGUAGE } from "@/types/languages";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { lang } = useLangStore();
  const [imgHovered, setImgHovered] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState("50% 50%");
  const description = product[`description_${lang}`] || product[`description_${DEFAULT_LANGUAGE}`];
  const name = product[`name_${lang}`] || product[`name_${DEFAULT_LANGUAGE}`];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!imgHovered) return;
    const img = e.currentTarget.querySelector("img");
    if (!img) return;
    const rect = img.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setTransformOrigin(`${x}% ${y}%`);
  };

  const productUrl = `/products/${product.category?.toLowerCase()}/${product.slug.current}`;

  return (
    <div className="relative h-full group z-[3] bg-white font-main">
      {/* Card */}
      <div
        className={`relative h-full  z-[2] bg-[#f9f9f9] flex flex-col border-b border-r justify-between shadow shadow-gray-400/40 rounded-md`}
      >
        {product?.images && (
          <div
            className="w-full py-4 relative overflow-hidden select-none"
            onMouseEnter={() => setImgHovered(true)}
            onMouseLeave={() => setImgHovered(false)}
            onMouseMove={handleMouseMove}
          >
            <BetterLink href={productUrl}>
              <NextImage
                className={`h-60 object-contain overflow-hidden transition-transform duration-500 ${
                  imgHovered ? "scale-150" : "scale-100"
                }`}
                style={{
                  transformOrigin: transformOrigin,
                }}
                src={imageUrl(product.images[0]).url()}
                alt={name ?? "Product Image"}
                width={400}
                height={400}
                quality={65}
              />
            </BetterLink>
          </div>
        )}
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          className="w-full grow px-2 pb-4 self-end cursor-default"
        >
          <div className="flex flex-col justify-between h-full">
            <h2 className="lg:text-2xl text-xl capitalize">{name}</h2>
            <p className="my-4 grow">
              {description?.map((block, index) => {
                if (block._type === "block") {
                  const text = block.children?.map((child) => child.text).join("") || "";
                  const words = text.split(" ");
                  return words.length > 9 ? words.slice(0, 9).join(" ") + "..." : text;
                }
                return `No description${index}`;
              })}
            </p>
            <p className="md:text-xl sm:text-xl relative z-50">{product.price?.toFixed(2)},-</p>
          </div>
        </div>
        <AddToBasket product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
