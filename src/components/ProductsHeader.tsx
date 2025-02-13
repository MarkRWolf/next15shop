"use client";
import useText from "@/hooks/useText";
import { Category, Language } from "../../sanity.types";
import { usePathname } from "next/navigation";
import NextImage from "next/image";
interface ProductsHeaderProps {
  productsText: Language[];
  category?: string;
}

const ProductsHeader = ({ productsText, category }: ProductsHeaderProps) => {
  const path = usePathname();

  const homeTitle = useText(productsText, "homeTitle", "single");
  const seoHomeText = useText(productsText, "seoHomeText", "single");

  const productsTitle = useText(productsText, "productsTitle", "single");
  const seoProductsText = useText(productsText, "seoProductsText", "single");

  const seoCategoriesText = useText(productsText, "seoCategoriesText", "single");

  const title = path === "/" ? homeTitle : path === "/products" ? productsTitle : category;
  const seoText =
    path === "/" ? seoHomeText : path === "/products" ? seoProductsText : seoCategoriesText;

  return (
    <div className={`w-full relative`}>
      <NextImage src="/texture.jpg" alt="bg-texture" fill={true} className="cover" />
      <span className="relative z-1 py-16 flex flex-col gap-4 bg-stone-200/85">
        <h1 className="font-main text-3xl md:text-4xl text-center">{title}</h1>
        <p className={`font-main text-center lg:w-[60%] w-[85%] sm:text-base text-sm mx-auto`}>
          {seoText}
        </p>
      </span>
    </div>
  );
};

export default ProductsHeader;
