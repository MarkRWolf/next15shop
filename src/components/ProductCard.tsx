"use client";
import { useState } from "react";
import NextImage from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import { CleanedProduct } from "@/utils/cleanProducts";
import useLangStore from "@/store/langStore";
import useNaviStore from "@/store/naviStore";
import AddToBasketButton from "./AddToBasketButton";
import BetterLink from "./BetterLink";
import { useTransitionRouter } from "next-view-transitions";
import NextLink from "next/link";

interface ProductCardProps {
  product: CleanedProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { lang } = useLangStore();
  const startNavi = useNaviStore((state) => state.startNavi);
  const [imgHovered, setImgHovered] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState("50% 50%");

  const isOutOfStock = product.stock != null && product.stock < 1;
  const description = product.description;
  const name = product.name;

  const router = useTransitionRouter();

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
    <BetterLink href={productUrl} className="relative group z-[3] bg-white font-main">
      {/* Card */}
      <div
        className={`relative h-full z-[2] bg-[#f9f9f9] flex flex-col border-b border-r ${
          product?.stock > 0 ? "border-emerald-400/40" : "border-red-400/40"
        } justify-stretch shadow shadow-gray-400/40 rounded-md`}
      >
        {product?.images && (
          <div
            className="w-full max-h-[340px] lg:max-h-[380px] relative overflow-hidden"
            onMouseEnter={() => setImgHovered(true)}
            onMouseLeave={() => setImgHovered(false)}
            onMouseMove={handleMouseMove}
          >
            <NextImage
              className={`w-full h-full object-contain overflow-hidden transition-transform duration-500 ${
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
          </div>
        )}
        <div className="w-full flex-grow self-start px-2 pb-4 flex flex-col justify-between">
          <h2 className="lg:text-2xl text-xl capitalize">{name}</h2>
          <p className="my-4 h-full">
            {description?.map((block, index) => {
              if (block._type === "block") {
                const text = block.children?.map((child) => child.text).join("") || "";
                const words = text.split(" ");
                return words.length > 9 ? words.slice(0, 9).join(" ") + "..." : text;
              }
              return `No description${index}`;
            })}
          </p>
          <div className="relative z-[3] w-full flex items-center justify-between">
            <p className="md:text-xl sm:text-xl relative z-50">{product.price?.toFixed(2)},-</p>
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
    </BetterLink>
  );
};

export default ProductCard;
