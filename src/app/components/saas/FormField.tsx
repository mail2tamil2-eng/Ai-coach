import { forwardRef, useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../ui/utils';

const fieldBase =
  'w-full rounded-lg border bg-white px-3 py-[9px] text-[13px] text-[#111827] placeholder:text-[#6B7280] outline-none transition-[border-color,box-shadow] ' +
  'focus:border-[#1565F0] focus:shadow-[0_0_0_3px_rgba(21,101,240,0.12)] ' +
  'disabled:cursor-not-allowed disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF]';

const fieldBorder = (invalid?: boolean) =>
  invalid ? 'border-[#DC2626] focus:border-[#DC2626] focus:shadow-[0_0_0_3px_rgba(220,38,38,0.12)]' : 'border-[#6B7280]'; // ≥3:1 against white (WCAG 1.4.11)

export interface FormFieldProps {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  /** Right-aligned element on the label row, e.g. a character count or AI button. */
  labelAction?: ReactNode;
  className?: string;
  children: (ids: { id: string; describedBy?: string; invalid: boolean }) => ReactNode;
}

/** Label + control + hint/error wiring. Errors are announced via role="alert". */
export function FormField({ label, required, hint, error, labelAction, className, children }: FormFieldProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;
  return (
    <div className={cn('flex flex-col', className)}>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-[13px] font-semibold text-[#374151]">
          {label}
          {required && <span className="text-[#DC2626]" aria-hidden> *</span>}
          {required && <span className="sr-only"> (required)</span>}
        </label>
        {labelAction}
      </div>
      {children({ id, describedBy, invalid: !!error })}
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-[12px] font-medium text-[#B91C1C]">{error}</p>
      ) : hint ? (
        <p id={hintId} className="mt-1.5 text-[12px] text-[#6B7280]">{hint}</p>
      ) : null}
    </div>
  );
}

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  leftIcon?: ReactNode;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput({ invalid, leftIcon, className, ...props }, ref) {
  const input = (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(fieldBase, fieldBorder(invalid), leftIcon && 'pl-9', className)}
      {...props}
    />
  );
  if (!leftIcon) return input;
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] [&_svg]:size-4">{leftIcon}</span>
      {input}
    </div>
  );
});

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea({ invalid, className, rows = 3, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cn(fieldBase, fieldBorder(invalid), 'resize-y leading-relaxed', className)}
      {...props}
    />
  );
});

export interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
  options: (string | { value: string; label: string })[];
}

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(function SelectInput({ invalid, options, className, ...props }, ref) {
  return (
    <div className="relative">
      <select
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(fieldBase, fieldBorder(invalid), 'cursor-pointer appearance-none pr-9', className)}
        {...props}
      >
        {options.map((o) => {
          const opt = typeof o === 'string' ? { value: o, label: o } : o;
          return <option key={opt.value} value={opt.value}>{opt.label}</option>;
        })}
      </select>
      {/* Custom caret — pointer-events-none so clicks pass through to the <select> */}
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#6B7280]"
      />
    </div>
  );
});
