import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/lib/common';

export type CustomVariantProps = VariantProps<typeof buttonStyles>;

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    CustomVariantProps {
  additionalClass?: string;
}

const buttonStyles = cva(
  'inline-flex select-none items-center justify-center whitespace-nowrap rounded-md align-middle font-semibold leading-tight outline-none outline-offset-2 transition',
  {
    variants: {
      intent: {
        // gray
        'solid-gray':
          'bg-gray-300 text-white hover:bg-gray-600 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300',
        'outline-gray':
          'border border-gray-600 text-gray-500 hover:bg-gray-50 dark:border-gray-200 dark:text-gray-200 dark:hover:bg-whiteAlpha-200',
        'ghost-gray':
          'text-gray-600 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-whiteAlpha-200',
        'link-gray': 'text-gray-500 underline dark:text-gray-200',
        // red
        'solid-red':
          'bg-red-300 text-white hover:bg-red-600 dark:bg-red-200 dark:text-gray-800 dark:hover:bg-red-300',
        'outline-red':
          'border border-red-600 text-red-500 hover:bg-red-50 dark:border-red-200 dark:text-red-200 dark:hover:bg-redAlpha-200',
        'ghost-red':
          'text-red-600 hover:bg-red-50 dark:text-red-200 dark:hover:bg-redAlpha-200',
        'link-red': 'text-red-500 underline dark:text-red-200',
        // orange
        'solid-orange':
          'bg-orange-300 text-white hover:bg-orange-600 dark:bg-orange-200 dark:text-gray-800 dark:hover:bg-orange-300',
        'outline-orange':
          'border border-orange-600 text-orange-500 hover:bg-orange-50 dark:border-orange-200 dark:text-orange-200 dark:hover:bg-orangeAlpha-200',
        'ghost-orange':
          'text-orange-600 hover:bg-orange-50 dark:text-orange-200 dark:hover:bg-orangeAlpha-200',
        'link-orange': 'text-orange-500 underline dark:text-orange-200',
        // yellow
        'solid-yellow':
          'bg-yellow-300 text-white hover:bg-yellow-600 dark:bg-yellow-200 dark:text-gray-800 dark:hover:bg-yellow-300',
        'outline-yellow':
          'border border-yellow-600 text-yellow-500 hover:bg-yellow-50 dark:border-yellow-200 dark:text-yellow-200 dark:hover:bg-yellowAlpha-200',
        'ghost-yellow':
          'text-yellow-600 hover:bg-yellow-50 dark:text-yellow-200 dark:hover:bg-yellowAlpha-200',
        'link-yellow': 'text-yellow-500 underline dark:text-yellow-200',
        // green
        'solid-green':
          'bg-green-300 text-white hover:bg-green-600 dark:bg-green-200 dark:text-gray-800 dark:hover:bg-green-300',
        'outline-green':
          'border border-green-600 text-green-500 hover:bg-green-50 dark:border-green-200 dark:text-green-200 dark:hover:bg-greenAlpha-200',
        'ghost-green':
          'text-green-600 hover:bg-green-50 dark:text-green-200 dark:hover:bg-greenAlpha-200',
        'link-green': 'text-green-500 underline dark:text-green-200',
        // teal
        'solid-teal':
          'bg-teal-300 text-white hover:bg-teal-600 dark:bg-teal-200 dark:text-gray-800 dark:hover:bg-teal-300',
        'outline-teal':
          'border border-teal-600 text-teal-500 hover:bg-teal-50 dark:border-teal-200 dark:text-teal-200 dark:hover:bg-tealAlpha-200',
        'ghost-teal':
          'text-teal-600 hover:bg-teal-50 dark:text-teal-200 dark:hover:bg-tealAlpha-200',
        'link-teal': 'text-teal-500 underline dark:text-teal-200',
        // blue
        'solid-blue':
          'bg-blue-300 text-white hover:bg-blue-600 dark:bg-blue-200 dark:text-gray-800 dark:hover:bg-blue-300',
        'outline-blue':
          'border border-blue-600 text-blue-500 hover:bg-blue-50 dark:border-blue-200 dark:text-blue-200 dark:hover:bg-blueAlpha-200',
        'ghost-blue':
          'text-blue-600 hover:bg-blue-50 dark:text-blue-200 dark:hover:bg-blueAlpha-200',
        'link-blue': 'text-blue-500 underline dark:text-blue-200',
        // cyan
        'solid-cyan':
          'bg-cyan-300 text-white hover:bg-cyan-600 dark:bg-cyan-200 dark:text-gray-800 dark:hover:bg-cyan-300',
        'outline-cyan':
          'border border-cyan-600 text-cyan-500 hover:bg-cyan-50 dark:border-cyan-200 dark:text-cyan-200 dark:hover:bg-cyanAlpha-200',
        'ghost-cyan':
          'text-cyan-600 hover:bg-cyan-50 dark:text-cyan-200 dark:hover:bg-cyanAlpha-200',
        'link-cyan': 'text-cyan-500 underline dark:text-cyan-200',
        // purple
        'solid-purple':
          'bg-purple-300 text-white hover:bg-purple-600 dark:bg-purple-200 dark:text-gray-800 dark:hover:bg-purple-300',
        'outline-purple':
          'border border-purple-600 text-purple-500 hover:bg-purple-50 dark:border-purple-200 dark:text-purple-200 dark:hover:bg-purpleAlpha-200',
        'ghost-purple':
          'text-purple-600 hover:bg-purple-50 dark:text-purple-200 dark:hover:bg-purpleAlpha-200',
        'link-purple': 'text-purple-500 underline dark:text-purple-200',
        // pink
        'solid-pink':
          'bg-pink-300 text-white hover:bg-pink-600 dark:bg-pink-200 dark:text-gray-800 dark:hover:bg-pink-300',
        'outline-pink':
          'border border-pink-600 text-pink-500 hover:bg-pink-50 dark:border-pink-200 dark:text-pink-200 dark:hover:bg-pinkAlpha-200',
        'ghost-pink':
          'text-pink-600 hover:bg-pink-50 dark:text-pink-200 dark:hover:bg-pinkAlpha-200',
        'link-pink': 'text-pink-500 underline dark:text-pink-200',
      },
      size: {
        xs: 'h-6 min-h-6 pe-2 ps-2 text-xs',
        sm: 'h-8 min-h-8 pe-3 ps-3 text-sm',
        md: 'h-10 min-h-10 pe-4 ps-4 text-base',
        lg: 'h-12 min-h-12 pe-6 ps-6 text-lg',
      },
    },
    defaultVariants: {
      intent: 'solid-green',
      size: 'md',
    },
  }
);

export default function Button({
  children,
  onClick,
  intent,
  additionalClass,
  size,
}: ButtonProps) {
  const buttonClassName = cn(
    buttonStyles({
      size,
      intent,
    }),
    additionalClass
  );
  return (
    <button type="button" onClick={onClick} className={buttonClassName}>
      {children}
    </button>
  );
}
