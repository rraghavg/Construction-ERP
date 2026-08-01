import { memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { Download, FileText, Bell, Calendar, ShieldCheck } from 'lucide-react';
import { PanelHeader } from '../shared/PanelHeader';

export const AuditReportsPanel = memo(function AuditReportsPanel({ onOpenAlertModal, onOpenScheduleModal }) {
  const { exportAuditLogs } = useApp();

  const reports = [
    { title: 'Activity Summary Report', desc: 'Org-wide activity volume by module & time trend', icon: FileText, format: 'PDF / XLSX' },
    { title: 'User Activity Breakdown', desc: 'Per-user logins, data changes & critical actions', icon: Calendar, format: 'XLSX / CSV' },
    { title: 'Security Audit & Compliance', desc: 'Failed login patterns, critical events & access grants', icon: ShieldCheck, format: 'PDF / XLSX' }
  ];

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Compliance Audit Reports & Security Alerts"
        accentColor="#2563eb"
        actionLabel="SET ALERTS 🔔"
        onAction={onOpenAlertModal}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {reports.map((rep) => {
          const IconComp = rep.icon;

          return (
            <div
              key={rep.title}
              tabIndex={0}
              role="button"
              className="anodized-panel section-tile"
              style={{ padding: '1rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              onClick={onOpenScheduleModal}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenScheduleModal();
                }
              }}
              aria-label={`${rep.title}: ${rep.desc}`}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <IconComp size={18} color="var(--precision-blue)" aria-hidden="true" />
                  <span className="badge badge-info mono-data" style={{ fontSize: '0.6rem' }}>
                    {rep.format}
                  </span>
                </div>

                <div style={{ fontWeight: 800, fontSize: '0.85rem', marginBottom: '2px' }}>
                  {rep.title}
                </div>

                <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                  {rep.desc}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)', fontSize: '0.725rem', color: 'var(--precision-blue)', fontWeight: 700, marginTop: '0.75rem' }}>
                <span>SCHEDULE REPORT 📅</span>
                <Download size={13} aria-hidden="true" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
