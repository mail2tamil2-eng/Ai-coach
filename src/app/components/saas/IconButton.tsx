import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../ui/utils';

export type IconButtonVariant = 'table' | 'outline' | 'ghost' | 'solid';
export type IconButtonTone = 'neutral' | 'primary' | 'success' | 'danger';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required: icon-only buttons need an accessible name. Also used as the tooltip. */
  label: string;
  icon: ReactNode;
  variant?: IconButtonVariant;
  /** Hover colour for the `table` variant (course-table row actions). */
  tone?: IconButtonTone;
  size?: 'sm' | 'md';
}

const toneHover: Record<IconButtonTone, string> = {
  neutral: 'hover:bg-gray-100 hover:text-gray-700',
  primary: 'hover:bg-blue-50 hover:text-blue-600',
  success: 'hover:bg-green-50 hover:text-green-600',
  danger: 'hover:bg-red-50 hover:text-red-600',
};

const variants: Record<IconButtonVariant, string> = {
  table: 'text-gray-500 rounded-lg disabled:text-gray-300 disabled:hover:bg-transparent',
  // Back button in page headers
  outline: 'bg-white border border-[#E5E7EB] text-[#6B7280] rounded-[7px] hover:border-[#1565F0] hover:text-[#1565F0] disabled:opacity-50',
  ghost: 'text-gray-500 rounded-lg hover:bg-gray-50 disabled:opacity-50',
  solid: 'bg-[#1565F0] text-white rounded-full hover:bg-[#1A63E8] disabled:bg-[#C4C4C4]',
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, icon, variant = 'table', tone = 'primary', size = 'md', className, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex items-center justify-center transition-colors duration-150 disabled:cursor-not-allowed',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0] focus-visible:ring-offset-1',
        size === 'sm' ? 'size-[30px] [&_svg]:size-[15px]' : 'size-9 [&_svg]:size-4',
        variants[variant],
        variant === 'table' && toneHover[tone],
        className,
      )}
      {...props}
    >
      {icon}
    </button>
  );
});
