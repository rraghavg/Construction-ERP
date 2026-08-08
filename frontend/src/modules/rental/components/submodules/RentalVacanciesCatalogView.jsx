import { memo } from 'react';
import { Home, Key } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const RentalVacanciesCatalogView = memo(function RentalVacanciesCatalogView() {
  const { showToast } = useApp();

  const vacantUnits = [
    { unit: 'T1-901', project: 'Green Heights', type: '3 BHK Luxury', rent: '₹ 45,000/mo', deposit: '₹ 1,80,000', status: 'READY_TO_MOVE' },
    { unit: 'C-201', project: 'Sunshine Towers', type: '2 BHK Premium', rent: '₹ 32,000/mo', deposit: '₹ 1,00,000', status: 'PAINTING_IN_PROGRESS' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Home size={18} style={{ color: 'var(--precision-blue)' }} />
            Vacant Rental Properties & Available Units Catalog
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Available rental units ready for tenant onboarding, rent pricing configuration, and listing
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {vacantUnits.map((v) => (
          <div key={v.unit} className="anodized-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="mono-data" style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--precision-blue)' }}>{v.unit}</span>
              <span className="badge badge-success">{v.status}</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{v.project}</div>
            <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{v.type}</div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '1rem' }}>
              <span>Rent: <strong className="mono-data" style={{ color: 'var(--emerald)' }}>{v.rent}</strong></span>
              <span>Deposit: <strong className="mono-data">{v.deposit}</strong></span>
            </div>

            <button className="btn btn-primary btn-xs" style={{ width: '100%' }} onClick={() => showToast(`Initiated tenant allotment for ${v.unit}`, 'info')}>
              <Key size={12} /> ALLOT TENANT
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});
