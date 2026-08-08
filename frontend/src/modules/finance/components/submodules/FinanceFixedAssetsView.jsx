import { memo } from 'react';
import { Database, Plus } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const FinanceFixedAssetsView = memo(function FinanceFixedAssetsView() {
  const { showToast } = useApp();

  const assets = [
    { tag: 'AST-001', name: 'Tower Crane 50m Boom (Potain)', purchaseDate: '15 Mar 2024', originalCost: '₹ 85,00,000', depRate: '15% WDV', currentBookValue: '₹ 61,41,250', status: 'ACTIVE' },
    { tag: 'AST-002', name: 'Concrete Transit Mixer Truck 6-CuM', purchaseDate: '10 Jan 2025', originalCost: '₹ 38,00,000', depRate: '15% WDV', currentBookValue: '₹ 32,30,000', status: 'ACTIVE' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Database size={18} style={{ color: 'var(--precision-blue)' }} />
            Fixed Assets & Depreciation Schedule Register
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Construction machinery assets, vehicle fleet, depreciation calculation (WDV/SLM), and book values
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => showToast('Opened asset entry form', 'info')}>
          <Plus size={14} /> REGISTER ASSET
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>ASSET TAG</th>
              <th>EQUIPMENT / ASSET NAME</th>
              <th>PURCHASE DATE</th>
              <th>ORIGINAL COST</th>
              <th>DEP RATE</th>
              <th>CURRENT BOOK VALUE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((a) => (
              <tr key={a.tag}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{a.tag}</td>
                <td style={{ fontWeight: 700 }}>{a.name}</td>
                <td className="mono-data">{a.purchaseDate}</td>
                <td className="mono-data">{a.originalCost}</td>
                <td className="mono-data">{a.depRate}</td>
                <td className="mono-data" style={{ color: 'var(--emerald)', fontWeight: 700 }}>{a.currentBookValue}</td>
                <td><span className="badge badge-success">{a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
