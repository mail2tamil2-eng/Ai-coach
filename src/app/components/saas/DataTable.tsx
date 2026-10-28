import type { ReactNode } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { cn } from '../ui/utils';
import { Checkbox } from './Checkbox';
import { EmptyState } from './Widgets';

export interface Column<T> {
  key: string;
  header: string;
  /** Cell renderer; defaults to `row[key]`. */
  cell?: (row: T, index: number) => ReactNode;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
}

export type SortState = { key: string; direction: 'asc' | 'desc' } | null;

export interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string | number;
  /** Card title row above the table (as on the Dashboard: "Recent Courses"). */
  title?: ReactNode;
  subtitle?: ReactNode;
  toolbar?: ReactNode;
  footer?: ReactNode;
  sort?: SortState;
  onSortChange?: (sort: SortState) => void;
  /** Enables row checkboxes. */
  selectedKeys?: (string | number)[];
  onSelectionChange?: (keys: (string | number)[]) => void;
  loading?: boolean;
  loadingRows?: number;
  empty?: ReactNode;
  density?: 'comfortable' | 'compact';
  striped?: boolean;
  onRowClick?: (row: T) => void;
  caption?: string;
}

/** Course-list style table inside a rounded card. */
export function DataTable<T>({
  columns, rows, rowKey, title, subtitle, toolbar, footer, sort, onSortChange, selectedKeys, onSelectionChange,
  loading, loadingRows = 5, empty, density = 'comfortable', striped, onRowClick, caption,
}: DataTableProps<T>) {
  const selectable = !!onSelectionChange;
  const sel = new Set(selectedKeys ?? []);
  const allKeys = rows.map(rowKey);
  const allSelected = allKeys.length > 0 && allKeys.every((k) => sel.has(k));
  const someSelected = !allSelected && allKeys.some((k) => sel.has(k));
  const pad = density === 'compact' ? 'px-4 py-2.5' : 'px-6 py-4';

  const toggleSort = (key: string) => {
    if (!onSortChange) return;
    if (sort?.key !== key) onSortChange({ key, direction: 'asc' });
    else if (sort.direction === 'asc') onSortChange({ key, direction: 'desc' });
    else onSortChange(null);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {(title || toolbar) && (
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5">
          <div>
            {title && <h2 className="m-0 text-xl font-bold text-gray-800">{title}</h2>}
            {subtitle && <p className="mt-0.5 text-sm text-gray-500">{subtitle}</p>}
          </div>
          {toolbar && <div className="flex items-center gap-2">{toolbar}</div>}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse" aria-busy={loading || undefined}>
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead>
            <tr className="border-y border-gray-100 bg-gray-50">
              {selectable && (
                <th className={cn(pad, 'w-10')}>
                  <Checkbox
                    label="Select all rows"
                    className="[&>span:last-child]:sr-only"
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={(c) => onSelectionChange!(c ? allKeys : [])}
                  />
                </th>
              )}
              {columns.map((c) => {
                const active = sort?.key === c.key;
                return (
                  <th
                    key={c.key}
                    scope="col"
                    style={{ width: c.width }}
                    aria-sort={active ? (sort!.direction === 'asc' ? 'ascending' : 'descending') : c.sortable ? 'none' : undefined}
                    className={cn(pad, 'whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-gray-500', c.align === 'right' ? 'text-right' : c.align === 'center' ? 'text-center' : 'text-left')}
                  >
                    {c.sortable && onSortChange ? (
                      <button type="button" onClick={() => toggleSort(c.key)} className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0] rounded">
                        {c.header}
                        {active ? (sort!.direction === 'asc' ? <ArrowUp className="size-3.5" /> : <ArrowDown className="size-3.5" />) : <ArrowUpDown className="size-3.5 opacity-50" />}
                      </button>
                    ) : (
                      c.header
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: loadingRows }, (_, i) => (
                  <tr key={i} className="border-b border-gray-100 last:border-0">
                    {selectable && <td className={pad}><div className="size-4 animate-pulse rounded bg-gray-100" /></td>}
                    {columns.map((c) => (
                      <td key={c.key} className={pad}><div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" /></td>
                    ))}
                  </tr>
                ))
              : rows.length === 0
                ? (
                    <tr>
                      <td colSpan={columns.length + (selectable ? 1 : 0)}>{empty ?? <EmptyState title="No results" description="Try a different search or filter." />}</td>
                    </tr>
                  )
                : rows.map((row, i) => {
                    const k = rowKey(row);
                    const isSel = sel.has(k);
                    return (
                      <tr
                        key={k}
                        onClick={onRowClick ? () => onRowClick(row) : undefined}
                        aria-selected={selectable ? isSel : undefined}
                        className={cn(
                          'border-b border-gray-100 transition-colors last:border-0',
                          isSel ? 'bg-[#EBF3FF]/60' : striped && i % 2 === 1 ? 'bg-gray-50/60' : 'hover:bg-gray-50/80',
                          onRowClick && 'cursor-pointer',
                        )}
                      >
                        {selectable && (
                          <td className={pad} onClick={(e) => e.stopPropagation()}>
                            <Checkbox
                              label={`Select row ${i + 1}`}
                              className="[&>span:last-child]:sr-only"
                              checked={isSel}
                              onChange={(c) => onSelectionChange!(c ? [...sel, k] : [...sel].filter((x) => x !== k))}
                            />
                          </td>
                        )}
                        {columns.map((c) => (
                          <td key={c.key} className={cn(pad, 'text-sm text-gray-700', c.align === 'right' ? 'text-right' : c.align === 'center' ? 'text-center' : 'text-left')}>
                            {c.cell ? c.cell(row, i) : String((row as Record<string, unknown>)[c.key] ?? '')}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
          </tbody>
        </table>
      </div>
      {footer && <div className="border-t border-gray-100 px-6 py-4">{footer}</div>}
    </div>
  );
}
