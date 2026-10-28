import type { ReactNode } from 'react';
import { Toaster as Sonner, toast as sonnerToast } from 'sonner';
import type { ComponentProps } from 'react';
type ToasterProps = ComponentProps<typeof Sonner>;
import { AlertTriangle, CheckCircle2, Info, Loader2, XCircle } from 'lucide-react';

/** Mount once near the app root (App.tsx already mounts ui/sonner's Toaster). */
export function AppToaster(props: ToasterProps) {
  return (
    <Sonner
      position="top-right"
      closeButton
      icons={{
        success: <CheckCircle2 className="size-[18px] text-green-700" />,
        error: <XCircle className="size-[18px] text-red-700" />,
        warning: <AlertTriangle className="size-[18px] text-amber-700" />,
        info: <Info className="size-[18px] text-[#1565F0]" />,
        loading: <Loader2 className="size-[18px] animate-spin text-[#1565F0]" />,
      }}
      toastOptions={{
        classNames: {
          toast: 'rounded-xl border border-[#E5E7EB] bg-white shadow-lg font-[Nunito_Sans,system-ui,sans-serif] gap-3 !items-start',
          title: 'text-[13px] font-semibold text-[#111827]',
          description: 'text-[13px] !text-[#6B7280]',
          actionButton: '!bg-[#1565F0] !text-white !rounded-[7px] !font-semibold',
          cancelButton: '!bg-white !text-[#374151] !border !border-[#E5E7EB] !rounded-[7px]',
          closeButton: '!bg-white !border-[#E5E7EB] !text-[#6B7280]',
          success: '!border-l-4 !border-l-green-600',
          error: '!border-l-4 !border-l-red-600',
          warning: '!border-l-4 !border-l-amber-500',
          info: '!border-l-4 !border-l-[#1565F0]',
        },
      }}
      {...props}
    />
  );
}

type Opts = { description?: ReactNode; action?: { label: string; onClick: () => void }; duration?: number };

/** App-wide notifications. Keep titles short; put detail in `description`. */
export const notify = {
  success: (title: string, o?: Opts) => sonnerToast.success(title, o),
  error: (title: string, o?: Opts) => sonnerToast.error(title, o),
  warning: (title: string, o?: Opts) => sonnerToast.warning(title, o),
  info: (title: string, o?: Opts) => sonnerToast.info(title, o),
  loading: (title: string, o?: Opts) => sonnerToast.loading(title, o),
  promise: sonnerToast.promise,
  dismiss: sonnerToast.dismiss,
};
