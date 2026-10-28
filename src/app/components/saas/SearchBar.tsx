import { forwardRef, useState, type InputHTMLAttributes } from 'react';
import { Loader2, Search, X } from 'lucide-react';
import { cn } from '../ui/utils';

export interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /** `filled` = header search (grey bg), `outline` = table/toolbar search. */
  variant?: 'filled' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Fired on Enter. */
  onSearch?: (value: string) => void;
  loading?: boolean;
  /** Keyboard hint shown on the right, e.g. "⌘K". */
  shortcut?: string;
  /** Accessible name; defaults to the placeholder. */
  label?: string;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(function SearchBar(
  { variant = 'outline', size = 'md', value, defaultValue = '', onChange, onSearch, loading, shortcut, label, placeholder = 'Search…', className, disabled, ...props },
  ref,
) {
  const [inner, setInner] = useState(defaultValue);
  const v = value ?? inner;
  const set = (next: string) => {
    if (value === undefined) setInner(next);
    onChange?.(next);
  };
  return (
    <div role="search" className={cn('relative', className)}>
      <Search aria-hidden className={cn('pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500', size === 'sm' ? 'size-3.5' : 'size-4')} />
      <input
        ref={ref}
        type="search"
        aria-label={label ?? placeholder}
        placeholder={placeholder}
        value={v}
        disabled={disabled}
        onChange={(e) => set(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSearch?.(v);
          if (e.key === 'Escape' && v) set('');
        }}
        className={cn(
          'w-full text-sm text-gray-900 outline-none transition-all placeholder:text-gray-500 [&::-webkit-search-cancel-button]:hidden',
          'disabled:cursor-not-allowed disabled:opacity-60',
          size === 'sm' && 'h-8 rounded-lg pl-9 pr-8 text-[13px]',
          size === 'md' && 'h-10 rounded-xl pl-10 pr-10',
          size === 'lg' && 'h-12 rounded-xl pl-10 pr-10 text-[15px]',
          variant === 'filled'
            ? 'border border-[#6B7280] bg-gray-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
            : 'border border-[#6B7280] bg-white focus:border-[#1565F0] focus:shadow-[0_0_0_3px_rgba(21,101,240,0.12)]',
        )}
        {...props}
      />
      <div className="absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center gap-1">
        {loading && <Loader2 aria-label="Searching" className="size-4 animate-spin text-gray-400" />}
        {!loading && v && (
          <button type="button" aria-label="Clear search" onClick={() => set('')} className="flex size-6 items-center justify-center rounded text-gray-500 hover:text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]">
            <X className="size-3.5" />
          </button>
        )}
        {!loading && !v && shortcut && (
          <kbd className="rounded border border-gray-200 bg-white px-1.5 py-0.5 font-sans text-[11px] text-gray-500">{shortcut}</kbd>
        )}
      </div>
    </div>
  );
});
