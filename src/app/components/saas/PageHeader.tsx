import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { IconButton } from './IconButton';

export interface Crumb {
  label: string;
  onClick?: () => void;
}

export interface PageHeaderProps {
  title: string;
  /** Pill next to the title, e.g. <StatusBadge status="step">Step 1 of 2 · Course Details</StatusBadge>. */
  badge?: ReactNode;
  breadcrumbs?: Crumb[];
  onBack?: () => void;
  /** Right-aligned actions. */
  actions?: ReactNode;
}

export function PageHeader({ title, badge, breadcrumbs, onBack, actions }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <div className="mb-1.5 flex items-center gap-2.5">
          {onBack && <IconButton variant="outline" size="sm" label="Go back" icon={<ArrowLeft />} onClick={onBack} />}
          <h1 className="m-0 text-xl font-bold leading-tight text-[#111827]">{title}</h1>
          {badge}
        </div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className={onBack ? 'pl-10' : undefined}>
            <ol className="m-0 flex list-none items-center gap-[5px] p-0 text-[13px] text-[#6B7280]">
              {breadcrumbs.map((c, i) => {
                const last = i === breadcrumbs.length - 1;
                return (
                  <li key={c.label} className="flex items-center gap-[5px]">
                    {last ? (
                      <span aria-current="page" className="font-medium text-[#374151]">{c.label}</span>
                    ) : (
                      <button type="button" onClick={c.onClick} className="hover:text-[#374151] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0] rounded">
                        {c.label}
                      </button>
                    )}
                    {!last && <span aria-hidden>/</span>}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
      </div>
      {actions && <div className="flex items-center gap-2.5">{actions}</div>}
    </div>
  );
}
