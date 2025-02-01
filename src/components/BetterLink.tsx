"use client";
import { Link, useTransitionRouter } from "next-view-transitions";
import { useRouter } from "next/navigation";

interface BetterLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

const BetterLink: React.FC<BetterLinkProps> = ({ children, className, href }) => {
  const router = useRouter();

  const handleNavigation = () => {
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
