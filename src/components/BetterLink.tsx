"use client";
import useNaviStore from "@/store/naviStore";
import { Link, useTransitionRouter } from "next-view-transitions";

interface BetterLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

const BetterLink: React.FC<BetterLinkProps> = ({ children, className, href }) => {
  const startNavi = useNaviStore((state) => state.startNavi);
  const router = useTransitionRouter();

  const handleNavigation = () => {
    startNavi();
    router.push(href);
  };

  return (
    <Link
      href={href}
      className={className}
      onMouseOver={() => router.prefetch(href)}
      onClick={handleNavigation}
    >
      {children}
    </Link>
  );
};

export default BetterLink;
