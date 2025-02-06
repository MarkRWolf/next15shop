"use client";
import NextImage from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import dynamic from "next/dynamic";
const AddToBasketButton = dynamic(() => import("@/components/AddToBasketButton"));
import { PortableText } from "next-sanity";
import { Language, Product } from "../../../sanity.types";
import useLangStore from "@/store/langStore";
import { useEffect, useState } from "react";
import { cleanProduct } from "@/utils/cleanProduct";
import useText from "@/hooks/useText";
import { cleanProducts } from "@/utils/cleanProducts";
import useBasketStore from "@/store/basketStore";

interface SingleProductProps {
  product: Product;
  products: Product[];
  globals: Language[];
}

const SingleProduct = ({ product, products, globals }: SingleProductProps) => {
  const { lang } = useLangStore();
  const [selectedImg, setSelectedImg] = useState(0);
  const [hoveredImg, setHoveredImg] = useState(-1);
  const isOutOfStock = !product.stock || product.stock <= 0;
  const cleanedProduct = cleanProduct(product, lang);
  const { name, description } = cleanedProduct;
  const onStock = useText(globals, "onStock", "single");

  useEffect(() => {
    useBasketStore.getState().validateBasket(cleanProducts(products, lang));
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
                className={`object-contain transition-transform duration-300 hover:scale-105 ${isOutOfStock && "opacity-50"}`}
              />
            )}
            {isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                <span className="text-white font-main font-bold text-lg">Out of Stock</span>
              </div>
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className=" lg:w-full w-[100px] lg:h-[100px] h-[500px] gap-6 flex lg:flex-nowrap flex-wrap lg:justify-between">
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
        <div className="w-2/5 max-w-[50%] flex flex-grow flex-col justify-between self-end">
          <div>
            <h1 className="text-3xl font-main font-bold mb-4">{name}</h1>
            <div className="text-xl font-main font-semibold mb-4">
              {product.price?.toFixed(2)},-
            </div>
            <div className="prose max-w-none mb-6">
              {Array.isArray(description) && <PortableText value={description} />}
            </div>
          </div>
          <div className="w-max mt-6 mb-20 flex flex-col gap-2">
            <p className="text-center">
              {onStock}
              {product.stock}
            </p>
            <AddToBasketButton product={cleanedProduct} disabled={isOutOfStock} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
