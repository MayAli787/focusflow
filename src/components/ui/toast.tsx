'use client';

import { Toaster as SonnerToaster } from 'sonner';

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            'bg-white dark:bg-dark-card border border-lilac-300 dark:border-dark-border shadow-card font-inter',
          title: 'text-neutral-900 dark:text-neutral-50 font-semibold',
          description: 'text-neutral-500 dark:text-neutral-100',
          success: 'border-green-300 bg-green-50 dark:bg-green-900/20',
          error: 'border-pink-700 bg-pink-100 dark:bg-pink-900/20',
          info: 'border-blue-300 bg-blue-100 dark:bg-blue-900/20',
        },
      }}
      richColors
    />
  );
}

export { toast } from 'sonner';
