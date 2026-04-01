'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function CognitiveCheckIn({ cycleId, onClose }: { cycleId?: string | null; onClose: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSelect = async (state: string) => {
    setSelected(state);
    setSubmitting(true);
    
    // Auto-submit amigável (delay 500ms visuais)
    setTimeout(async () => {
      try {
        if (cycleId) {
          await fetch(`/api/cycles/${cycleId}/state`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ state }),
          });
          toast.success('Check-in registrado! +5 pts');
        }
        onClose();
        router.refresh(); 
      } catch (e) {
        toast.error('Erro ao registrar estado cognitivo.');
        onClose();
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-900/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-dark-card w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl p-8 flex flex-col gap-6 animate-pop">
        <div className="text-center">
          <h2 className="text-2xl font-poppins font-bold text-neutral-900 dark:text-neutral-50 leading-tight">
            Fim do Foco!
          </h2>
          <p className="text-neutral-500 font-inter dark:text-neutral-100 mt-2 text-sm">
            Como você está se sentindo fisicamente e mentalmente agora?
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <button
            disabled={submitting}
            onClick={() => handleSelect('focused')}
            className={`w-full flex items-center justify-start px-6 py-4 gap-4 rounded-2xl transition-all shadow-sm ${
              selected === 'focused' 
                ? 'bg-blue-300 scale-[0.98] ring-2 ring-blue-500' 
                : 'bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30'
            }`}
          >
            <span className="text-3xl drop-shadow-sm">🎯</span>
            <span className="text-blue-900 dark:text-blue-100 font-poppins font-bold text-lg tracking-wide">Focado</span>
          </button>

          <button
            disabled={submitting}
            onClick={() => handleSelect('tired')}
            className={`w-full flex items-center justify-start px-6 py-4 gap-4 rounded-2xl transition-all shadow-sm ${
              selected === 'tired' 
                ? 'bg-amber-300 scale-[0.98] ring-2 ring-amber-500' 
                : 'bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/30'
            }`}
          >
            <span className="text-3xl drop-shadow-sm">😴</span>
            <span className="text-amber-900 dark:text-amber-100 font-poppins font-bold text-lg tracking-wide">Cansado</span>
          </button>

          <button
            disabled={submitting}
            onClick={() => handleSelect('stressed')}
            className={`w-full flex items-center justify-start px-6 py-4 gap-4 rounded-2xl transition-all shadow-sm ${
              selected === 'stressed' 
                ? 'bg-pink-300 scale-[0.98] ring-2 ring-pink-500' 
                : 'bg-pink-100 hover:bg-pink-200 dark:bg-pink-900/30'
            }`}
          >
            <span className="text-3xl drop-shadow-sm">😰</span>
            <span className="text-pink-900 dark:text-pink-100 font-poppins font-bold text-lg tracking-wide">Estressado</span>
          </button>
        </div>
      </div>
    </div>
  );
}
