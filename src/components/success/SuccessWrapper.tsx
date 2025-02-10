"use client";
import dynamic from "next/dynamic";
import { notFound, useSearchParams } from "next/navigation";
import { Language } from "../../../sanity.types";
const Success = dynamic(() => import("./Success"), { ssr: false });

const SuccessWrapper = ({ texts }: { texts: Language[] }) => {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  if (!orderNumber) return notFound();

  return <Success orderNumber={orderNumber} texts={texts} />;
};

export default SuccessWrapper;
