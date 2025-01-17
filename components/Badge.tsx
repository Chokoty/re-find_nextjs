import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import React from 'react';

type BadgeProps = VariantProps<typeof badgeStyles> & {
  children: React.ReactNode;
};

const badgeStyles = cva(
  'inline-block whitespace-nowrap text-sm font-bold 2xs:text-base',
  {
    variants: {
      intent: {
        primary: 'bg-teal-75 dark:bg-pink-400',
        secondary: 'bg-green-100 dark:bg-greenAlpha-200',
        danger: 'bg-red-100 dark:bg-redAlpha-200',
        warning: 'bg-yellow-100 dark:bg-yellowAlpha-200',
        // info: 'bg-info text-white',
        // success: 'bg-success text-white',
      },
      size: {
        md: 'rounded-sm px-1',
        lg: ' rounded-md px-1.5 py-0.5',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      size: 'md',
      intent: 'primary',
    },
  }
);

export default function Badge({ children, intent, size }: BadgeProps) {
  const badgeClassName = badgeStyles({
    intent,
    size,
    rounded: 'md',
  });
  return <span className={badgeClassName}>{children}</span>;
}
