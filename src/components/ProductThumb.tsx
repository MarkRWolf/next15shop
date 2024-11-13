// File: components/ProductThumb.tsx

import { Product } from "../../sanity.types";
import NextLink from "next/link";
import NextImage from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import AddToBasketButton from "./AddToBasketButton";

interface ProductThumbProps {
  product: Product;
}

const ProductThumb = ({ product }: ProductThumbProps) => {
  const isOutOfStock = product.stock != null && product.stock < 1;

  return (
    <NextLink prefetch={false} href={`/products/${product.slug?.current}`}>
      <span
        className={`group flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${
          isOutOfStock && "opacity-50"
        }`}
      >
        <div className="relative aspect-square w-full h-full overflow-hidden">
          {product.image && (
            <NextImage
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              src={imageUrl(product.image).url()}
              alt={product.name || "Product Image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width:1200px) 50vw, 33vw"
              quality={65}
            />
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h2>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {product.description
              ?.map((block) =>
                block._type === "block" ? block.children?.map((child) => child.text).join("") : ""
              )
              .join(" ") || "No description"}
          </p>
          <p className="mt-2 text-lg font-bold text-gray-900">
            {product.price?.toFixed(2) || "0.00,-"},-
          </p>
        </div>
        <span onClick={(e) => e.preventDefault()}>
          <AddToBasketButton product={product} disabled={isOutOfStock} />
        </span>
      </span>
    </NextLink>
  );
};

export default ProductThumb;
