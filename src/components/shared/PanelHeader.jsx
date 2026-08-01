import { memo } from 'react';
import { ArrowUpRight } from 'lucide-react';

/**
 * Shared panel/widget header with title bar and action link.
 * @param {string} title - The header title text
 * @param {React.ReactNode} icon - Icon element to show before the title
 * @param {string} accentColor - Color for the decorative bar (default: '#1e293b')
 * @param {string} actionLabel - Text for the action link (e.g., 'VIEW', 'FINANCE')
 * @param {function} onAction - Click handler for the action link
 * @param {React.ReactNode} children - Optional extra controls (selects, filters)
 */
export const PanelHeader = memo(function PanelHeader({ title, icon, accentColor = '#1e293b', actionLabel, onAction, children }) {
  return (
    <div className="widget-header">
      <h3 className="widget-title">
        <span
          style={{ width: '8px', height: '16px', background: accentColor, display: 'inline-block' }}
          aria-hidden="true"
        />
        {icon && <span aria-hidden="true">{icon}</span>}
        {title}
      </h3>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {children}
        {actionLabel && (
          <button
            className="widget-action-link mono-data"
            onClick={onAction}
            aria-label={`${actionLabel} ${title}`}
          >
            {actionLabel} <ArrowUpRight size={13} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
});
