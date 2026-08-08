import { memo } from 'react';
import { Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const SalesInstallmentsView = memo(function SalesInstallmentsView() {
  const { showToast } = useApp();

  const installments = [
    { id: 'INS-901', customer: 'Rajesh Kumar', unit: 'A-402', milestone: '15th Floor Slab Cast', dueDate: '10 Aug 2026', amount: '₹ 6,50,000', status: 'DUE_SOON' },
    { id: 'INS-902', customer: 'Priya Sharma', unit: 'T2-1204', milestone: 'Foundation Completion', dueDate: '28 Jul 2026', amount: '₹ 4,80,000', status: 'OVERDUE' },
    { id: 'INS-903', customer: 'Amit Shah', unit: 'B-104', milestone: 'Booking Allocation (10%)', dueDate: '15 Jul 2026', amount: '₹ 8,50,000', status: 'PAID' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={18} style={{ color: 'var(--precision-blue)' }} />
            Installment Milestone Tracking Ledger
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Construction milestone demand triggers, due date tracking, and overdue penalty calculations
          </p>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>INSTALLMENT ID</th>
              <th>CUSTOMER</th>
              <th>UNIT</th>
              <th>MILESTONE STAGE</th>
              <th>DUE DATE</th>
              <th>AMOUNT DUE</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {installments.map((inst) => (
              <tr key={inst.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{inst.id}</td>
                <td style={{ fontWeight: 700 }}>{inst.customer}</td>
                <td className="mono-data">{inst.unit}</td>
                <td>{inst.milestone}</td>
                <td className="mono-data">{inst.dueDate}</td>
                <td className="mono-data" style={{ fontWeight: 700 }}>{inst.amount}</td>
                <td>
                  <span className={`badge ${inst.status === 'PAID' ? 'badge-success' : inst.status === 'OVERDUE' ? 'badge-danger' : 'badge-warning'}`}>
                    {inst.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-secondary btn-xs" onClick={() => showToast(`Generated demand notice for ${inst.id}`, 'info')}>
                    Issue Demand
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
