import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const chipVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium font-inter',
  {
    variants: {
      category: {
        hydration: 'bg-blue-100 text-blue-700',
        eye_rest: 'bg-lilac-100 text-lilac-700',
        stretch: 'bg-pink-100 text-pink-700',
        breathing: 'bg-green-100 text-green-700',
        movement: 'bg-amber-100 text-amber-700',
      },
    },
    defaultVariants: {
      category: 'hydration',
    },
  }
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof chipVariants> {}

const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  ({ className, category, ...props }, ref) => (
    <span ref={ref} className={cn(chipVariants({ category, className }))} {...props} />
  )
);
Chip.displayName = 'Chip';

export { Chip, chipVariants };
