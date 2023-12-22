import React from "react";
import { AnimatePresence, motion } from "framer-motion";

type AnimationWrapperProp = {
  children: React.ReactNode;
  initial?: { opacity: number };
  animate?: { opacity: number };
  transition?: { duration: number; delay?: number };
  keyValue?: string;
  className?: string;
};

const AnimationWrapper: React.FC<AnimationWrapperProp> = ({
  children,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 1 },
  keyValue,
  className,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
        key={keyValue}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimationWrapper;
