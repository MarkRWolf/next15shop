import { useState, useRef, useEffect } from "react";
import BetterLink from "@/components/BetterLink";
import NavLink from "../NavLink";
import { Language } from "../../../../sanity.types";
import NextImage from "next/image";
import { usePathname } from "next/navigation";

const HeaderDesktopNav = ({ navTexts }: { navTexts: Language[] }) => {
  const pathname = usePathname();
  const navRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const [underline, setUnderline] = useState<{ left?: number; width?: number }>({});
  const underlineWidth = 0.9;
  const activePath = pathname.split("/")[1] || "home";

  const updateUnderline = (key: string) => {
    const el = navRefs.current[key];
    if (el) {
      const newWidth = el.offsetWidth * underlineWidth;
      const newLeft = el.offsetLeft + (el.offsetWidth - newWidth) / 2;
      setUnderline({ left: newLeft, width: newWidth });
    }
  };

  useEffect(() => {
    updateUnderline(activePath);
  }, [activePath, pathname]);

  return (
    <div className="nav h-full relative flex items-center truncate">
      {pathname && (
        <div
          className="absolute bottom-0 h-2 translate-y-1/2 bg-black transition-all duration-500 rounded"
          style={{ left: underline.left, width: underline.width }}
        />
      )}
      <span
        onMouseEnter={() => updateUnderline("home")}
        onMouseLeave={() => updateUnderline(activePath)}
        className="cursor-pointer pr-3"
      >
        <span
          ref={(el) => {
            navRefs.current["home"] = el;
          }}
        >
          <BetterLink
            href={"/"}
            className="flex items-center gap-1 text-sm font-main font-bold hover:opacity-80 sm:mx-0"
          >
            <NextImage
              src={"/logo.png"}
              className="h-10 w-10 object-cover"
              alt="logo"
              width={256}
              height={256}
            />
            DemoShop
          </BetterLink>
        </span>
      </span>
      <div className="flex items-center">
        {navTexts?.[0]?.content?.map((item, index) => (
          <span
            key={item.key}
            onMouseEnter={() => updateUnderline(item.key)}
            onMouseLeave={() => updateUnderline(activePath)}
            className={`cursor-pointer ${index === 0 ? "pl-3" : "pl-2"}`}
          >
            <span
              ref={(el) => {
                navRefs.current[item.key] = el;
              }}
            >
              <NavLink navTexts={navTexts} item={item} activePath={activePath} />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default HeaderDesktopNav;
