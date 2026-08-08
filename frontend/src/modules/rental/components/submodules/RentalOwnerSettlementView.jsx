import { memo } from 'react';
import { IndianRupee, Send } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const RentalOwnerSettlementView = memo(function RentalOwnerSettlementView() {
  const { showToast } = useApp();

  const settlements = [
    { id: 'SET-901', owner: 'Dr. Ramesh Iyer', units: 'A-102, B-404', grossRent: '₹ 77,000', mgmtFee: '₹ 7,700', netPayout: '₹ 69,300', date: '05 Aug 2026', status: 'PROCESSED' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IndianRupee size={18} style={{ color: 'var(--precision-blue)' }} />
            Owner Settlement & Monthly Payout Voucher
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Monthly landlord rent payout reconciliation, property management fee deduction, and bank transfers
          </p>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>SETTLEMENT ID</th>
              <th>LANDLORD / OWNER</th>
              <th>UNITS INCLUDED</th>
              <th>GROSS RENT COLLECTED</th>
              <th>MGMT COMMISSION (10%)</th>
              <th>NET PAYOUT TO OWNER</th>
              <th>PAYOUT DATE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {settlements.map((s) => (
              <tr key={s.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{s.id}</td>
                <td style={{ fontWeight: 700 }}>{s.owner}</td>
                <td className="mono-data">{s.units}</td>
                <td className="mono-data">{s.grossRent}</td>
                <td className="mono-data" style={{ color: 'var(--amber)' }}>{s.mgmtFee}</td>
                <td className="mono-data" style={{ color: 'var(--emerald)', fontWeight: 700 }}>{s.netPayout}</td>
                <td className="mono-data">{s.date}</td>
                <td><span className="badge badge-success">{s.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
