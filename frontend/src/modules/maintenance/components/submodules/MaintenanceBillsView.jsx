import { memo } from 'react';
import { IndianRupee, Download } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const MaintenanceBillsView = memo(function MaintenanceBillsView() {
  const { showToast } = useApp();

  const bills = [
    { id: 'MBILL-2026-08', unit: 'A-402', resident: 'Rajesh Kumar', area: '1,450 sq.ft', rate: '₹ 3.50/sq.ft', total: '₹ 5,075', status: 'PAID', date: '01 Aug 2026' },
    { id: 'MBILL-2026-09', unit: 'B-104', resident: 'Amit Shah', area: '1,800 sq.ft', rate: '₹ 3.50/sq.ft', total: '₹ 6,300', status: 'UNPAID', date: '01 Aug 2026' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IndianRupee size={18} style={{ color: 'var(--precision-blue)' }} />
            Monthly Society Maintenance Dues & Billing
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Per-square-foot society maintenance bill generation, CAM charges, and online payment dues
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => showToast('Generated monthly maintenance bills for all units', 'success')}>
          GENERATE MONTHLY BILLS
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>BILL NO.</th>
              <th>UNIT</th>
              <th>RESIDENT</th>
              <th>CARPET AREA</th>
              <th>CAM RATE</th>
              <th>TOTAL DUES</th>
              <th>BILL DATE</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((b) => (
              <tr key={b.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{b.id}</td>
                <td className="mono-data">{b.unit}</td>
                <td style={{ fontWeight: 700 }}>{b.resident}</td>
                <td className="mono-data">{b.area}</td>
                <td className="mono-data">{b.rate}</td>
                <td className="mono-data" style={{ fontWeight: 700 }}>{b.total}</td>
                <td className="mono-data">{b.date}</td>
                <td><span className={`badge ${b.status === 'PAID' ? 'badge-success' : 'badge-danger'}`}>{b.status}</span></td>
                <td>
                  <button className="btn btn-secondary btn-xs" onClick={() => showToast(`Downloaded bill PDF ${b.id}`, 'success')}>
                    <Download size={11} /> Bill PDF
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
