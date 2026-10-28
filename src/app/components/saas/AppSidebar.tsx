import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { ChevronDown, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { cn } from '../ui/utils';

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  /** Count badge (e.g. drafts). */
  badge?: number;
  disabled?: boolean;
  /** Optional sub-items — renders a collapsible dropdown inside the sidebar. */
  children?: Omit<NavItem, 'children' | 'icon'>[];
}

export interface NavGroup {
  /** Optional small uppercase heading (hidden when collapsed). */
  title?: string;
  items: NavItem[];
}

export interface AppSidebarProps {
  groups: NavGroup[];
  activeId: string;
  onNavigate?: (id: string) => void;
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
  /** Full logo shown when expanded. */
  logo?: ReactNode;
  /** Square mark shown when collapsed. */
  logoMark?: ReactNode;
  footer?: ReactNode;
  footerCollapsed?: ReactNode;
  className?: string;
}

function NavItemRow({
  item, activeId, onNavigate, collapsed,
}: {
  item: NavItem;
  activeId: string;
  onNavigate?: (id: string) => void;
  collapsed: boolean;
}) {
  const hasChildren = !!item.children?.length;
  const isChildActive = item.children?.some(c => c.id === activeId) ?? false;
  const [open, setOpen] = useState(isChildActive);

  const active = item.id === activeId || isChildActive;
  const Icon = item.icon;

  const handleClick = () => {
    if (hasChildren && !collapsed) {
      setOpen(v => !v);
    } else {
      onNavigate?.(item.id);
    }
  };

  return (
    <li className="group/item relative">
      <button
        type="button"
        disabled={item.disabled}
        aria-current={item.id === activeId ? 'page' : undefined}
        aria-expanded={hasChildren ? open : undefined}
        aria-label={collapsed ? item.label : undefined}
        onClick={handleClick}
        className={cn(
          'flex min-h-12 w-full items-center rounded-[10px] py-2 text-left transition-colors duration-100',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          collapsed ? 'justify-center px-0' : 'gap-2.5 pl-2.5 pr-2.5',
          active ? 'bg-[#FFF3E5]' : 'hover:bg-[#F9FAFB]',
        )}
      >
        <span className={cn('relative flex size-[34px] shrink-0 items-center justify-center rounded-[9px] transition-colors', active ? 'bg-[#F97316]' : 'bg-[#F3F4F6]')}>
          <Icon className={cn('size-[17px]', active ? 'text-white' : 'text-[#6B7280]')} />
          {collapsed && !!item.badge && <span aria-hidden className="absolute -right-1 -top-1 size-2.5 rounded-full border-2 border-white bg-[#1565F0]" />}
        </span>

        {!collapsed && (
          <>
            <span className={cn('flex-1 text-[13px] leading-snug', active ? 'font-semibold text-[#C2410C]' : 'font-medium text-[#6B7280]')}>
              {item.label}
            </span>

            {/* Badge OR dropdown chevron on the right — both get consistent right breathing room */}
            {!!item.badge && !hasChildren && (
              <span className="mr-0.5 rounded-full bg-[#EBF3FF] px-1.5 text-[11px] font-bold text-[#1565F0]" aria-label={`${item.badge} items`}>
                {item.badge}
              </span>
            )}
            {hasChildren && (
              <ChevronDown
                className={cn('mr-0.5 size-[15px] shrink-0 text-[#9CA3AF] transition-transform duration-200', open && 'rotate-180')}
                aria-hidden
              />
            )}
          </>
        )}
      </button>

      {/* Sub-items dropdown — only when expanded and open */}
      {!collapsed && hasChildren && open && (
        <ul className="mt-0.5 flex list-none flex-col gap-0.5 p-0 pl-[46px] pr-1">
          {item.children!.map(child => {
            const childActive = child.id === activeId;
            return (
              <li key={child.id}>
                <button
                  type="button"
                  disabled={child.disabled}
                  aria-current={childActive ? 'page' : undefined}
                  onClick={() => onNavigate?.(child.id)}
                  className={cn(
                    'flex min-h-9 w-full items-center rounded-lg py-1.5 pl-3 pr-2.5 text-left transition-colors duration-100',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]',
                    'disabled:cursor-not-allowed disabled:opacity-40',
                    childActive ? 'bg-[#FFF3E5] font-semibold text-[#C2410C]' : 'font-medium text-[#6B7280] hover:bg-[#F9FAFB]',
                  )}
                  style={{ fontSize: 13 }}
                >
                  <span className="flex-1 leading-snug">{child.label}</span>
                  {!!child.badge && (
                    <span className="rounded-full bg-[#EBF3FF] px-1.5 text-[11px] font-bold text-[#1565F0]">
                      {child.badge}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {/* Tooltip — collapsed state only */}
      {collapsed && (
        <span
          role="tooltip"
          className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 z-[100] -translate-y-1/2 whitespace-nowrap rounded-md bg-[#1F2937] px-2.5 py-[5px] text-[13px] font-medium text-white opacity-0 shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-opacity group-hover/item:opacity-100 group-focus-within/item:opacity-100"
        >
          {item.label}
        </span>
      )}
    </li>
  );
}

/** Left navigation: 220px expanded / 64px collapsed, orange active state. Position it yourself. */
export function AppSidebar({
  groups, activeId, onNavigate, collapsed = false, onToggleCollapsed, logo, logoMark, footer, footerCollapsed, className,
}: AppSidebarProps) {
  return (
    <aside
      className={cn('relative flex h-full flex-col border-r border-gray-100 bg-white shadow-sm transition-[width] duration-200', collapsed ? 'w-16' : 'w-[220px]', className)}
      aria-label="Main navigation"
    >
      {/* ── Logo header ────────────────────────────────────────────────────── */}
      {collapsed && onToggleCollapsed ? (
        /* Collapsed — entire header is a hover-to-expand button (ChatGPT style) */
        <button
          type="button"
          onClick={onToggleCollapsed}
          aria-label="Expand navigation"
          title="Expand navigation"
          className="group/logo flex h-20 shrink-0 items-center justify-center border-b border-gray-100 px-3 transition-colors hover:bg-[#F9FAFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1565F0]"
        >
          <span className="relative flex items-center justify-center">
            {/* Logo mark — fades out on hover */}
            <span className="transition-opacity duration-150 group-hover/logo:opacity-0">
              {logoMark ?? logo}
            </span>
            {/* PanelLeftOpen — fades in on hover, pill matches the expanded PanelLeftClose button */}
            <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-150 group-hover/logo:opacity-100">
              <span className="flex size-8 items-center justify-center rounded-lg bg-transparent transition-colors group-hover/logo:bg-gray-100">
                <PanelLeftOpen className="size-[18px] text-gray-500" />
              </span>
            </span>
          </span>
        </button>
      ) : (
        /* Expanded — logo on the left, PanelLeftClose button on the right */
        <div className="flex h-20 shrink-0 items-center border-b border-gray-100 pl-5 pr-3">
          <div className="flex-1 overflow-hidden">{logo}</div>
          {onToggleCollapsed && (
            <button
              type="button"
              onClick={onToggleCollapsed}
              aria-label="Collapse navigation"
              title="Collapse navigation"
              className="ml-1 flex size-8 shrink-0 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]"
            >
              <PanelLeftClose className="size-[18px]" />
            </button>
          )}
        </div>
      )}

      {/* ── Navigation ──────────────────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto px-2.5 pt-3">
        {groups.map((g, gi) => (
          <div key={g.title ?? gi} className={cn(gi > 0 && 'mt-4')}>
            {g.title && !collapsed && (
              <p className="mb-1.5 px-2.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-gray-500">
                {g.title}
              </p>
            )}
            {g.title && collapsed && gi > 0 && <hr className="mx-2 mb-2 border-gray-100" />}
            <ul className="m-0 flex list-none flex-col gap-1 p-0">
              {g.items.map(item => (
                <NavItemRow
                  key={item.id}
                  item={item}
                  activeId={activeId}
                  onNavigate={onNavigate}
                  collapsed={collapsed}
                />
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      {(footer || footerCollapsed) && (
        <div className="shrink-0 border-t border-gray-100 py-2.5 text-center text-[13px] text-[#6B7280]">
          {collapsed ? footerCollapsed ?? footer : footer}
        </div>
      )}
    </aside>
  );
}
