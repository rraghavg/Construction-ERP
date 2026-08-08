import { memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { Key, UserPlus } from 'lucide-react';
import { PanelHeader } from '../../../shared/components/PanelHeader';

export const VacantUnitsPanel = memo(function VacantUnitsPanel({ onAllocateUnit }) {
  const { vacantUnits, navigateTo } = useApp();

  const handleAction = useCallback(() => {
    navigateTo('rental-mgmt', 'Vacancies Catalog');
  }, [navigateTo]);

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Vacant Units Catalog"
        icon={<Key size={15} color="#f97316" />}
        accentColor="#f97316"
        actionLabel="ALL VACANCIES"
        onAction={handleAction}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {vacantUnits.map((unit) => (
          <div key={unit.id} className="structural-card" style={{ padding: '0.65rem', marginBottom: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="mono-data" style={{ fontWeight: '800', fontSize: '0.75rem', color: '#f97316' }}>
                {unit.unit}
              </span>
              <span className="badge badge-warning">VACANT</span>
            </div>

            <div style={{ fontWeight: '700', fontSize: '0.775rem', marginTop: '2px' }}>
              {unit.project} | {unit.type}
            </div>
            <div className="mono-data" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              Area: {unit.areaSqFt}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', paddingTop: '4px', borderTop: '1px solid var(--border-color)' }}>
              <span className="mono-data" style={{ fontWeight: '800', fontSize: '0.775rem', color: 'var(--precision-blue)' }}>
                {unit.rentAmount}
              </span>

              <button
                className="btn btn-primary btn-sm"
                style={{ padding: '2px 6px', fontSize: '0.65rem' }}
                onClick={() => onAllocateUnit(unit)}
                title="Allocate Tenant to Unit"
                aria-label={`Allocate tenant to ${unit.unit}`}
              >
                <UserPlus size={11} aria-hidden="true" /> ALLOCATE TENANT
              </button>
            </div>
          </div>
        ))}

        {vacantUnits.length === 0 && (
          <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }} className="mono-data">
            ALL_UNITS_FULLY_LEASED
          </div>
        )}
      </div>
    </div>
  );
});
