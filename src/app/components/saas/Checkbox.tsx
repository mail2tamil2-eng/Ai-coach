import { useEffect, useId, useRef } from 'react';
import { Check, Minus } from 'lucide-react';
import { cn } from '../ui/utils';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  indeterminate?: boolean;
  disabled?: boolean;
  className?: string;
}

/** Blue square checkbox used in completion-criteria and multi-select lists. */
export function Checkbox({ checked, onChange, label, indeterminate, disabled, className }: CheckboxProps) {
  const id = useId();
  const ref = useRef<HTMLInputElement>(null);
  // Native indeterminate state (no aria-checked override needed).
  useEffect(() => { if (ref.current) ref.current.indeterminate = !!indeterminate; }, [indeterminate]);
  const on = checked || indeterminate;
  return (
    <label htmlFor={id} className={cn('group inline-flex items-center gap-2', disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer', className)}>
      <input
        ref={ref}
        id={id}
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span
        aria-hidden
        className={cn(
          'flex size-4 shrink-0 items-center justify-center rounded border-2 transition-colors duration-100',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-[#1565F0] peer-focus-visible:ring-offset-1',
          on ? 'border-[#1565F0] bg-[#1565F0]' : 'border-[#6B7280] bg-white group-hover:border-[#374151]',
        )}
      >
        {indeterminate ? <Minus className="size-2.5 text-white" strokeWidth={3} /> : checked && <Check className="size-2.5 text-white" strokeWidth={3} />}
      </span>
      <span className={cn('text-[13px]', on ? 'font-medium text-[#1565F0]' : 'text-[#374151]')}>{label}</span>
    </label>
  );
}
