import { memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { HR_QUICK_ACCESS_TILES } from '../../../data/mockData';
import {
  UserPlus,
  UserCheck,
  Calendar,
  IndianRupee,
  Award,
  FileText,
  ArrowUpRight
} from 'lucide-react';

const ICON_MAP = {
  UserPlus,
  UserCheck,
  Calendar,
  IndianRupee,
  Award,
  FileText
};

export const HrQuickAccessPanel = memo(function HrQuickAccessPanel({ onOpenAddModal }) {
  const { navigateTo } = useApp();

  const handleTileClick = useCallback((tile) => {
    if (tile.id === 'Add Employee') {
      onOpenAddModal();
    } else {
      navigateTo('hr', tile.targetSubmodule);
    }
  }, [onOpenAddModal, navigateTo]);

  const handleTileKeyDown = useCallback((e, tile) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTileClick(tile);
    }
  }, [handleTileClick]);

  return (
    <div style={{ marginTop: '0.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
        <h3 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '16px', background: '#2563eb', display: 'inline-block' }} aria-hidden="true" />
          HR Quick Access Launchers
        </h3>
        <span className="mono-data" style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
          6 SHORTCUT TILES
        </span>
      </div>

      <div className="section-tiles-grid" style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
        {HR_QUICK_ACCESS_TILES.map((tile) => {
          const IconComp = ICON_MAP[tile.icon] || UserCheck;

          return (
            <div
              key={tile.id}
              tabIndex={0}
              role="button"
              className="section-tile"
              onClick={() => handleTileClick(tile)}
              onKeyDown={(e) => handleTileKeyDown(e, tile)}
              aria-label={`Action: ${tile.title}. ${tile.actionText}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '4px',
                    background: 'rgba(37, 99, 235, 0.1)',
                    color: 'var(--precision-blue)',
                    display: 'grid',
                    placeItems: 'center'
                  }}
                  aria-hidden="true"
                >
                  <IconComp size={18} />
                </div>
                <span className="badge badge-info mono-data" style={{ fontSize: '0.6rem' }}>
                  {tile.actionText}
                </span>
              </div>

              <div style={{ fontWeight: 800, fontSize: '0.825rem', marginBottom: '2px', textAlign: 'left' }}>
                {tile.title}
              </div>

              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: 1.3, textAlign: 'left' }}>
                {tile.description}
              </div>

              <div
                className="mono-data"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: 'var(--precision-blue)',
                  marginTop: '0.6rem'
                }}
              >
                LAUNCH <ArrowUpRight size={11} aria-hidden="true" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
