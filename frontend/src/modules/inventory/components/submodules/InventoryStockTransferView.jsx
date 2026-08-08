import { memo } from 'react';
import { ArrowUpRight, CheckCircle } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const InventoryStockTransferView = memo(function InventoryStockTransferView() {
  const { showToast } = useApp();

  const transfers = [
    { id: 'TRF-301', material: '8mm TMT Steel Bars', qty: '1.8 Tons', sourceSite: 'Green Heights Yard', destSite: 'Prime Residency Site', status: 'IN_TRANSIT', date: '05 Aug 2026' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowUpRight size={18} style={{ color: 'var(--precision-blue)' }} />
            Inter-Site Stock Transfers & Movement Register
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Transfer materials between construction project sites, transit challans, and receiving confirmation
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => showToast('Initiated inter-site transfer challan', 'info')}>
          CREATE STOCK TRANSFER
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>TRANSFER CHALLAN</th>
              <th>MATERIAL SKU</th>
              <th>QTY TRANSFERRED</th>
              <th>SOURCE SITE</th>
              <th>DESTINATION SITE</th>
              <th>STATUS</th>
              <th>DATE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((t) => (
              <tr key={t.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{t.id}</td>
                <td style={{ fontWeight: 700 }}>{t.material}</td>
                <td className="mono-data">{t.qty}</td>
                <td>{t.sourceSite}</td>
                <td>{t.destSite}</td>
                <td><span className="badge badge-warning">{t.status}</span></td>
                <td className="mono-data">{t.date}</td>
                <td>
                  <button className="btn btn-secondary btn-xs" onClick={() => showToast(`Confirmed receipt for ${t.id}`, 'success')}>
                    Confirm Receipt
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
