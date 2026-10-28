import type { ReactNode } from 'react';
import * as RTooltip from '@radix-ui/react-tooltip';

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** `dark` = default (sidebar tooltips), `light` = rich content. */
  tone?: 'dark' | 'light';
  delayDuration?: number;
  open?: boolean;
}

/** Shows on hover and keyboard focus. Never put essential info only in a tooltip. */
export function Tooltip({ content, children, side = 'top', tone = 'dark', delayDuration = 200, open }: TooltipProps) {
  return (
    <RTooltip.Provider delayDuration={delayDuration}>
      <RTooltip.Root open={open}>
        <RTooltip.Trigger asChild>{children}</RTooltip.Trigger>
        <RTooltip.Portal>
          <RTooltip.Content
            side={side}
            sideOffset={8}
            className={
              tone === 'dark'
                ? 'z-[100] max-w-xs rounded-md bg-[#1F2937] px-2.5 py-[5px] text-[13px] font-medium text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]'
                : 'z-[100] max-w-xs rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-[13px] text-[#374151] shadow-[0_4px_12px_rgba(15,23,42,0.08)]'
            }
            style={{ fontFamily: 'Nunito Sans, system-ui, sans-serif' }}
          >
            {content}
            <RTooltip.Arrow className={tone === 'dark' ? 'fill-[#1F2937]' : 'fill-white'} />
          </RTooltip.Content>
        </RTooltip.Portal>
      </RTooltip.Root>
    </RTooltip.Provider>
  );
}
