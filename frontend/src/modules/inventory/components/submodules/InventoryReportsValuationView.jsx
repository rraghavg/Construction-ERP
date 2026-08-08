import { memo } from 'react';
import { BarChart3, Download } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const InventoryReportsValuationView = memo(function InventoryReportsValuationView() {
  const { showToast } = useApp();

  const valuationList = [
    { category: 'Structural Steel (TMT)', totalSKUs: 14, totalQty: '48.5 Tons', unitValue: '₹ 62,000/Ton', totalValuation: '₹ 30,07,000', method: 'FIFO' },
    { category: 'Cement (OPC/PPC)', totalSKUs: 6, totalQty: '1,840 Bags', unitValue: '₹ 370/Bag', totalValuation: '₹ 6,80,800', method: 'FIFO' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart3 size={18} style={{ color: 'var(--precision-blue)' }} />
            Stock Valuation & FIFO Financial Inventory Summary
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Category-wise inventory asset valuation, FIFO cost audit, and aging analysis
          </p>
        </div>

        <button className="btn btn-secondary btn-sm" onClick={() => showToast('Downloaded Valuation Report PDF', 'success')}>
          <Download size={14} /> EXPORT VALUATION PDF
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>MATERIAL CATEGORY</th>
              <th>ACTIVE SKUs</th>
              <th>TOTAL QUANTITY IN STOCK</th>
              <th>AVG UNIT VALUE</th>
              <th>TOTAL VALUATION</th>
              <th>VALUATION METHOD</th>
            </tr>
          </thead>
          <tbody>
            {valuationList.map((v) => (
              <tr key={v.category}>
                <td style={{ fontWeight: 700 }}>{v.category}</td>
                <td className="mono-data">{v.totalSKUs}</td>
                <td className="mono-data">{v.totalQty}</td>
                <td className="mono-data">{v.unitValue}</td>
                <td className="mono-data" style={{ color: 'var(--emerald)', fontWeight: 700 }}>{v.totalValuation}</td>
                <td><span className="badge badge-info mono-data">{v.method}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
