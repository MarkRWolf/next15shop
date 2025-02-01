"use client";
import NextNProgress from "nextjs-progressbar";

const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NextNProgress />
      {children}
    </>
  );
};

export default ProgressProvider;
