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
    <NextLink
      prefetch={false}
      href={`/products/${product.slug?.current}`}
      className="flex flex-col items-center shadow shadow-gray-400/40 rounded-md p-4"
    >
      {product.image ? (
        <NextImage
          className="w-full aspect-square object-contain"
          src={imageUrl(product.image).url()}
          alt={product.name || "Product Image"}
          width={400}
          height={400}
        />
      ) : (
        <span className="w-full aspect-square object-cover bg-gray-200 rounded-lg"></span>
      )}
      <div className="w-full font-mono self-start tracking-wider px-2 py-4">
        <h2 className="text-2xl">{product.name}</h2>
        <p className="my-4">
          {product.description?.map((block) =>
            block._type === "block"
              ? block.children?.map((child) => child.text).join("")
              : "No description"
          )}
        </p>
        <div onClick={(e) => e.preventDefault()} className="w-full flex gap-10 justify-between">
          <p className="text-xl">{product.price?.toFixed(2) || "??"},-</p>
          <AddToBasketButton product={product} disabled={isOutOfStock} />
        </div>
      </div>
    </NextLink>
  );
};

export default ProductThumb;
