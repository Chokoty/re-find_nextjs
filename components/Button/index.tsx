import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import React, { forwardRef } from 'react';

import { cn } from '@/lib/common';

export type CustomVariantProps = VariantProps<typeof buttonStyles>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    CustomVariantProps {
  additionalClass?: string;
}

// TODO: active 추가하기
const buttonStyles = cva(
  'inline-flex select-none items-center justify-center whitespace-nowrap rounded-md align-middle font-semibold leading-tight outline-none outline-offset-2 transition disabled:cursor-not-allowed disabled:opacity-75',
  {
    variants: {
      intent: {
        // gray
        'solid-gray':
          'bg-gray-300 text-white hover:bg-gray-600 active:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300 dark:active:bg-gray-400',
        'outline-gray':
          'border border-gray-600 text-gray-500 hover:bg-gray-50 active:bg-gray-100 dark:border-gray-200 dark:text-gray-200 dark:hover:bg-whiteAlpha-200 dark:active:bg-whiteAlpha-300',
        'ghost-gray':
          'text-gray-600 hover:bg-gray-100 active:bg-gray-200 dark:text-gray-200 dark:hover:bg-whiteAlpha-200 dark:active:bg-whiteAlpha-300',
        'link-gray': 'text-gray-500 hover:underline dark:text-gray-200',
        // red
        'solid-red':
          'bg-red-300 text-white hover:bg-red-600 active:bg-red-700 dark:bg-red-200 dark:text-gray-800 dark:hover:bg-red-300 dark:active:bg-red-400',
        'outline-red':
          'border border-red-600 text-red-500 hover:bg-red-50 active:bg-red-100 dark:border-red-200 dark:text-red-200 dark:hover:bg-redAlpha-200 dark:active:bg-redAlpha-300',
        'ghost-red':
          'text-red-600 hover:bg-red-100 active:bg-red-200 dark:text-red-200 dark:hover:bg-redAlpha-200 dark:active:bg-redAlpha-300',
        'link-red': 'text-red-500 hover:underline dark:text-red-200',
        // orange
        'solid-orange':
          'bg-orange-300 text-white hover:bg-orange-600 active:bg-orange-700 dark:bg-orange-200 dark:text-gray-800 dark:hover:bg-orange-300 dark:active:bg-orange-400',
        'outline-orange':
          'border border-orange-600 text-orange-500 hover:bg-orange-50 active:bg-orange-100 dark:border-orange-200 dark:text-orange-200 dark:hover:bg-orangeAlpha-200 dark:active:bg-orangeAlpha-300',
        'ghost-orange':
          'text-orange-600 hover:bg-orange-100 active:bg-orange-200 dark:text-orange-200 dark:hover:bg-orangeAlpha-200 dark:active:bg-orangeAlpha-300',
        'link-orange': 'text-orange-500 hover:underline dark:text-orange-200',
        // yellow
        'solid-yellow':
          'bg-yellow-300 text-white hover:bg-yellow-600 active:bg-yellow-700 dark:bg-yellow-200 dark:text-gray-800 dark:hover:bg-yellow-300 dark:active:bg-yellow-400',
        'outline-yellow':
          'border border-yellow-600 text-yellow-500 hover:bg-yellow-50 active:bg-yellow-100 dark:border-yellow-200 dark:text-yellow-200 dark:hover:bg-yellowAlpha-200 dark:active:bg-yellowAlpha-300',
        'ghost-yellow':
          'text-yellow-600 hover:bg-yellow-100 active:bg-yellow-200 dark:text-yellow-200 dark:hover:bg-yellowAlpha-200 dark:active:bg-yellowAlpha-300',
        'link-yellow': 'text-yellow-500 hover:underline dark:text-yellow-200',
        // green
        'solid-green':
          'bg-green-300 text-white hover:bg-green-600 active:bg-green-700 dark:bg-green-200 dark:text-gray-800 dark:hover:bg-green-300 dark:active:bg-green-400',
        'outline-green':
          'border border-green-600 text-green-500 hover:bg-green-50 active:bg-green-100 dark:border-green-200 dark:text-green-200 dark:hover:bg-greenAlpha-200 dark:active:bg-greenAlpha-300',
        'ghost-green':
          'text-green-600 hover:bg-green-100 active:bg-green-100 dark:text-green-200 dark:hover:bg-greenAlpha-200 dark:active:bg-greenAlpha-300',
        'link-green': 'text-green-500 hover:underline dark:text-green-200',
        // teal
        'solid-teal':
          'bg-teal-300 text-white hover:bg-teal-600 active:bg-teal-700 dark:bg-teal-200 dark:text-gray-800 dark:hover:bg-teal-300 dark:active:bg-teal-400',
        'outline-teal':
          'border border-teal-600 text-teal-500 hover:bg-teal-50 active:bg-teal-100 dark:border-teal-200 dark:text-teal-200 dark:hover:bg-tealAlpha-200 dark:active:bg-tealAlpha-300',
        'ghost-teal':
          'text-teal-600 hover:bg-teal-100 active:bg-teal-200 dark:text-teal-200 dark:hover:bg-tealAlpha-200 dark:active:bg-tealAlpha-300',
        'link-teal': 'text-teal-500 hover:underline dark:text-teal-200',
        // blue
        'solid-blue':
          'bg-blue-300 text-white hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-200 dark:text-gray-800 dark:hover:bg-blue-300 dark:active:bg-blue-400',
        'outline-blue':
          'border border-blue-600 text-blue-500 hover:bg-blue-50 active:bg-blue-100 dark:border-blue-200 dark:text-blue-200 dark:hover:bg-blueAlpha-200 dark:active:bg-blueAlpha-300',
        'ghost-blue':
          'text-blue-600 hover:bg-blue-100 active:bg-blue-200 dark:text-blue-200 dark:hover:bg-blueAlpha-200 dark:active:bg-blueAlpha-300',
        'link-blue': 'text-blue-500 hover:underline dark:text-blue-200',
        // cyan
        'solid-cyan':
          'bg-cyan-300 text-white hover:bg-cyan-600 active:bg-cyan-700 dark:bg-cyan-200 dark:text-gray-800 dark:hover:bg-cyan-300 dark:active:bg-cyan-400',
        'outline-cyan':
          'border border-cyan-600 text-cyan-500 hover:bg-cyan-50 active:bg-cyan-100 dark:border-cyan-200 dark:text-cyan-200 dark:hover:bg-cyanAlpha-200 dark:active:bg-cyanAlpha-300',
        'ghost-cyan':
          'text-cyan-600 hover:bg-cyan-100 active:bg-cyan-200 dark:text-cyan-200 dark:hover:bg-cyanAlpha-200 dark:active:bg-cyanAlpha-300',
        'link-cyan': 'text-cyan-500 hover:underline dark:text-cyan-200',
        // purple
        'solid-purple':
          'bg-purple-300 text-white hover:bg-purple-600 active:bg-purple-700 dark:bg-purple-200 dark:text-gray-800 dark:hover:bg-purple-300 dark:active:bg-purple-400',
        'outline-purple':
          'border border-purple-600 text-purple-500 hover:bg-purple-50 active:bg-purple-100 dark:border-purple-200 dark:text-purple-200 dark:hover:bg-purpleAlpha-200 dark:active:bg-purpleAlpha-300',
        'ghost-purple':
          'text-purple-600 hover:bg-purple-100 active:bg-purple-200 dark:text-purple-200 dark:hover:bg-purpleAlpha-200 dark:active:bg-purpleAlpha-300',
        'link-purple': 'text-purple-500 hover:underline dark:text-purple-200',
        // pink
        'solid-pink':
          'bg-pink-300 text-white hover:bg-pink-600 active:bg-pink-700 dark:bg-pink-200 dark:text-gray-800 dark:hover:bg-pink-300 dark:active:bg-pink-400',
        'outline-pink':
          'border border-pink-600 text-pink-500 hover:bg-pink-50 active:bg-pink-100 dark:border-pink-200 dark:text-pink-200 dark:hover:bg-pinkAlpha-200 dark:active:bg-pinkAlpha-300',
        'ghost-pink':
          'text-pink-600 hover:bg-pink-100 active:bg-pink-200 dark:text-pink-200 dark:hover:bg-pinkAlpha-200 dark:active:bg-pinkAlpha-300',
        'link-pink': 'text-pink-500 hover:underline dark:text-pink-200',
        // Secondary 색상 추가
        'solid-secondary':
          'bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800',
        'outline-secondary':
          'border border-gray-500 text-gray-500 hover:bg-gray-100 active:bg-gray-200 dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-300 dark:active:bg-gray-400',
        'ghost-secondary':
          'text-gray-500 hover:bg-gray-100 active:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-300 dark:active:bg-gray-400',
        'link-secondary': 'text-gray-500 hover:underline dark:text-gray-400',
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

function Button(
  { children, onClick, disabled, intent, additionalClass, size }: ButtonProps,
  ref: React.Ref<HTMLButtonElement>
) {
  const buttonClassName = cn(
    buttonStyles({
      size,
      intent,
    }),
    additionalClass
  );
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={buttonClassName}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default forwardRef(Button);
