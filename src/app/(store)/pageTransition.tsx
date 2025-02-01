"use client";
import { ViewTransitions } from "next-view-transitions";
import { usePathname } from "next/navigation";

const PageTranstion = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();

  return (
    <>
      <ViewTransitions>{children}</ViewTransitions>
    </>
  );
};

export default PageTranstion;
