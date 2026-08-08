import { memo } from 'react';
import { useApp } from '../../core/providers/AppContext';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export const Toast = memo(function Toast() {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="toast-container" role="alert" aria-live="polite">
      <div className={`toast toast-${toast.type}`}>
        {toast.type === 'success' && <CheckCircle2 size={16} color="var(--color-success)" aria-hidden="true" />}
        {toast.type === 'warning' && <AlertTriangle size={16} color="var(--color-warning)" aria-hidden="true" />}
        {toast.type === 'info' && <Info size={16} color="var(--precision-blue)" aria-hidden="true" />}
        <span>{toast.message}</span>
      </div>
    </div>
  );
});
