import { memo } from 'react';
import { Boxes, Search, Plus, AlertTriangle } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const InventoryMaterialsCatalogView = memo(function InventoryMaterialsCatalogView({ onOpenIssueModal }) {
  const { inventory, showToast } = useApp();

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Boxes size={18} style={{ color: 'var(--precision-blue)' }} />
            Materials SKU Catalog & Stock Valuation
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Construction materials master list, unit rates, safety reorder thresholds, and current stock balance
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={onOpenIssueModal}>
          <Plus size={14} /> RECORD MATERIAL ISSUE
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>SKU CODE</th>
              <th>MATERIAL NAME</th>
              <th>CATEGORY</th>
              <th>CURRENT STOCK</th>
              <th>REORDER LEVEL</th>
              <th>UNIT PRICE</th>
              <th>VALUATION</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{item.id}</td>
                <td style={{ fontWeight: 700 }}>{item.name}</td>
                <td>{item.category}</td>
                <td className="mono-data" style={{ fontWeight: 700 }}>{item.stock} {item.unit}</td>
                <td className="mono-data" style={{ color: 'var(--amber)' }}>{item.reorderLevel || 100} {item.unit}</td>
                <td className="mono-data">₹{item.unitPrice || '450'}</td>
                <td className="mono-data" style={{ color: 'var(--emerald)', fontWeight: 700 }}>₹{item.totalValuation || '4,50,000'}</td>
                <td>
                  <span className={`badge ${item.stock <= (item.reorderLevel || 100) ? 'badge-danger' : 'badge-success'}`}>
                    {item.stock <= (item.reorderLevel || 100) ? 'LOW STOCK' : 'HEALTHY'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
