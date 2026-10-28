import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../ui/utils';

export type BadgeStatus =
  | 'published' | 'draft' | 'edited' | 'approved' | 'error'
  | 'step' | 'basic' | 'intermediate' | 'advanced' | 'new' | 'neutral';

export interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: BadgeStatus;
  /** Defaults to a label derived from `status`. */
  children?: ReactNode;
  /** Small leading dot — never the only signal; the text carries the meaning. */
  dot?: boolean;
  icon?: ReactNode;
}

const styles: Record<BadgeStatus, { cls: string; dot: string; label: string }> = {
  published: { cls: 'bg-green-100 text-green-800', dot: 'bg-green-500', label: 'Published' },
  draft: { cls: 'bg-amber-100 text-amber-800', dot: 'bg-amber-500', label: 'Draft' },
  edited: { cls: 'bg-amber-50 text-amber-700 border border-amber-200', dot: 'bg-amber-500', label: 'Edited' },
  approved: { cls: 'bg-emerald-50 text-emerald-700 border border-emerald-200', dot: 'bg-emerald-500', label: 'Approved' },
  error: { cls: 'bg-red-50 text-red-700 border border-red-200', dot: 'bg-red-500', label: 'Failed' },
  // "Step 1 of 2 · Course Details"
  step: { cls: 'bg-[#EBF3FF] text-[#1254C7] border border-[#93C5FD] rounded-full px-[9px] py-[3px] text-[13px] font-semibold', dot: 'bg-[#1565F0]', label: 'Step 1 of 2' },
  basic: { cls: 'bg-emerald-100 text-emerald-700 rounded-full font-bold', dot: 'bg-emerald-400', label: 'Basic' },
  intermediate: { cls: 'bg-blue-100 text-blue-700 rounded-full font-bold', dot: 'bg-blue-400', label: 'Intermediate' },
  advanced: { cls: 'bg-violet-100 text-violet-700 rounded-full font-bold', dot: 'bg-violet-400', label: 'Advanced' },
  new: { cls: 'bg-orange-100 text-orange-700 rounded-full font-bold uppercase tracking-wide text-[10px]', dot: 'bg-orange-500', label: 'New' },
  neutral: { cls: 'bg-gray-100 text-gray-700', dot: 'bg-gray-400', label: 'Neutral' },
};

export function StatusBadge({ status, children, dot, icon, className, ...props }: StatusBadgeProps) {
  const s = styles[status];
  return (
    <span
      className={cn('inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-medium [&_svg]:size-3', s.cls, className)}
      {...props}
    >
      {dot && <span aria-hidden className={cn('size-1.5 rounded-full', s.dot)} />}
      {icon}
      {children ?? s.label}
    </span>
  );
}
