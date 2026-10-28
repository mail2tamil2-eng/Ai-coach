import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../ui/utils';

export interface SectionCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: ReactNode;
  subtitle?: ReactNode;
  /** Right side of the header: helper text, AI button, badge. */
  action?: ReactNode;
  /** `eyebrow` renders the small uppercase heading used in side panels ("LIVE PREVIEW"). */
  variant?: 'default' | 'eyebrow';
  padding?: 'default' | 'compact' | 'none';
}

/** White bordered card that groups a form section or panel. */
export function SectionCard({ title, subtitle, action, variant = 'default', padding = 'default', className, children, ...props }: SectionCardProps) {
  return (
    <section
      className={cn(
        'rounded-xl border border-[#E5E7EB] bg-white',
        padding === 'default' && 'px-6 py-5',
        padding === 'compact' && 'p-3.5',
        className,
      )}
      {...props}
    >
      {(title || action) && (
        <header className={cn('flex items-start justify-between gap-3', variant === 'eyebrow' ? 'mb-2.5' : 'mb-3.5')}>
          <div>
            {title &&
              (variant === 'eyebrow' ? (
                <h2 className="m-0 text-[13px] font-semibold uppercase tracking-[0.07em] text-[#6B7280]">{title}</h2>
              ) : (
                <h2 className="m-0 text-sm font-bold text-[#111827]">{title}</h2>
              ))}
            {subtitle && <p className="mt-[3px] text-[13px] text-[#6B7280]">{subtitle}</p>}
          </div>
          {action && <div className="shrink-0 text-[13px] text-[#6B7280]">{action}</div>}
        </header>
      )}
      {children}
    </section>
  );
}
