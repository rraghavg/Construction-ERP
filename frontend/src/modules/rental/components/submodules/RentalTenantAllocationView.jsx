import { memo } from 'react';
import { UserCheck, ShieldCheck } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const RentalTenantAllocationView = memo(function RentalTenantAllocationView() {
  const { showToast } = useApp();

  const tenants = [
    { id: 'TNT-301', name: 'Anish Deshmukh', unit: 'A-102', monthlyRent: '₹ 42,000', deposit: '₹ 1,50,000', leasePeriod: '11 Months (Sep 2025 - Aug 2026)', policeVerif: 'VERIFIED' },
    { id: 'TNT-302', name: 'Megha Gupta', unit: 'B-404', monthlyRent: '₹ 35,000', deposit: '₹ 1,00,000', leasePeriod: '11 Months (Jan 2026 - Dec 2026)', policeVerif: 'VERIFIED' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserCheck size={18} style={{ color: 'var(--precision-blue)' }} />
            Tenant Allotment & Police Verification Register
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Tenant background check, police verification documentation, and unit key allotment
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => showToast('Opened tenant onboarding form', 'info')}>
          ALLOT NEW TENANT
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>TENANT ID</th>
              <th>TENANT NAME</th>
              <th>ALLOTTED UNIT</th>
              <th>MONTHLY RENT</th>
              <th>SECURITY DEPOSIT</th>
              <th>LEASE TENURE</th>
              <th>POLICE VERIFICATION</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((t) => (
              <tr key={t.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{t.id}</td>
                <td style={{ fontWeight: 700 }}>{t.name}</td>
                <td className="mono-data">{t.unit}</td>
                <td className="mono-data" style={{ fontWeight: 700 }}>{t.monthlyRent}</td>
                <td className="mono-data">{t.deposit}</td>
                <td>{t.leasePeriod}</td>
                <td><span className="badge badge-success">{t.policeVerif}</span></td>
                <td>
                  <button className="btn btn-secondary btn-xs" onClick={() => showToast(`Downloaded police verification PDF ${t.id}`, 'success')}>
                    Verification Doc
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
