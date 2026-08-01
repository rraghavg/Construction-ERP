import { memo } from 'react';
import { Lock } from 'lucide-react';

/**
 * Shared masked finance overlay. Shown when user role lacks finance visibility.
 * @param {string} label - Telemetry label text (default: 'MASKED_TELEMETRY')
 * @param {string} height - Container height (default: '100%')
 */
export const MaskedOverlay = memo(function MaskedOverlay({ label = 'MASKED_TELEMETRY', height = '100%' }) {
  return (
    <div className="empty-widget-state" style={{ height }} role="status" aria-label="Data masked for current role">
      <Lock size={28} color="var(--color-warning)" aria-hidden="true" />
      <p className="mono-data" style={{ fontSize: '0.75rem' }}>{label}</p>
    </div>
  );
});
