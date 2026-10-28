import { useId } from 'react';
import { cn } from '../ui/utils';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

/** On/off switch from the slide & player settings panels. */
export function Toggle({ checked, onChange, label, description, disabled, className }: ToggleProps) {
  const id = useId();
  return (
    <div className={cn('flex items-center justify-between gap-4', disabled && 'opacity-50', className)}>
      <div>
        <label htmlFor={id} className={cn('text-[13px] text-[#374151]', !disabled && 'cursor-pointer')}>{label}</label>
        {description && <p id={`${id}-d`} className="text-[12px] text-[#6B7280]">{description}</p>}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-describedby={description ? `${id}-d` : undefined}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative h-5 w-9 shrink-0 rounded-full transition-colors duration-150 disabled:cursor-not-allowed',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0] focus-visible:ring-offset-2',
          checked ? 'bg-[#1565F0]' : 'bg-[#6B7280]',
        )}
      >
        <span
          aria-hidden
          className={cn('absolute top-0.5 size-4 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-[left] duration-150', checked ? 'left-[18px]' : 'left-0.5')}
        />
      </button>
    </div>
  );
}
