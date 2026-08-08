import { memo } from 'react';
import { Headphones, AlertCircle, CheckCircle } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const CustomerHelpdeskView = memo(function CustomerHelpdeskView() {
  const { showToast } = useApp();

  const tickets = [
    { id: 'TKT-501', customer: 'Priya Sharma', unit: 'T2-1204', issue: 'Clarification needed on subvention EMI start date', priority: 'HIGH', status: 'IN_PROGRESS', date: '03 Aug 2026' },
    { id: 'TKT-502', customer: 'Amit Shah', unit: 'B-104', issue: 'Request for extra parking slot allotment letter', priority: 'MEDIUM', status: 'RESOLVED', date: '25 Jul 2026' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Headphones size={18} style={{ color: 'var(--precision-blue)' }} />
            Customer Helpdesk & Query Resolution Desk
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Post-sales customer support tickets, billing inquiries, and service request tracking
          </p>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>TICKET ID</th>
              <th>CUSTOMER</th>
              <th>UNIT</th>
              <th>QUERY / ISSUE</th>
              <th>PRIORITY</th>
              <th>STATUS</th>
              <th>DATE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{t.id}</td>
                <td style={{ fontWeight: 700 }}>{t.customer}</td>
                <td className="mono-data">{t.unit}</td>
                <td>{t.issue}</td>
                <td><span className={`badge ${t.priority === 'HIGH' ? 'badge-danger' : 'badge-warning'}`}>{t.priority}</span></td>
                <td><span className={`badge ${t.status === 'RESOLVED' ? 'badge-success' : 'badge-info'}`}>{t.status}</span></td>
                <td className="mono-data">{t.date}</td>
                <td>
                  <button className="btn btn-secondary btn-xs" onClick={() => showToast(`Updated ticket ${t.id}`, 'success')}>
                    Resolve Ticket
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
