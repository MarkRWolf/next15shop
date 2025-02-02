"use client";
import BetterLink from "./BetterLink";
import { usePathname } from "next/navigation";
import { Link, useTransitionRouter } from "next-view-transitions";

const Breadcrumb = () => {
  const router = useTransitionRouter();
  const pathname = usePathname();
  if (pathname === "/") return null;

  const paths = pathname.split("/").filter((path) => path.length > 0);

  return (
    <div className="container-main w-full my-4 flex gap-1 px-2 sm:px-0">
      <a onMouseOver={() => router.prefetch("/")} onClick={() => router.push("/")} href={"/"}>
        Home
      </a>
      {paths.length > 0 && <p>&gt;</p>}
      {paths.map((p, index) => (
        <span key={index} className="flex gap-1">
          <button
            onMouseOver={() => router.prefetch(`/${paths.slice(0, index + 1).join("/")}`)}
            onClick={() => router.push(`/${paths.slice(0, index + 1).join("/")}`)}
            className={`${index === paths.length - 1 && "font-main"}`}
          >
            {p}
          </button>
          {index < paths.length - 1 && <p>&gt;</p>}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
