import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium font-inter text-neutral-900 dark:text-neutral-50"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(
            'flex h-10 w-full rounded-md border-2 border-lilac-300 bg-white px-3 py-2',
            'font-inter text-sm text-neutral-900 placeholder:text-neutral-500',
            'transition-colors duration-200',
            'focus-visible:outline-none focus-visible:border-lilac-500 focus-visible:ring-2 focus-visible:ring-lilac-500/20',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'dark:bg-dark-card dark:border-dark-border dark:text-neutral-50',
            error && 'border-pink-700 focus-visible:border-pink-700 focus-visible:ring-pink-700/20',
            className
          )}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-pink-700 font-inter" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
