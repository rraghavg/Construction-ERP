import { memo } from 'react';
import { IndianRupee, Download } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const RentalRentCollectionLedgerView = memo(function RentalRentCollectionLedgerView() {
  const { rentCollections, showToast } = useApp();

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IndianRupee size={18} style={{ color: 'var(--precision-blue)' }} />
            Monthly Rent Collections & Receipts Ledger
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Monthly rent receipts, late fee penalty calculations, and tenant payment vouchers
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => showToast('Recorded rent collection', 'info')}>
          RECORD RENT COLLECTION
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>RECEIPT NO.</th>
              <th>TENANT</th>
              <th>UNIT</th>
              <th>MONTH</th>
              <th>RENT AMOUNT</th>
              <th>PAYMENT MODE</th>
              <th>DATE RECEIVED</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {rentCollections.map((r) => (
              <tr key={r.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{r.id}</td>
                <td style={{ fontWeight: 700 }}>{r.tenantName}</td>
                <td className="mono-data">{r.unitNumber}</td>
                <td>{r.month}</td>
                <td className="mono-data" style={{ color: 'var(--emerald)', fontWeight: 700 }}>₹{r.amount}</td>
                <td>{r.paymentMode}</td>
                <td className="mono-data">{r.paidDate}</td>
                <td><span className="badge badge-success">{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
