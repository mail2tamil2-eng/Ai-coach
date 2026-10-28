import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '../ui/utils';

export interface ChipProps {
  children: ReactNode;
  icon?: ReactNode;
  /** Makes the chip a toggle button (aria-pressed). */
  selected?: boolean;
  onClick?: () => void;
  /** Adds a remove (×) button. */
  onRemove?: () => void;
  disabled?: boolean;
  className?: string;
}

/** Pill used for slide types, tags and filters ("Title + Text", "Quiz"). */
export function Chip({ children, icon, selected, onClick, onRemove, disabled, className }: ChipProps) {
  const cls = cn(
    'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[13px] transition-colors [&_svg]:size-3',
    selected ? 'bg-[#EBF3FF] text-[#1254C7] ring-1 ring-[#93C5FD]' : 'bg-[#F3F4F6] text-[#374151]',
    onClick && !disabled && (selected ? 'hover:bg-[#DBEAFE]' : 'hover:bg-[#E5E7EB]'),
    disabled && 'opacity-50 cursor-not-allowed',
    className,
  );
  const content = (
    <>
      {icon}
      {children}
    </>
  );
  if (onClick) {
    return (
      <button
        type="button"
        aria-pressed={selected}
        disabled={disabled}
        onClick={onClick}
        className={cn(cls, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]')}
      >
        {content}
      </button>
    );
  }
  return (
    <span className={cls}>
      {content}
      {onRemove && (
        <button
          type="button"
          aria-label={`Remove ${typeof children === 'string' ? children : 'item'}`}
          onClick={onRemove}
          disabled={disabled}
          className="ml-0.5 rounded-full p-0.5 hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]"
        >
          <X className="size-3" />
        </button>
      )}
    </span>
  );
}
