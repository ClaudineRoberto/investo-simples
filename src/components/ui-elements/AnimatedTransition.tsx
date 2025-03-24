
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type AnimationVariant = 'fade' | 'slide' | 'scale' | 'none';

interface AnimatedTransitionProps {
  children: React.ReactNode;
  isVisible?: boolean;
  variant?: AnimationVariant;
  duration?: number;
  delay?: number;
  className?: string;
}

const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  none: {
    initial: {},
    animate: {},
    exit: {},
  },
};

export const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({
  children,
  isVisible = true,
  variant = 'fade',
  duration = 0.3,
  delay = 0,
  className,
}) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className={cn(className)}
          initial={variants[variant].initial}
          animate={variants[variant].animate}
          exit={variants[variant].exit}
          transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedTransition;
