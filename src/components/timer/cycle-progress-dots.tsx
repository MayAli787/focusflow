'use client';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function CycleProgressDots({
  totalCycles,
  currentCycle,
  className,
}: {
  totalCycles: number;
  currentCycle: number;
  className?: string;
}) {
  const dots = Array.from({ length: totalCycles }, (_, i) => i + 1);

  return (
    <div className={cn('flex items-center justify-center gap-3', className)}>
      {dots.map((dot) => {
        const isCompleted = dot < currentCycle;
        const isCurrent = dot === currentCycle;

        return (
          <div
            key={dot}
            className={cn(
              'h-3 w-3 rounded-full transition-all duration-300',
              isCompleted && 'bg-pink-500 shadow-[0_0_8px_rgba(255,105,180,0.5)]',
              isCurrent && 'bg-lilac-500 animate-pulse-slow shadow-[0_0_12px_rgba(169,109,217,0.6)] scale-125',
              !isCompleted && !isCurrent && 'bg-neutral-100 dark:bg-dark-border'
            )}
          />
        );
      })}
    </div>
  );
}
