"use client";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const paths = pathname.split("/").filter((path) => path.length > 0);

  return (
    <div className="my-4 flex gap-1 mx-auto w-full max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-7xl ">
      <NextLink href={"/"}>Home</NextLink>
      {paths.length > 0 && <p>&gt;</p>}
      {paths.map((p, index) => (
        <span key={index} className="flex gap-1">
          <NextLink
            href={`/${paths.slice(0, index + 1).join("/")}`}
            className={`${index === paths.length - 1 && "font-semibold"}`}
          >
            {p}
          </NextLink>
          {index < paths.length - 1 && <p>&gt;</p>}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
