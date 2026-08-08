import { memo } from 'react';
import { Clock, RefreshCw } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const RentalLeaseRenewalsView = memo(function RentalLeaseRenewalsView() {
  const { showToast } = useApp();

  const renewals = [
    { id: 'RNW-101', tenant: 'Anish Deshmukh', unit: 'A-102', expiryDate: '31 Aug 2026', currentRent: '₹ 42,000', revisedRent: '₹ 46,200 (+10%)', status: 'NOTICE_SENT' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={18} style={{ color: 'var(--precision-blue)' }} />
            Lease Expiry & Agreement Renewals Desk
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            30/60/90-day lease expiration notifications, rent revision calculator, and renewal agreements
          </p>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>RENEWAL ID</th>
              <th>TENANT</th>
              <th>UNIT</th>
              <th>EXPIRY DATE</th>
              <th>CURRENT RENT</th>
              <th>REVISED RENT (10% ESCALATION)</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {renewals.map((r) => (
              <tr key={r.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{r.id}</td>
                <td style={{ fontWeight: 700 }}>{r.tenant}</td>
                <td className="mono-data">{r.unit}</td>
                <td className="mono-data" style={{ color: 'var(--amber)', fontWeight: 700 }}>{r.expiryDate}</td>
                <td className="mono-data">{r.currentRent}</td>
                <td className="mono-data" style={{ color: 'var(--emerald)', fontWeight: 700 }}>{r.revisedRent}</td>
                <td><span className="badge badge-warning">{r.status}</span></td>
                <td>
                  <button className="btn btn-secondary btn-xs" onClick={() => showToast(`Sent renewal draft for ${r.tenant}`, 'success')}>
                    Send Renewal Draft
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
