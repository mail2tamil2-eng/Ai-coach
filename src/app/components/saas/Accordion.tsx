import type { ReactNode } from 'react';
import * as RAccordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../ui/utils';

export interface AccordionItemData {
  value: string;
  title: ReactNode;
  /** Small text on the right of the header (count, status). */
  meta?: ReactNode;
  icon?: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

type Base = {
  items: AccordionItemData[];
  /** `bordered` = one card with dividers, `separated` = a card per item (settings groups), `flush` = no borders (side panels). */
  variant?: 'bordered' | 'separated' | 'flush';
  className?: string;
};
export type AccordionProps =
  | (Base & { type?: 'single'; defaultValue?: string; collapsible?: boolean })
  | (Base & { type: 'multiple'; defaultValue?: string[] });

export function Accordion(props: AccordionProps) {
  const { items, variant = 'bordered', className } = props;
  const rootProps =
    props.type === 'multiple'
      ? ({ type: 'multiple', defaultValue: props.defaultValue } as const)
      : ({ type: 'single', defaultValue: props.defaultValue, collapsible: props.collapsible ?? true } as const);
  return (
    <RAccordion.Root
      {...rootProps}
      className={cn(
        variant === 'bordered' && 'divide-y divide-[#E5E7EB] overflow-hidden rounded-xl border border-[#E5E7EB] bg-white',
        variant === 'separated' && 'flex flex-col gap-2.5',
        variant === 'flush' && 'divide-y divide-[#F3F4F6]',
        className,
      )}
    >
      {items.map((it) => (
        <RAccordion.Item
          key={it.value}
          value={it.value}
          disabled={it.disabled}
          className={cn(variant === 'separated' && 'overflow-hidden rounded-xl border border-[#E5E7EB] bg-white')}
        >
          <RAccordion.Header className="m-0">
            <RAccordion.Trigger
              className={cn(
                'group flex w-full items-center gap-2.5 text-left transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1565F0]',
                'disabled:cursor-not-allowed disabled:opacity-50',
                variant === 'flush' ? 'pl-1 pr-3 py-3' : 'pl-4 pr-3 py-3.5 hover:bg-[#F9FAFB]',
              )}
            >
              {it.icon && <span className="text-[#6B7280] [&_svg]:size-4">{it.icon}</span>}
              <span className="flex-1 text-[13px] font-semibold text-[#111827]">{it.title}</span>
              {it.meta && <span className="text-[12px] text-[#6B7280]">{it.meta}</span>}
              <ChevronDown aria-hidden className="size-4 text-[#6B7280] transition-transform duration-200 group-data-[state=open]:rotate-180 motion-reduce:transition-none" />
            </RAccordion.Trigger>
          </RAccordion.Header>
          <RAccordion.Content className="overflow-hidden text-[13px] text-[#374151] data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div className={variant === 'flush' ? 'px-1 pb-3' : 'px-4 pb-4'}>{it.content}</div>
          </RAccordion.Content>
        </RAccordion.Item>
      ))}
    </RAccordion.Root>
  );
}
