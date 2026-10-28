import type { ReactNode } from 'react';
import { cn } from '../ui/utils';

export interface ActionBarProps {
  /** Left side, usually a secondary "Cancel" / "Back" button. */
  start?: ReactNode;
  /** Muted hint shown before the primary action ("Add a course title to continue"). */
  hint?: ReactNode;
  /** Right side, usually the primary action. */
  end?: ReactNode;
  className?: string;
}

/** Bottom action bar pinned under wizard steps. */
export function ActionBar({ start, hint, end, className }: ActionBarProps) {
  return (
    <div className={cn('border-t border-[#E5E7EB] bg-white px-7 py-3.5', className)}>
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4">
        <div>{start}</div>
        <div className="flex items-center gap-2.5">
          {hint && <span className="text-[13px] text-[#6B7280]" aria-live="polite">{hint}</span>}
          {end}
        </div>
      </div>
    </div>
  );
}
