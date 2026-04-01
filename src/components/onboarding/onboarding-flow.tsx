'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Target, Bell, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function OnboardingFlow({ hasCompleted }: { hasCompleted: boolean }) {
  const [isOpen, setIsOpen] = useState(!hasCompleted);
  const [step, setStep] = useState(1);
  const router = useRouter();

  if (!isOpen) return null;

  const handleNext = async () => {
    if (step === 2) {
      if ('Notification' in window && Notification.permission === 'default') {
        await Notification.requestPermission();
      }
    }

    if (step === 3) {
      try {
        await fetch('/api/users/onboarding', { method: 'PATCH' });
      } catch (e) {}
      setIsOpen(false);
      router.refresh();
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-neutral-900/80 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        <motion.div
           key={step}
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           className="bg-white dark:bg-dark-card w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl p-8 flex flex-col items-center text-center relative"
        >
          {step === 1 && (
            <>
              <div className="w-20 h-20 bg-pink-100 dark:bg-pink-900/30 text-pink-500 rounded-full flex items-center justify-center mb-6">
                <Target size={40} />
              </div>
              <h2 className="text-2xl font-poppins font-bold text-neutral-900 dark:text-neutral-50 mb-4">
                Bem-vindo ao FocusFlow
              </h2>
              <p className="text-neutral-500 dark:text-neutral-200 font-inter mb-8">
                Sua nova plataforma gamificada de produtividade. Combine a Técnica Pomodoro com proteção de saúde e evite o burnout acadêmico.
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <div className="w-20 h-20 bg-lilac-100 dark:bg-lilac-900/30 text-lilac-600 rounded-full flex items-center justify-center mb-6">
                <Bell size={40} />
              </div>
              <h2 className="text-2xl font-poppins font-bold text-neutral-900 dark:text-neutral-50 mb-4">
                Mude o Seu Ritmo
              </h2>
              <p className="text-neutral-500 dark:text-neutral-200 font-inter mb-8">
                Para que possamos emitir alertas sonoros e notificar suas pausas vitais (sem bloquear abas), por favor, <b>permita as notificações</b> no próximo passo.
              </p>
            </>
          )}

          {step === 3 && (
            <>
              <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 text-amber-500 rounded-full flex items-center justify-center mb-6">
                <Zap size={40} />
              </div>
              <h2 className="text-2xl font-poppins font-bold text-neutral-900 dark:text-neutral-50 mb-4">
                Tudo Pronto!
              </h2>
              <p className="text-neutral-500 dark:text-neutral-200 font-inter mb-8">
                Agora é com você. Inicie sua primeira sessão, cumpra as missões exibidas, colecione Pontos de Saúde e destrave o Diário Cognitivo.
              </p>
            </>
          )}

          <div className="flex w-full gap-3 mt-4">
            <Button 
              onClick={handleNext} 
              className="w-full bg-pink-500 hover:bg-pink-600 outline-none focus:ring-4 focus:ring-pink-500/50 text-white font-poppins font-bold rounded-2xl h-14 text-lg transition-transform active:scale-95 shadow-card"
            >
              {step === 3 ? "Começar a Focar!" : "Entendido, Próximo"}
            </Button>
          </div>
          
          <div className="flex gap-2 mt-8">
            <div className={`w-2.5 h-2.5 rounded-full transition-colors ${step === 1 ? 'bg-pink-500' : 'bg-neutral-200 dark:bg-dark-border'}`} />
            <div className={`w-2.5 h-2.5 rounded-full transition-colors ${step === 2 ? 'bg-pink-500' : 'bg-neutral-200 dark:bg-dark-border'}`} />
            <div className={`w-2.5 h-2.5 rounded-full transition-colors ${step === 3 ? 'bg-pink-500' : 'bg-neutral-200 dark:bg-dark-border'}`} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
