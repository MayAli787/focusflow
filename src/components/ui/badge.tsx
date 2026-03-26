import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium font-inter transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-lilac-100 text-lilac-700 dark:bg-lilac-700/20 dark:text-lilac-300',
        success: 'bg-pink-100 text-pink-700 dark:bg-pink-700/20 dark:text-pink-300',
        info: 'bg-blue-100 text-blue-700 dark:bg-blue-700/20 dark:text-blue-300',
        warning: 'bg-amber-100 text-amber-700 dark:bg-amber-700/20 dark:text-amber-300',
        locked: 'bg-neutral-100 text-neutral-500 dark:bg-neutral-900/50 dark:text-neutral-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant, className }))} {...props} />
  )
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
