import { memo } from 'react';

const STATUS_STYLES = {
  'New':         { bg: 'rgba(37, 99, 235, 0.12)',  color: '#1d4ed8', border: 'rgba(37, 99, 235, 0.3)' },
  'Contacted':   { bg: 'rgba(6, 182, 212, 0.12)',  color: '#0e7490', border: 'rgba(6, 182, 212, 0.3)' },
  'Site Visit':  { bg: 'rgba(139, 92, 246, 0.12)', color: '#7c3aed', border: 'rgba(139, 92, 246, 0.3)' },
  'In Progress': { bg: 'rgba(249, 115, 22, 0.12)', color: '#c2410c', border: 'rgba(249, 115, 22, 0.3)' },
  'Qualified':   { bg: 'rgba(234, 179, 8, 0.12)',  color: '#a16207', border: 'rgba(234, 179, 8, 0.3)' },
  'Converted':   { bg: 'rgba(22, 163, 74, 0.12)',  color: '#15803d', border: 'rgba(22, 163, 74, 0.3)' },
  'Lost':        { bg: 'rgba(220, 38, 38, 0.12)',  color: '#b91c1c', border: 'rgba(220, 38, 38, 0.3)' },
};

const DEFAULT_STYLE = { bg: 'rgba(100, 116, 139, 0.12)', color: '#475569', border: 'rgba(100, 116, 139, 0.3)' };

/**
 * Shared status badge for CRM leads.
 * @param {string} status - Lead status string
 */
export const StatusBadge = memo(function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || DEFAULT_STYLE;

  return (
    <span
      className="badge mono-data"
      style={{
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        fontSize: '0.675rem'
      }}
    >
      {status}
    </span>
  );
});
