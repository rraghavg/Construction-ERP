import { memo } from 'react';

/**
 * Shared skeleton loading placeholder for widgets/panels.
 * @param {number} lines - Number of skeleton bars to show (default: 2)
 * @param {string} height - Height of the main skeleton bar (default: '220px')
 * @param {string} className - Container CSS class (default: 'data-grid-item')
 */
export const WidgetSkeleton = memo(function WidgetSkeleton({ lines = 2, height = '220px', className = 'data-grid-item' }) {
  return (
    <div className={className} style={{ padding: '1.25rem' }} role="status" aria-label="Loading">
      <div className="skeleton" style={{ width: '140px', height: '20px', marginBottom: '1rem' }} />
      {Array.from({ length: lines }, (_, i) => (
        <div
          key={i}
          className="skeleton"
          style={{
            width: i === 0 ? '100%' : '60%',
            height: i === 0 ? height : '16px',
            marginTop: i > 0 ? '0.75rem' : 0
          }}
        />
      ))}
      <span className="sr-only">Loading content…</span>
    </div>
  );
});
