import { memo } from 'react';
import { Clock, ShieldCheck, AlertCircle } from 'lucide-react';

export const MaintenanceSlaReportView = memo(function MaintenanceSlaReportView() {
  const slaMetrics = [
    { category: 'Electrical Repairs', target: '2 Hours', avgResolved: '1.4 Hours', compliance: '96.2%', status: 'PASSED' },
    { category: 'Plumbing & Leakage', target: '4 Hours', avgResolved: '2.8 Hours', compliance: '94.0%', status: 'PASSED' },
    { category: 'Elevator Breakdown', target: '1 Hour', avgResolved: '0.8 Hours', compliance: '98.5%', status: 'PASSED' },
    { category: 'Carpentry / General', target: '24 Hours', avgResolved: '18.2 Hours', compliance: '91.0%', status: 'PASSED' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={18} style={{ color: 'var(--precision-blue)' }} />
            SLA Compliance & Turnaround Time (TAT) Analytics
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Service level agreement audit, average resolution time, and contractor performance scores
          </p>
        </div>

        <span className="badge badge-success mono-data">95.4% OVERALL SLA SCORE</span>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>MAINTENANCE CATEGORY</th>
              <th>TARGET SLA TIME</th>
              <th>AVG ACTUAL RESOLUTION TIME</th>
              <th>SLA COMPLIANCE %</th>
              <th>AUDIT STATUS</th>
            </tr>
          </thead>
          <tbody>
            {slaMetrics.map((m) => (
              <tr key={m.category}>
                <td style={{ fontWeight: 700 }}>{m.category}</td>
                <td className="mono-data">{m.target}</td>
                <td className="mono-data" style={{ color: 'var(--precision-blue)', fontWeight: 700 }}>{m.avgResolved}</td>
                <td className="mono-data" style={{ color: 'var(--emerald)', fontWeight: 700 }}>{m.compliance}</td>
                <td><span className="badge badge-success">{m.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
