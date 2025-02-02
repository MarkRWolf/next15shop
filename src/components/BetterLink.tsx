"use client";
import { Link, useTransitionRouter } from "next-view-transitions";
import { useRouter } from "next/navigation";

interface BetterLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

const BetterLink: React.FC<BetterLinkProps> = ({ children, className, href }) => {
  const router = useTransitionRouter();

  const handleNavigation = () => {
    router.push(href);
  };

  return (
    <a
      href={href} 
      className={className}
      onMouseOver={() => router.prefetch(href)}
      onClick={handleNavigation}
    >
      {children}
    </a>
  );
};

export default BetterLink;
