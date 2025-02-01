"use client";
import useNaviStore from "@/store/naviStore";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

interface BetterLinkProps {
  children: React.ReactNode;
  href: string;
  as?: string;
  className?: string;
}

const BetterLink: React.FC<BetterLinkProps> = ({ children, className, href, as }) => {
  const startNavi = useNaviStore((state) => state.startNavi);
  const router = useRouter();

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    startNavi();
    setTimeout(() => {
      router.push(href);
    }, 100);
  };

  return (
    <NextLink
      href={href}
      as={as}
      className={className}
      onMouseOver={() => router.prefetch(href)}
      onClick={handleNavigate}
    >
      {children}
    </NextLink>
  );
};

export default BetterLink;
