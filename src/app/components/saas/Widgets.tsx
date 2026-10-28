import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { ArrowDownRight, ArrowUpRight, Inbox, Minus } from 'lucide-react';
import { cn } from '../ui/utils';

const card = 'rounded-2xl border border-gray-100 bg-white p-6 shadow-sm';

/* ── StatWidget ─────────────────────────────────────────────────────────── */

export type WidgetTone = 'blue' | 'amber' | 'pink' | 'green' | 'orange' | 'violet';
const toneCls: Record<WidgetTone, string> = {
  blue: 'bg-blue-50 text-blue-700',
  amber: 'bg-amber-50 text-amber-700',
  pink: 'bg-pink-50 text-pink-700',
  green: 'bg-green-50 text-green-700',
  orange: 'bg-orange-50 text-orange-700',
  violet: 'bg-violet-50 text-violet-700',
};

export interface StatWidgetProps {
  label: string;
  value: ReactNode;
  icon?: LucideIcon;
  tone?: WidgetTone;
  /** Helper line under the value ("47 available license"). */
  hint?: ReactNode;
  /** Change vs previous period, e.g. 12 → "+12%". */
  trend?: number;
  trendLabel?: string;
  loading?: boolean;
  className?: string;
}

/** Dashboard KPI card ("Total Course Created"). */
export function StatWidget({ label, value, icon: Icon, tone = 'blue', hint, trend, trendLabel = 'vs last month', loading, className }: StatWidgetProps) {
  const TrendIcon = trend === undefined ? null : trend > 0 ? ArrowUpRight : trend < 0 ? ArrowDownRight : Minus;
  return (
    <div className={cn(card, 'transition-shadow hover:shadow-md', className)} aria-busy={loading || undefined}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="mb-2 text-sm font-medium text-gray-600">{label}</p>
          {loading ? <div className="h-8 w-16 animate-pulse rounded bg-gray-100" /> : <p className="m-0 text-3xl font-bold text-gray-800">{value}</p>}
          {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
          {TrendIcon && !loading && (
            <p className={cn('mt-2 inline-flex items-center gap-1 text-xs font-semibold', trend! > 0 ? 'text-green-700' : trend! < 0 ? 'text-red-700' : 'text-gray-600')}>
              <TrendIcon aria-hidden className="size-3.5" />
              {trend! > 0 ? '+' : ''}{trend}% <span className="font-normal text-gray-500">{trendLabel}</span>
            </p>
          )}
        </div>
        {Icon && (
          <span className={cn('rounded-xl p-3', toneCls[tone])}>
            <Icon aria-hidden className="size-6" />
          </span>
        )}
      </div>
    </div>
  );
}

/* ── ProgressBar / ProgressWidget ───────────────────────────────────────── */

export interface ProgressBarProps {
  value: number;
  max?: number;
  label: string;
  showValue?: boolean;
  tone?: 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
}

const barTone = { primary: 'bg-[#1565F0]', success: 'bg-green-700', warning: 'bg-[#B45309]', danger: 'bg-red-600' };

export function ProgressBar({ value, max = 100, label, showValue = true, tone = 'primary', size = 'md' }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-[13px]">
        <span className="font-medium text-[#374151]">{label}</span>
        {showValue && <span className="font-semibold text-[#111827]">{Math.round(pct)}%</span>}
      </div>
      <div role="progressbar" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} className={cn('w-full overflow-hidden rounded-full bg-[#F3F4F6]', size === 'sm' ? 'h-1.5' : 'h-2.5')}>
        <div className={cn('h-full rounded-full transition-[width] duration-500', barTone[tone])} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export interface ProgressWidgetProps {
  title: string;
  used: number;
  total: number;
  unit?: string;
  footer?: ReactNode;
  className?: string;
}

/** Licence usage card. Turns amber at 80% and red at 100%. */
export function ProgressWidget({ title, used, total, unit = 'licenses', footer, className }: ProgressWidgetProps) {
  const pct = total ? (used / total) * 100 : 0;
  const tone = pct >= 100 ? 'danger' : pct >= 80 ? 'warning' : 'primary';
  return (
    <div className={cn(card, className)}>
      <h3 className="m-0 mb-1 text-lg font-bold text-gray-800">{title}</h3>
      <p className="mb-4 text-sm text-gray-600">
        <b className="text-gray-900">{used}</b> of {total} {unit} used · <b className="text-gray-900">{Math.max(0, total - used)}</b> available
      </p>
      <ProgressBar value={used} max={total} label={`${title} used`} tone={tone} />
      {pct >= 80 && (
        <p className={cn('mt-3 text-[13px] font-medium', pct >= 100 ? 'text-red-700' : 'text-amber-700')} role="status">
          {pct >= 100 ? 'No licences left — contact your administrator.' : 'You are close to your licence limit.'}
        </p>
      )}
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
}

/* ── ActivityList ───────────────────────────────────────────────────────── */

export interface ActivityItem {
  id: string;
  title: ReactNode;
  meta: ReactNode;
  icon?: LucideIcon;
  tone?: WidgetTone;
  action?: ReactNode;
}

export function ActivityList({ title, items, action, className }: { title: string; items: ActivityItem[]; action?: ReactNode; className?: string }) {
  return (
    <div className={cn(card, className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="m-0 text-lg font-bold text-gray-800">{title}</h3>
        {action}
      </div>
      {items.length === 0 ? (
        <EmptyState compact title="No activity yet" />
      ) : (
        <ul className="m-0 flex list-none flex-col gap-4 p-0">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <li key={it.id} className="flex items-start gap-3">
                {Icon && <span className={cn('rounded-lg p-2', toneCls[it.tone ?? 'blue'])}><Icon aria-hidden className="size-4" /></span>}
                <div className="min-w-0 flex-1">
                  <p className="m-0 truncate text-sm font-semibold text-gray-800">{it.title}</p>
                  <p className="m-0 text-xs text-gray-500">{it.meta}</p>
                </div>
                {it.action}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ── EmptyState ─────────────────────────────────────────────────────────── */

export interface EmptyStateProps {
  title: string;
  description?: ReactNode;
  icon?: LucideIcon;
  action?: ReactNode;
  compact?: boolean;
}

export function EmptyState({ title, description, icon: Icon = Inbox, action, compact }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center text-center', compact ? 'py-6' : 'py-12')}>
      <span className="mb-3 flex size-12 items-center justify-center rounded-full bg-[#F3F4F6]">
        <Icon aria-hidden className="size-6 text-[#6B7280]" />
      </span>
      <p className="m-0 text-sm font-semibold text-[#111827]">{title}</p>
      {description && <p className="mt-1 max-w-sm text-[13px] text-[#6B7280]">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
