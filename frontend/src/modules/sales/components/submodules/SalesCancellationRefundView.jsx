import { memo } from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const SalesCancellationRefundView = memo(function SalesCancellationRefundView() {
  const { showToast } = useApp();

  const cancellations = [
    { id: 'CAN-801', customer: 'Vikram Mehta', unit: 'C-302', project: 'Green Heights', paid: '₹ 8,00,000', deduction: '₹ 1,50,000', netRefund: '₹ 6,50,000', status: 'PENDING_APPROVAL', reason: 'Home loan rejected by bank' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RotateCcw size={18} style={{ color: 'var(--precision-blue)' }} />
            Booking Cancellation & Forfeiture Settlement
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Process unit surrender requests, earnest money forfeiture deductions, and net refund cheques
          </p>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>CANCELLATION ID</th>
              <th>CUSTOMER</th>
              <th>UNIT</th>
              <th>TOTAL PAID</th>
              <th>FORFEITURE DEDUCTION</th>
              <th>NET REFUNDABLE</th>
              <th>REASON</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {cancellations.map((c) => (
              <tr key={c.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{c.id}</td>
                <td style={{ fontWeight: 700 }}>{c.customer}</td>
                <td className="mono-data">{c.unit}</td>
                <td className="mono-data">{c.paid}</td>
                <td className="mono-data" style={{ color: 'var(--amber)' }}>{c.deduction}</td>
                <td className="mono-data" style={{ color: 'var(--emerald)', fontWeight: 700 }}>{c.netRefund}</td>
                <td style={{ color: 'var(--text-muted)' }}>{c.reason}</td>
                <td><span className="badge badge-warning">{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
