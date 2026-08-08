import { memo } from 'react';
import { Shield, IndianRupee } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const RentalSecurityDepositsView = memo(function RentalSecurityDepositsView() {
  const { showToast } = useApp();

  const deposits = [
    { id: 'DEP-101', tenant: 'Anish Deshmukh', unit: 'A-102', totalDeposit: '₹ 1,50,000', bankAccount: 'Escrow HDFC ****9012', status: 'HELD_IN_ESCROW' },
    { id: 'DEP-102', tenant: 'Megha Gupta', unit: 'B-404', totalDeposit: '₹ 1,00,000', bankAccount: 'Escrow HDFC ****9012', status: 'HELD_IN_ESCROW' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={18} style={{ color: 'var(--precision-blue)' }} />
            Security Deposit Escrow & Refund Ledger
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Security deposit escrow account tracking, damage deductions, and exit refund vouchers
          </p>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>DEPOSIT ID</th>
              <th>TENANT</th>
              <th>UNIT</th>
              <th>ESCROW DEPOSIT AMOUNT</th>
              <th>ESCROW BANK</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {deposits.map((d) => (
              <tr key={d.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{d.id}</td>
                <td style={{ fontWeight: 700 }}>{d.tenant}</td>
                <td className="mono-data">{d.unit}</td>
                <td className="mono-data" style={{ fontWeight: 700 }}>{d.totalDeposit}</td>
                <td className="mono-data">{d.bankAccount}</td>
                <td><span className="badge badge-info">{d.status}</span></td>
                <td>
                  <button className="btn btn-secondary btn-xs" onClick={() => showToast(`Initiated deposit adjustment for ${d.id}`, 'info')}>
                    Adjust / Refund
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
