import { memo } from 'react';
import { Clock, Mail, CheckCircle } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const ReportsScheduledQueueView = memo(function ReportsScheduledQueueView() {
  const { showToast } = useApp();

  const schedules = [
    { id: 'SCH-101', name: 'Daily Sales & Collection Digest', freq: 'Daily at 08:00 PM', recipients: 'directors@krishnavalley.com', status: 'ACTIVE' },
    { id: 'SCH-102', name: 'Weekly Inventory Low-Stock Alert', freq: 'Every Monday 09:00 AM', recipients: 'stores@krishnavalley.com', status: 'ACTIVE' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={18} style={{ color: 'var(--precision-blue)' }} />
            Scheduled Automated Report Email Dispatch Queue
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Configure daily/weekly automated PDF email reports for management and directors
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => showToast('Created new automated report schedule', 'info')}>
          ADD SCHEDULE
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>SCHEDULE ID</th>
              <th>REPORT NAME</th>
              <th>FREQUENCY</th>
              <th>EMAIL RECIPIENTS</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((s) => (
              <tr key={s.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{s.id}</td>
                <td style={{ fontWeight: 700 }}>{s.name}</td>
                <td className="mono-data">{s.freq}</td>
                <td className="mono-data">{s.recipients}</td>
                <td><span className="badge badge-success">{s.status}</span></td>
                <td>
                  <button className="btn btn-secondary btn-xs" onClick={() => showToast(`Triggered test email for ${s.id}`, 'info')}>
                    Test Dispatch
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
