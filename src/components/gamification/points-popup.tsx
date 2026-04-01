'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export function PointsPopup({
  points,
  isVisible,
  onComplete,
}: {
  points: number;
  isVisible: boolean;
  onComplete: () => void;
}) {
  useEffect(() => {
    if (isVisible) {
      const t = setTimeout(onComplete, 1200);
      return () => clearTimeout(t);
    }
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -20, opacity: 1, scale: 0.5 }}
          animate={{ y: -80, opacity: 0, scale: 1.2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute z-50 text-pink-500 font-poppins font-bold text-3xl drop-shadow-md cursor-default pointer-events-none"
        >
          +{points} pts
        </motion.div>
      )}
    </AnimatePresence>
  );
}
