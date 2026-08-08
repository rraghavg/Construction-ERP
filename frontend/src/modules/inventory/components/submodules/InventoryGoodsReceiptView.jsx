import { memo } from 'react';
import { Truck, CheckCircle } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const InventoryGoodsReceiptView = memo(function InventoryGoodsReceiptView() {
  const { showToast } = useApp();

  const grnList = [
    { id: 'GRN-901', poRef: 'PO-2026-901', supplier: 'UltraTech Cement', itemsReceived: '500 Bags OPC 53', gatePass: 'GP-8812', qualityCheck: 'PASSED', date: '04 Aug 2026' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Truck size={18} style={{ color: 'var(--precision-blue)' }} />
            Goods Receipt Notes (GRN) & Quality Check
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Site gate pass entry, material quantity verification, and lab quality test inspection logs
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => showToast('Opened GRN entry form', 'info')}>
          CREATE GRN ENTRY
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>GRN NUMBER</th>
              <th>PO REFERENCE</th>
              <th>SUPPLIER</th>
              <th>ITEMS RECEIVED</th>
              <th>GATE PASS NO.</th>
              <th>QUALITY TEST</th>
              <th>DATE RECEIVED</th>
            </tr>
          </thead>
          <tbody>
            {grnList.map((g) => (
              <tr key={g.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{g.id}</td>
                <td className="mono-data">{g.poRef}</td>
                <td style={{ fontWeight: 700 }}>{g.supplier}</td>
                <td>{g.itemsReceived}</td>
                <td className="mono-data">{g.gatePass}</td>
                <td><span className="badge badge-success">{g.qualityCheck}</span></td>
                <td className="mono-data">{g.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
