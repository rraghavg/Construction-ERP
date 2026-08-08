import { memo } from 'react';
import { ShoppingCart, FileText } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const InventoryPurchaseOrdersView = memo(function InventoryPurchaseOrdersView() {
  const { showToast } = useApp();

  const orders = [
    { id: 'PO-2026-901', supplier: 'UltraTech Cement', items: '500 Bags OPC 53 Grade', totalAmount: '₹ 1,85,000', deliveryDate: '10 Aug 2026', status: 'APPROVED' },
    { id: 'PO-2026-902', supplier: 'Tata Tiscon Steel', items: '12 Tons Fe-550D TMT', totalAmount: '₹ 7,44,000', deliveryDate: '12 Aug 2026', status: 'DISPATCHED' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingCart size={18} style={{ color: 'var(--precision-blue)' }} />
            Purchase Orders (PO) Register & Tracking
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            PO issuance, manager approval workflow, and vendor dispatch tracking
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => showToast('Opened Purchase Order builder', 'info')}>
          CREATE NEW PO
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>PO NUMBER</th>
              <th>SUPPLIER NAME</th>
              <th>ORDERED ITEMS</th>
              <th>TOTAL VALUE</th>
              <th>EXPECTED DELIVERY</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{o.id}</td>
                <td style={{ fontWeight: 700 }}>{o.supplier}</td>
                <td>{o.items}</td>
                <td className="mono-data" style={{ fontWeight: 700 }}>{o.totalAmount}</td>
                <td className="mono-data">{o.deliveryDate}</td>
                <td><span className={`badge ${o.status === 'APPROVED' ? 'badge-success' : 'badge-info'}`}>{o.status}</span></td>
                <td>
                  <button className="btn btn-secondary btn-xs" onClick={() => showToast(`Downloaded PO PDF ${o.id}`, 'success')}>
                    PO PDF
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
