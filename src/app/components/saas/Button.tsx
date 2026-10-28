import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../ui/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'soft' | 'ai-outline' | 'accent' | 'inverse' | 'danger' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Shows a spinner, disables the button and sets aria-busy. */
  loading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors duration-150 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0] focus-visible:ring-offset-2 ' +
  'disabled:cursor-not-allowed [&_svg]:shrink-0';

const variants: Record<ButtonVariant, string> = {
  // "Generate Course", "Continue", "Publish"
  primary: 'bg-[#1565F0] text-white hover:bg-[#1A63E8] disabled:bg-[#C4C4C4] disabled:hover:bg-[#C4C4C4]',
  // "Cancel", "Save Draft"
  secondary: 'bg-white text-[#374151] border border-[#E5E7EB] font-medium hover:bg-[#F9FAFB] disabled:text-[#9CA3AF] disabled:hover:bg-white',
  // "Generate with AI" inline helpers
  soft: 'bg-[#EBF3FF] text-[#1254C7] font-medium hover:bg-[#DBEAFE] disabled:opacity-60',
  // "Enhance with AI" — secondary AI action next to a primary
  'ai-outline': 'bg-white text-[#1565F0] border border-[#1565F0] hover:bg-[#EBF3FF] disabled:opacity-60',
  // "Resume Editing" — orange-700: white text on orange-500 is only 2.8:1
  accent: 'bg-[#C2410C] text-white shadow-sm hover:bg-[#9A3412] hover:shadow-md disabled:bg-[#C4C4C4] disabled:shadow-none',
  // "Create New Course" on the blue hero
  inverse: 'bg-white text-blue-700 shadow-lg hover:bg-gray-50 hover:shadow-xl disabled:opacity-60',
  danger: 'bg-[#DC2626] text-white hover:bg-[#B91C1C] disabled:bg-[#C4C4C4]',
  ghost: 'bg-transparent text-[#374151] font-medium hover:bg-[#F3F4F6] disabled:opacity-50',
  // "View All →"
  link: 'bg-transparent text-blue-600 font-medium hover:text-blue-700 hover:underline underline-offset-4 disabled:opacity-50 !px-0 !h-auto',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-[13px] rounded-[7px] [&_svg]:size-3.5',
  md: 'h-10 px-5 text-[13px] rounded-[9px] [&_svg]:size-3.5',
  lg: 'h-12 px-6 text-[15px] rounded-xl [&_svg]:size-5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', loading = false, loadingText, leftIcon, rightIcon, fullWidth, className, children, disabled, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
      {...props}
    >
      {loading ? <Loader2 className="animate-spin" aria-hidden /> : leftIcon}
      {loading && loadingText ? loadingText : children}
      {!loading && rightIcon}
    </button>
  );
});
