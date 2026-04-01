'use client';

import { useEffect, useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function TimerRing({
  progress,
  timeText,
  label,
  className,
}: {
  progress: number; // 0 a 100
  timeText: string;
  label?: string;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const size = 320;
  const strokeWidth = 14;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  
  // Calcula o offset do dash (100 = vazio, 0 = completo)
  // Invertemos a lógica visual: progress 100 = anel cheio
  const strokeDashoffset = mounted 
    ? circumference - (progress / 100) * circumference 
    : circumference;

  return (
    <div className={cn('relative flex flex-col items-center justify-center', className)}>
      <svg width={size} height={size} className="-rotate-90 transform">
        {/* Definições de Gradiente */}
        <defs>
          <linearGradient id="gradientRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5BA4CF" />   {/* Azul */}
            <stop offset="50%" stopColor="#A96DD9" />  {/* Lilás */}
            <stop offset="100%" stopColor="#4169E1" /> {/* Azul Royal */}
          </linearGradient>
        </defs>

        {/* Fundo do Anel */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-neutral-100 dark:text-dark-card transition-colors duration-300"
        />

        {/* Anel de Progresso */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="url(#gradientRing)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-linear"
        />
      </svg>

      {/* Conteúdo Central */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-[5rem] font-poppins font-bold text-neutral-900 dark:text-neutral-50 tracking-tighter leading-none">
          {timeText}
        </span>
        {label && (
          <span className="mt-2 text-sm font-inter font-medium text-neutral-500 dark:text-neutral-100 tracking-widest uppercase">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
