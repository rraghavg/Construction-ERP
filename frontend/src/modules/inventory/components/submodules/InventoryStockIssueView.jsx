import { memo } from 'react';
import { Boxes, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const InventoryStockIssueView = memo(function InventoryStockIssueView({ onOpenIssueModal }) {
  const { showToast } = useApp();

  const issueLogs = [
    { id: 'ISS-401', material: 'OPC 53 Cement', qty: '120 Bags', targetProject: 'Green Heights Tower A', contractor: 'Shree Construction', issuedBy: 'Store Officer', date: '05 Aug 2026' },
    { id: 'ISS-402', material: 'Fe-550D TMT Steel 12mm', qty: '2.5 Tons', targetProject: 'Sunshine Towers Block B', contractor: 'RKM Contractors', issuedBy: 'Store Officer', date: '04 Aug 2026' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Boxes size={18} style={{ color: 'var(--precision-blue)' }} />
            Material Issue Slips & Site Consumption
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Issue materials to contractors, track floor slab consumption, and stock deduction
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={onOpenIssueModal}>
          ISSUE MATERIAL SLIP
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>ISSUE SLIP NO.</th>
              <th>MATERIAL SKU</th>
              <th>QUANTITY ISSUED</th>
              <th>TARGET PROJECT / LOCATION</th>
              <th>CONTRACTOR FIRM</th>
              <th>ISSUED BY</th>
              <th>DATE</th>
            </tr>
          </thead>
          <tbody>
            {issueLogs.map((i) => (
              <tr key={i.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{i.id}</td>
                <td style={{ fontWeight: 700 }}>{i.material}</td>
                <td className="mono-data" style={{ fontWeight: 700 }}>{i.qty}</td>
                <td>{i.targetProject}</td>
                <td>{i.contractor}</td>
                <td>{i.issuedBy}</td>
                <td className="mono-data">{i.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
