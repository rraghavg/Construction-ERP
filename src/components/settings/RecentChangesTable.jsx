import { memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { History, Eye } from 'lucide-react';
import { PanelHeader } from '../shared/PanelHeader';

export const RecentChangesTable = memo(function RecentChangesTable({ onOpenDiffModal }) {
  const { settingsChangeHistory, navigateTo } = useApp();

  const handleAction = useCallback(() => {
    navigateTo('settings-audit', 'Change History Log');
  }, [navigateTo]);

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Recent Configuration Changes & Audit History"
        icon={<History size={16} color="var(--precision-blue)" />}
        accentColor="#2563eb"
        actionLabel="FULL AUDIT LOG →"
        onAction={handleAction}
      />

      <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }} aria-label="Recent configuration changes audit table">
          <thead>
            <tr style={{ background: 'var(--bg-input)', borderBottom: '1px solid var(--border-color)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.65rem 0.75rem' }}>CHANGE ID</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>SETTING NAME</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>CATEGORY</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>CHANGED BY</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>DATE & TIME</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>ACTION</th>
              <th style={{ padding: '0.65rem 0.75rem', textAlign: 'right' }}>DIFF</th>
            </tr>
          </thead>
          <tbody>
            {settingsChangeHistory.map((item) => (
              <tr
                key={item.id}
                tabIndex={0}
                role="button"
                onClick={() => onOpenDiffModal(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenDiffModal(item);
                  }
                }}
                style={{
                  borderBottom: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease'
                }}
              >
                <td className="mono-data" style={{ padding: '0.75rem', fontWeight: '700', color: 'var(--precision-blue)' }}>
                  {item.id}
                </td>
                <td style={{ padding: '0.75rem', fontWeight: '700' }}>
                  {item.settingName}
                </td>
                <td style={{ padding: '0.75rem', fontSize: '0.725rem' }}>
                  {item.category}
                </td>
                <td style={{ padding: '0.75rem', fontSize: '0.725rem' }}>
                  {item.changedBy}
                </td>
                <td className="mono-data" style={{ padding: '0.75rem', fontSize: '0.725rem' }}>
                  {item.dateTime}
                </td>
                <td style={{ padding: '0.75rem' }}>
                  <span className="badge badge-info mono-data" style={{ fontSize: '0.625rem' }}>
                    {item.action}
                  </span>
                </td>
                <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '3px 7px' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDiffModal(item);
                    }}
                    title="Inspect Old vs New Diff"
                    aria-label={`Inspect diff for ${item.settingName}`}
                  >
                    <Eye size={12} aria-hidden="true" /> DIFF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
