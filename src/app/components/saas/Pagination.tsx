import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../ui/utils';

export interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  /** Noun in the summary: "Showing 1 to 10 of 42 courses". */
  itemLabel?: string;
  /** `compact` = arrows + "Page x of y" only. */
  variant?: 'full' | 'compact';
  className?: string;
}

/** 1 … 4 5 6 … 20 */
export function pageRange(page: number, totalPages: number, siblings = 1): (number | '…')[] {
  const range: (number | '…')[] = [];
  const start = Math.max(2, page - siblings);
  const end = Math.min(totalPages - 1, page + siblings);
  range.push(1);
  if (start > 2) range.push('…');
  for (let i = start; i <= end; i++) range.push(i);
  if (end < totalPages - 1) range.push('…');
  if (totalPages > 1) range.push(totalPages);
  return range;
}

const arrow =
  'rounded-lg border border-gray-200 p-2 text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]';

export function Pagination({
  page, pageSize, total, onPageChange, onPageSizeChange, pageSizeOptions = [5, 10, 20, 50], itemLabel = 'items', variant = 'full', className,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  return (
    <nav aria-label="Pagination" className={cn('flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600', className)}>
      {variant === 'full' ? (
        <div className="flex items-center gap-4">
          {onPageSizeChange && (
            <label className="flex items-center gap-2">
              Show
              <select
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                className="min-w-[72px] cursor-pointer rounded-lg border border-[#6B7280] bg-white px-3 py-2 text-sm text-gray-700 outline-none hover:bg-gray-50 focus:border-[#1565F0]"
              >
                {pageSizeOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </label>
          )}
          <p className="m-0" aria-live="polite">
            Showing <span className="font-medium">{from}</span> to <span className="font-medium">{to}</span> of <span className="font-medium">{total}</span> {itemLabel}
          </p>
        </div>
      ) : (
        <span />
      )}
      <div className="flex items-center gap-2">
        <button type="button" className={arrow} disabled={page <= 1} onClick={() => onPageChange(page - 1)} aria-label="Previous page">
          <ChevronLeft className="size-4" />
        </button>
        {variant === 'full' ? (
          <ul className="m-0 flex list-none items-center gap-1 p-0">
            {pageRange(page, totalPages).map((p, i) =>
              p === '…' ? (
                <li key={`e${i}`} aria-hidden className="px-2 text-gray-400">…</li>
              ) : (
                <li key={p}>
                  <button
                    type="button"
                    aria-current={p === page ? 'page' : undefined}
                    aria-label={`Page ${p}`}
                    onClick={() => onPageChange(p)}
                    className={cn(
                      'min-w-8 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]',
                      p === page ? 'bg-[#1565F0] text-white' : 'text-gray-600 hover:bg-gray-100',
                    )}
                  >
                    {p}
                  </button>
                </li>
              ),
            )}
          </ul>
        ) : (
          <span className="px-2" aria-live="polite">Page <b className="font-semibold text-gray-900">{page}</b> of {totalPages}</span>
        )}
        <button type="button" className={arrow} disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} aria-label="Next page">
          <ChevronRight className="size-4" />
        </button>
      </div>
    </nav>
  );
}
