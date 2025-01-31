"use client";
import useNaviStore from "@/store/naviStore";

const BreatheOverlay = () => {
  const isNavigating = useNaviStore((state) => state.isNavigating);
  return (
    <div
      className={`fixed w-full h-screen z-50 inset-0 transition-opacity duration-300 bg-slate-100 ${isNavigating ? "opacity-60" : "opacity-0"} pointer-events-none`}
    />
  );
};

export default BreatheOverlay;
