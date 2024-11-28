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

  const category = product.category;

  if (!category) return null;

  return (
    <NextLink
      href={`/products/${category.toLowerCase()}/${product.slug?.current}`}
      className="w-[350px] flex-grow relative group z-[3] bg-white"
    >
      {/* BORDER ANIMATE SIDES */}
      {/*   <div
        className={` absolute z-[1] rounded-md top-0 left-0 w-0 h-0 bg-transparent border-t-[3px] border-l-[3px]  border-transparent group-hover:w-full group-hover:h-full ${isOutOfStock ? "group-hover:border-red-800" : "group-hover:border-emerald-600"} transition-[width,height,border-color] duration-700 ease-in-out`}
      ></div>
      <div
        className={`absolute z-[1] rounded-md bottom-0 right-0 w-0 h-0 bg-transparent border-b-[3px] border-r-[3px] border-transparent group-hover:w-full group-hover:h-full ${isOutOfStock ? "group-hover:border-red-800" : "group-hover:border-emerald-600"} transition-[width,height,border-color] duration-700 ease-in-out`}
      ></div> */}
      {/* BORDER BLUR */}
      <div
        className={` absolute z-[0] blur-0  group-hover:blur-[5px] opacity-20 transition-all duration-500 rounded-md top-0 border-transparent border-t-8 border-l-8   w-[calc(100%+8px)] -translate-x-1.5 h-[calc(100%+8px)] -translate-y-1.5 ${isOutOfStock ? "group-hover:border-red-700" : "group-hover:border-emerald-700"}`}
      ></div>
      <div
        className={`absolute z-[0] blur-0  group-hover:blur-[5px] opacity-20 transition-all  duration-500 rounded-md bottom-0 border-transparent border-b-8 border-r-8 w-[calc(100%+8px)]  h-[calc(100%+8px)] translate-y-1.5 ${isOutOfStock ? "group-hover:border-red-700" : "group-hover:border-emerald-700"} `}
      ></div>
      <div className="relative z-[2] bg-transparent flex flex-col items-center shadow shadow-gray-400/40 rounded-md p-4 border-transparent">
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

export default ProductThumb;
