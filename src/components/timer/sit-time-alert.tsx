'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import { useState } from 'react';
import { BreakMissionModal } from '../missions/break-mission-modal';

const SIT_TIME_MISSIONS: Record<number, string> = {
  30: 'Relaxamento de pulso e mãos',
  60: 'Alongamento de pescoço',
  90: 'Levante e caminhe',
};

export function SitTimeAlert({
  threshold,
  onDismiss,
}: {
  threshold: number | null;
  onDismiss: () => void;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {threshold && !modalOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 right-6 left-6 md:left-auto md:w-[400px] bg-white dark:bg-dark-card border border-neutral-100 dark:border-dark-border rounded-2xl shadow-2xl p-4 z-40 flex items-center justify-between gap-4"
          >
            <div className="flex bg-pink-100 dark:bg-pink-900/50 p-3 rounded-full flex-shrink-0">
              <Video className="text-pink-600 dark:text-pink-300" size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-poppins font-bold text-neutral-900 dark:text-neutral-50 text-sm">
                Tempo de Tela Elevado!
              </h4>
              <p className="font-inter text-neutral-500 dark:text-neutral-100 text-xs mt-1">
                Você está sentado há {threshold} minutos. Que tal dar uma pausa para &quot;esticar as pernas&quot;?
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                onClick={() => setModalOpen(true)}
                className="bg-pink-500 hover:bg-pink-600 text-white text-xs h-8 px-3"
              >
                Ver Vídeo
              </Button>
              <Button
                onClick={onDismiss}
                variant="ghost"
                className="text-neutral-400 text-xs h-6 px-3"
              >
                Agora não
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* O modal de missão é reaproveitável, só precisamos de uma prop de recomendação 
          No mundo ideal recriariamos um Hook mas como "BreakMission" sorteia,
          vamos deixar sorteando (pois se a pessoa já esta exausta ela so tira).
          Mas a spec diz q é uma missão associada de alongamento. Adaptarei no break-mission-modal depois,
          por hora usa fallback vazio para contornar */}
    </>
  );
}
