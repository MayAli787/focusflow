'use client';
import { Play, Pause, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function TimerControls({
  isRunning,
  onToggle,
  onStop,
  className,
}: {
  isRunning: boolean;
  onToggle: () => void;
  onStop: () => void;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center justify-center gap-6', className)}>
      <Button
        variant="ghost"
        size="icon"
        onClick={onStop}
        className="h-14 w-14 rounded-full bg-neutral-100 hover:bg-pink-100 hover:text-pink-600 dark:bg-dark-border dark:hover:bg-pink-900/40 text-neutral-500 transition-all active:scale-95"
      >
        <Square size={24} fill="currentColor" />
      </Button>

      <Button
        size="icon"
        onClick={onToggle}
        className={cn(
          'h-20 w-20 rounded-full shadow-lg transition-all active:scale-95 border-0 hover:shadow-xl',
          isRunning
            ? 'bg-amber-400 hover:bg-amber-500 text-amber-950 shadow-[0_4px_20px_rgba(251,191,36,0.3)]'
            : 'bg-gradient-to-br from-green-400 to-emerald-600 hover:scale-105 text-white shadow-[0_4px_24px_rgba(16,185,129,0.4)]'
        )}
      >
        {isRunning ? <Pause size={32} fill="currentColor" /> : <Play size={36} fill="currentColor" className="ml-2" />}
      </Button>
    </div>
  );
}
