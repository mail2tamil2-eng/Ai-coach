import type { ReactNode } from 'react';
import { Check } from 'lucide-react';
import { cn } from '../ui/utils';

export interface SelectionCardProps {
  title: string;
  description?: string;
  selected: boolean;
  onSelect: () => void;
  /** Colour of the leading dot (decorative; the title carries the meaning). */
  dotColor?: string;
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
}

/** Single-choice card, e.g. Course Complexity (Basic / Intermediate / Advanced). */
export function SelectionCard({ title, description, selected, onSelect, dotColor, icon, disabled, className }: SelectionCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        'w-full rounded-[10px] border-2 px-3.5 py-3 text-left transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0] focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        selected ? 'border-[#1565F0] bg-[#EBF3FF]' : 'border-[#E5E7EB] bg-white hover:border-[#93C5FD]',
        className,
      )}
    >
      <div className="mb-1 flex items-center gap-[7px]">
        {dotColor && <span aria-hidden className="size-[7px] shrink-0 rounded-full" style={{ background: dotColor }} />}
        {icon && <span className="text-[#6B7280] [&_svg]:size-4">{icon}</span>}
        <span className="text-[13px] font-bold text-[#111827]">{title}</span>
        {selected && <Check aria-hidden className="ml-auto size-3 text-[#1565F0]" />}
      </div>
      {description && <p className={cn('m-0 text-[13px] leading-normal', selected ? 'text-[#4B5563]' : 'text-[#6B7280]')}>{description}</p>}
    </button>
  );
}
