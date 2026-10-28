import type { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { cn } from '../ui/utils';
import { Button } from './Button';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ModalTone = 'default' | 'info' | 'success' | 'warning' | 'danger';

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: ReactNode;
  size?: ModalSize;
  /** Shows a coloured icon next to the title. */
  tone?: ModalTone;
  footer?: ReactNode;
  children?: ReactNode;
  /** Hide the × button (e.g. blocking progress dialogs). */
  hideClose?: boolean;
  /** Element rendered as the trigger (optional when controlled). */
  trigger?: ReactNode;
}

const widths: Record<ModalSize, string> = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl', full: 'max-w-[calc(100vw-48px)] h-[calc(100vh-48px)]' };
const toneIcon: Record<Exclude<ModalTone, 'default'>, { icon: ReactNode; bg: string }> = {
  info: { icon: <Info className="size-5 text-[#1565F0]" />, bg: 'bg-[#EBF3FF]' },
  success: { icon: <CheckCircle2 className="size-5 text-green-700" />, bg: 'bg-green-50' },
  warning: { icon: <AlertTriangle className="size-5 text-amber-700" />, bg: 'bg-amber-50' },
  danger: { icon: <XCircle className="size-5 text-red-700" />, bg: 'bg-red-50' },
};

/** Popup dialog (Radix) styled like CreateCourseModal: focus trap, Esc to close, scroll lock. */
export function Modal({ open, onOpenChange, title, description, size = 'md', tone = 'default', footer, children, hideClose, trigger }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-50 flex max-h-[85vh] w-[calc(100%-32px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 motion-reduce:animate-none',
            'focus:outline-none',
            widths[size],
          )}
          style={{ fontFamily: 'Nunito Sans, system-ui, sans-serif' }}
        >
          <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-6 py-5">
            <div className="flex items-start gap-3">
              {tone !== 'default' && <span className={cn('flex size-10 shrink-0 items-center justify-center rounded-full', toneIcon[tone].bg)}>{toneIcon[tone].icon}</span>}
              <div>
                <Dialog.Title className="m-0 text-xl font-semibold text-gray-900">{title}</Dialog.Title>
                {description ? (
                  <Dialog.Description className="mt-0.5 text-sm text-gray-500">{description}</Dialog.Description>
                ) : (
                  <Dialog.Description className="sr-only">{title}</Dialog.Description>
                )}
              </div>
            </div>
            {!hideClose && (
              <Dialog.Close className="rounded-lg p-2 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]" aria-label="Close">
                <X className="size-5 text-gray-500" />
              </Dialog.Close>
            )}
          </div>
          {children && <div className="flex-1 overflow-y-auto px-6 py-5 text-sm text-gray-700">{children}</div>}
          {footer && <div className="flex items-center justify-end gap-2.5 border-t border-gray-100 bg-gray-50/60 px-6 py-4">{footer}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: 'danger' | 'warning' | 'info';
  loading?: boolean;
  onConfirm: () => void;
}

/** Yes/no popup, e.g. "Delete this course?". */
export function ConfirmDialog({ open, onOpenChange, title, description, confirmLabel = 'Confirm', cancelLabel = 'Cancel', tone = 'danger', loading, onConfirm }: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      size="sm"
      tone={tone}
      footer={
        <>
          <Button variant="secondary" onClick={() => onOpenChange(false)} disabled={loading}>{cancelLabel}</Button>
          <Button variant={tone === 'danger' ? 'danger' : 'primary'} onClick={onConfirm} loading={loading}>{confirmLabel}</Button>
        </>
      }
    />
  );
}
