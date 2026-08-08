import { memo } from 'react';
import { Receipt, Download } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const SalesReceiptsView = memo(function SalesReceiptsView() {
  const { showToast } = useApp();

  const receipts = [
    { id: 'RCT-2026-881', customer: 'Rajesh Kumar', unit: 'A-402', mode: 'HDFC NEFT / RTGS', amount: '₹ 5,00,000', date: '04 Aug 2026', status: 'CLEARED' },
    { id: 'RCT-2026-882', customer: 'Priya Sharma', unit: 'T2-1204', mode: 'ICICI Cheque #40291', amount: '₹ 2,50,000', date: '02 Aug 2026', status: 'IN_CLEARANCE' },
    { id: 'RCT-2026-883', customer: 'Amit Shah', unit: 'B-104', mode: 'SBI Wire Transfer', amount: '₹ 8,50,000', date: '15 Jul 2026', status: 'CLEARED' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Receipt size={18} style={{ color: 'var(--precision-blue)' }} />
            Payment Receipts & Collections Vault
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Official customer money collection receipts, cheque clearance tracking, and receipt vouchers
          </p>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>RECEIPT NO.</th>
              <th>CUSTOMER</th>
              <th>UNIT</th>
              <th>PAYMENT MODE</th>
              <th>AMOUNT RECEIVED</th>
              <th>DATE</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {receipts.map((r) => (
              <tr key={r.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{r.id}</td>
                <td style={{ fontWeight: 700 }}>{r.customer}</td>
                <td className="mono-data">{r.unit}</td>
                <td>{r.mode}</td>
                <td className="mono-data" style={{ color: 'var(--emerald)', fontWeight: 700 }}>{r.amount}</td>
                <td className="mono-data">{r.date}</td>
                <td><span className={`badge ${r.status === 'CLEARED' ? 'badge-success' : 'badge-warning'}`}>{r.status}</span></td>
                <td>
                  <button className="btn btn-secondary btn-xs" onClick={() => showToast(`Downloaded PDF receipt ${r.id}`, 'success')}>
                    <Download size={11} /> PDF Receipt
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
