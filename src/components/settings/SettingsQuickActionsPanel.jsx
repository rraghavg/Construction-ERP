import { memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { RefreshCw, Activity, Download, Upload, RotateCcw } from 'lucide-react';
import { PanelHeader } from '../shared/PanelHeader';

export const SettingsQuickActionsPanel = memo(function SettingsQuickActionsPanel({ onOpenHealthModal }) {
  const { clearSystemCache, triggerManualBackup, resetSettingsToDefault, showToast } = useApp();

  const handleExport = useCallback(() => {
    showToast('Exported system configurations snapshot (apex_settings_20260801.json)', 'success');
  }, [showToast]);

  const handleImport = useCallback(() => {
    showToast('Select JSON configuration file to import...', 'info');
  }, [showToast]);

  const actions = [
    { id: 'cache', title: 'Clear Cache 🧹', desc: 'Flush Redis & session report caches', icon: RefreshCw, handler: clearSystemCache },
    { id: 'health', title: 'Health Check 🩺', desc: 'Run live DB/Queue/Redis diagnostic', icon: Activity, handler: onOpenHealthModal },
    { id: 'export', title: 'Export Config ⬇️', desc: 'Download JSON settings snapshot', icon: Download, handler: handleExport },
    { id: 'import', title: 'Import Config ⬆️', desc: 'Upload JSON configuration file', icon: Upload, handler: handleImport },
    { id: 'reset', title: 'Reset Defaults ⚠️', desc: 'Restore factory defaults with backup', icon: RotateCcw, handler: resetSettingsToDefault }
  ];

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="System Maintenance & Quick Actions"
        accentColor="#2563eb"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem' }}>
        {actions.map((act) => {
          const IconComp = act.icon;

          return (
            <div
              key={act.id}
              tabIndex={0}
              role="button"
              className="anodized-panel section-tile"
              style={{ padding: '0.85rem', cursor: 'pointer', borderLeft: act.id === 'reset' ? '3px solid #dc2626' : '3px solid var(--precision-blue)' }}
              onClick={act.handler}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  act.handler();
                }
              }}
              aria-label={`${act.title}: ${act.desc}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <IconComp size={16} color={act.id === 'reset' ? '#dc2626' : 'var(--precision-blue)'} aria-hidden="true" />
                <span className={`badge ${act.id === 'reset' ? 'badge-danger' : 'badge-info'} mono-data`} style={{ fontSize: '0.6rem' }}>
                  SYSTEM
                </span>
              </div>

              <div style={{ fontWeight: 800, fontSize: '0.775rem', marginBottom: '2px' }}>
                {act.title}
              </div>

              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: 1.2 }}>
                {act.desc}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
