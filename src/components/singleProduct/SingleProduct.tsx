"use client";
import NextImage from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import { PortableText } from "next-sanity";
import { Language, Product } from "../../../sanity.types";
import useLangStore from "@/store/langStore";
import { useEffect, useState } from "react";
import useText from "@/hooks/useText";
import useBasketStore from "@/store/basketStore";
import { DEFAULT_LANGUAGE } from "@/types/languages";

import dynamic from "next/dynamic";
const AddToBasket = dynamic(() => import("../AddToBasket"), { ssr: false });

interface SingleProductProps {
  product: Product;
  products: Product[];
  globals: Language[];
}

const SingleProduct = ({ product, products, globals }: SingleProductProps) => {
  const { lang } = useLangStore();
  const [selectedImg, setSelectedImg] = useState(0);
  const [hoveredImg, setHoveredImg] = useState(-1);
  const description = product[`description_${lang}`] || product[`description_${DEFAULT_LANGUAGE}`];
  const name = product[`name_${lang}`] || product[`name_${DEFAULT_LANGUAGE}`];
  const onStockMsg = useText(globals, "onStock", "single");

  useEffect(() => {
    useBasketStore.getState().validateBasket(products);
  }, [products, lang]);

  return (
    <div className="px-4 py-8">
      <div className="container-main flex flex-wrap justify-between gap-8 lg:gap-16">
        {/* Left / Above */}
        <div
          className={`relative lg:w-[450px] w-full flex flex-wrap justify-between gap-6 rounded-lg`}
        >
          <div className="lg:w-full w-[75%] flex-grow h-[500px] relative border-gray-300 border">
            {product.images?.length && (
              <NextImage
                src={imageUrl(product.images[hoveredImg < 0 ? selectedImg : hoveredImg]).url()}
                alt={name ?? "Product Image"}
                fill
                quality={65}
                className={`object-contain transition-transform duration-300 hover:scale-105`}
              />
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="w-[100px] grow max-w-full lg:h-[100px] md:h-[500px] gap-6 flex lg:flex-nowrap sm:flex-wrap flex-nowrap justify-between">
              {product.images.map(
                (img, i) =>
                  i < 4 && (
                    <NextImage
                      className={`border h-[100px] w-[100px] object-contain ${i === selectedImg ? "border-black scale-110" : i === hoveredImg && "border-gray-500 scale-105"}`}
                      onMouseEnter={() => setHoveredImg(i)}
                      onMouseLeave={() => setHoveredImg(-1)}
                      onClick={() => setSelectedImg(i)}
                      key={i}
                      src={imageUrl(img).url()}
                      alt={name ?? "Product Image"}
                      width={200}
                      height={200}
                    />
                  )
              )}
            </div>
          )}
        </div>
        {/* Right / Below */}
        <div className="lg:w-2/5 lg:max-w-[50%] flex flex-grow flex-col justify-between self-center">
          <div>
            <h1 className="text-3xl font-main font-bold mb-4">{name}</h1>
            <div className="text-xl w-full font-main font-semibold mb-4">
              {product.price?.toFixed(2)},-
            </div>
            <AddToBasket product={product} />
            <div className="prose max-w-[80%] my-6">
              {Array.isArray(description) && <PortableText value={description} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
