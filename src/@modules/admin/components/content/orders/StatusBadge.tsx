import { PAYMENT_STATUS_CONFIG, STATUS_CONFIG } from "@/src/@libs/utils/utils";
import { OrderStatus, PaymentStatus } from "@/src/@modules/order/libs/interface";


interface StatusBadgeProps {
  status: OrderStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cfg.badge}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

interface PaymentBadgeProps {
  status: PaymentStatus;
}

export function PaymentBadge({ status }: PaymentBadgeProps) {
  const cfg = PAYMENT_STATUS_CONFIG[status] ?? PAYMENT_STATUS_CONFIG.pending;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${cfg.badge}`}
    >
      {cfg.label}
    </span>
  );
}
