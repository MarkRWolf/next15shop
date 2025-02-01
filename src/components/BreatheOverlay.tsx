"use client";
import useNaviStore from "@/store/naviStore";
import { AnimatePresence, motion } from "framer-motion";

const BreatheOverlay = () => {
  const isNavigating = useNaviStore((state) => state.isNavigating);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className=""
      ></motion.div>
    </AnimatePresence>
  );
};

export default BreatheOverlay;
/* <div
      className={`fixed w-full h-screen z-50 inset-0 transition-opacity duration-300 bg-slate-100 ${isNavigating ? "opacity-60" : "opacity-0"} pointer-events-none`}
    /> */
