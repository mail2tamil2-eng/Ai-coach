import type { ReactNode } from 'react';
import * as Menu from '@radix-ui/react-dropdown-menu';
import { Check } from 'lucide-react';
import { cn } from '../ui/utils';

export type MenuEntry =
  | { type?: 'item'; label: string; icon?: ReactNode; shortcut?: string; onSelect?: () => void; destructive?: boolean; disabled?: boolean }
  | { type: 'checkbox'; label: string; checked: boolean; onCheckedChange: (v: boolean) => void }
  | { type: 'separator' }
  | { type: 'label'; label: string };

export interface DropdownMenuProps {
  trigger: ReactNode;
  items: MenuEntry[];
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'bottom' | 'left' | 'right';
  /** Controlled open state (optional). */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Modal menus hide the rest of the page from screen readers while open (default). */
  modal?: boolean;
}

const itemCls =
  'relative flex cursor-pointer select-none items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] text-[#374151] outline-none ' +
  'data-[highlighted]:bg-[#F3F4F6] data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-4 [&_svg]:text-[#6B7280]';

/** "More" (⋯) menus, user menu, row actions. Arrow keys, typeahead, Esc. */
export function DropdownMenu({ trigger, items, align = 'end', side = 'bottom', open, onOpenChange, modal = true }: DropdownMenuProps) {
  return (
    <Menu.Root open={open} onOpenChange={onOpenChange} modal={modal}>
      <Menu.Trigger asChild>{trigger}</Menu.Trigger>
      <Menu.Portal>
        <Menu.Content
          align={align}
          side={side}
          sideOffset={6}
          className="z-50 min-w-[200px] rounded-xl border border-[#E5E7EB] bg-white p-1.5 shadow-[0_12px_32px_rgba(15,23,42,0.12)] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
          style={{ fontFamily: 'Nunito Sans, system-ui, sans-serif' }}
        >
          {items.map((it, i) => {
            if (it.type === 'separator') return <Menu.Separator key={i} className="my-1 h-px bg-[#F3F4F6]" />;
            if (it.type === 'label') return <Menu.Label key={i} className="px-2.5 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.07em] text-[#6B7280]">{it.label}</Menu.Label>;
            if (it.type === 'checkbox')
              return (
                <Menu.CheckboxItem key={i} checked={it.checked} onCheckedChange={it.onCheckedChange} className={cn(itemCls, 'pl-8')}>
                  <Menu.ItemIndicator className="absolute left-2.5"><Check className="!text-[#1565F0]" /></Menu.ItemIndicator>
                  {it.label}
                </Menu.CheckboxItem>
              );
            return (
              <Menu.Item
                key={i}
                disabled={it.disabled}
                onSelect={it.onSelect}
                className={cn(itemCls, it.destructive && 'text-[#B91C1C] data-[highlighted]:bg-red-50 [&_svg]:!text-[#B91C1C]')}
              >
                {it.icon}
                <span className="flex-1">{it.label}</span>
                {it.shortcut && <span className="text-[11px] tracking-wider text-[#6B7280]">{it.shortcut}</span>}
              </Menu.Item>
            );
          })}
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
}
