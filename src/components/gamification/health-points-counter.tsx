'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

export function HealthPointsCounter({ initialPoints = 0 }: { initialPoints?: number }) {
  const [points, setPoints] = useState(initialPoints);
  const controls = useAnimation();
  const prevPointsRef = useRef(initialPoints);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const res = await fetch('/api/users/points');
        const data = await res.json();
        if (data.points !== undefined && data.points !== prevPointsRef.current) {
          setPoints(data.points);
          prevPointsRef.current = data.points;
          controls.start({ scale: [1, 1.25, 0.95, 1], transition: { duration: 0.5, ease: 'easeOut' } });
        }
      } catch (e) {}
    };

    // Inicia points pelo fetch se não bate com o inicial
    fetchPoints();

    const interval = setInterval(fetchPoints, 8000); 
    return () => clearInterval(interval);
  }, [controls]);

  return (
    <motion.div 
      animate={controls} 
      className="flex items-center gap-2 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-4 py-1.5 rounded-full font-poppins font-bold text-sm shadow-sm border border-pink-200 dark:border-pink-800/50 cursor-default"
      title="Seus Pontos de Saúde"
    >
      <motion.span 
        animate={{ y: [0, -3, 0] }} 
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="text-base leading-none drop-shadow-sm"
      >
        ❤️
      </motion.span>
      <span>{points}</span>
      <span className="text-xs uppercase tracking-wider opacity-80 font-inter">pts</span>
    </motion.div>
  );
}
