'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export function BadgeUnlockToast() {
  const [unlockedBadges, setUnlockedBadges] = useState<any[]>([]);

  useEffect(() => {
    // Nós emularemos o polling ou recebimento de badge
    // No fluxo ideal, a API retornaria a lista e esse Toast seria invocado por ela
    // ou por um provedor contextual. Para demonstrar modularmente:
    const handleNewBadge = (event: CustomEvent) => {
      if (event.detail && event.detail.badge) {
        setUnlockedBadges((prev) => [...prev, event.detail.badge]);
      }
    };
    
    window.addEventListener('badge-unlocked' as any, handleNewBadge);
    return () => window.removeEventListener('badge-unlocked' as any, handleNewBadge);
  }, []);

  useEffect(() => {
    if (unlockedBadges.length > 0) {
      const timer = setTimeout(() => {
        setUnlockedBadges((prev) => prev.slice(1));
      }, 5000);
      
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#A090FF', '#FF66A3', '#ACE2FF']
      });

      return () => clearTimeout(timer);
    }
  }, [unlockedBadges]);

  const currentBadge = unlockedBadges[0];

  return (
    <AnimatePresence>
      {currentBadge && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 pointer-events-none">
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white/90 dark:bg-dark-card/90 backdrop-blur-md px-8 py-10 rounded-[32px] shadow-2xl flex flex-col items-center text-center border-2 border-lilac-300 dark:border-lilac-800"
          >
            <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-tr from-lilac-400 to-pink-400 flex items-center justify-center text-5xl shadow-lg ring-4 ring-white dark:ring-dark-bg">
              {currentBadge.icon || '🏅'}
            </div>
            
            <span className="text-pink-500 font-inter font-bold uppercase tracking-widest text-xs mb-2">
              Nova Conquista!
            </span>
            
            <h2 className="font-poppins font-black text-3xl text-neutral-900 dark:text-neutral-50 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-lilac-600 to-pink-500">
              {currentBadge.name}
            </h2>
            
            <p className="font-inter text-neutral-500 dark:text-neutral-200 max-w-[250px]">
              {currentBadge.description}
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
