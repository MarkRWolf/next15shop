"use client";
import { ViewTransitions } from "next-view-transitions";

const PageTranstion = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ViewTransitions>{children}</ViewTransitions>
    </>
  );
};

export default PageTranstion;
