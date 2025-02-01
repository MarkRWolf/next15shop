// components/NavigationTransition.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import useNaviStore from "@/store/naviStore";
import { useEffect, useState } from "react";

const NavigationTransition = () => {
  const { status, progress, resetNaviState } = useNaviStore();
  const [showBreathe, setShowBreathe] = useState(false);

  useEffect(() => {
    if (status === "complete") {
      const timer = setTimeout(() => {
        setShowBreathe(true);
      }, 0);
      return () => clearTimeout(timer);
    } else {
      setShowBreathe(false);
    }
  }, [status]);

  const loadingBarVariants = {
    initial: { width: "0%" },
    animate: { width: `${progress}%` },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const breatheVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 0.6 },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence
      onExitComplete={() => {
        if (status === "complete") {
          resetNaviState();
        }
      }}
    >
      {status === "loading" && (
        <motion.div
          key="loadingBar"
          variants={loadingBarVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            height: 4,
            backgroundColor: "#3b82f6",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1000,
          }}
        />
      )}
      {showBreathe && (
        <motion.div
          key="breatheOverlay"
          variants={breatheVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "#f1f5f9",
            zIndex: 50,
            pointerEvents: "none",
          }}
        />
      )}
    </AnimatePresence>
  );
};

export default NavigationTransition;
