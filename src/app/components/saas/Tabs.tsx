import type { ReactNode } from 'react';
import * as RTabs from '@radix-ui/react-tabs';
import { cn } from '../ui/utils';

export interface TabItem {
  value: string;
  label: string;
  icon?: ReactNode;
  count?: number;
  disabled?: boolean;
  content?: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** `underline` = editor panels, `pills` = segmented control, `enclosed` = card tabs. */
  variant?: 'underline' | 'pills' | 'enclosed';
  size?: 'sm' | 'md';
  fullWidth?: boolean;
  'aria-label'?: string;
  className?: string;
}

/** Keyboard: ←/→ to move, Home/End, Enter/Space to activate (Radix). */
export function Tabs({ items, value, defaultValue, onValueChange, variant = 'underline', size = 'md', fullWidth, className, ...rest }: TabsProps) {
  return (
    <RTabs.Root value={value} defaultValue={defaultValue ?? items[0]?.value} onValueChange={onValueChange} className={className}>
      <RTabs.List
        aria-label={rest['aria-label']}
        className={cn(
          'flex',
          variant === 'underline' && 'gap-1 border-b border-[#E5E7EB]',
          variant === 'pills' && 'inline-flex gap-1 rounded-[10px] bg-[#F3F4F6] p-1',
          variant === 'enclosed' && 'gap-1 border-b border-[#E5E7EB]',
          fullWidth && 'w-full',
        )}
      >
        {items.map((t) => (
          <RTabs.Trigger
            key={t.value}
            value={t.value}
            disabled={t.disabled}
            className={cn(
              'group inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-medium text-[#6B7280] transition-colors [&_svg]:size-4',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0] focus-visible:ring-offset-1',
              'disabled:cursor-not-allowed disabled:opacity-50',
              size === 'sm' ? 'px-2.5 py-1.5 text-[12px]' : 'px-3.5 py-2 text-[13px]',
              fullWidth && 'flex-1',
              variant === 'underline' && '-mb-px border-b-2 border-transparent hover:text-[#374151] data-[state=active]:border-[#1565F0] data-[state=active]:font-semibold data-[state=active]:text-[#1565F0]',
              variant === 'pills' && 'rounded-[7px] text-[#4B5563] hover:text-[#111827] data-[state=active]:bg-white data-[state=active]:font-semibold data-[state=active]:text-[#111827] data-[state=active]:shadow-sm',
              variant === 'enclosed' && '-mb-px rounded-t-lg border border-transparent hover:text-[#374151] data-[state=active]:border-[#E5E7EB] data-[state=active]:border-b-white data-[state=active]:bg-white data-[state=active]:font-semibold data-[state=active]:text-[#111827]',
            )}
          >
            {t.icon}
            {t.label}
            {t.count !== undefined && (
              <span className="rounded-full bg-[#F3F4F6] px-1.5 text-[11px] font-bold text-[#4B5563] group-data-[state=active]:bg-[#EBF3FF] group-data-[state=active]:text-[#1254C7]">{t.count}</span>
            )}
          </RTabs.Trigger>
        ))}
      </RTabs.List>
      {items.map((t) =>
        t.content !== undefined ? (
          <RTabs.Content key={t.value} value={t.value} className="pt-4 text-[13px] text-[#374151] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0] rounded">
            {t.content}
          </RTabs.Content>
        ) : null,
      )}
    </RTabs.Root>
  );
}
