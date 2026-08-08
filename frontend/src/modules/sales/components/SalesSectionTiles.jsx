import { memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { SALES_SECTION_TILES } from '../../../data/mockData';
import {
  Building2,
  FileText,
  Layers,
  Clock,
  Receipt,
  Send,
  Key,
  RotateCcw,
  ArrowUpRight
} from 'lucide-react';

const ICON_MAP = {
  Building2,
  FileText,
  Layers,
  Clock,
  Receipt,
  Send,
  Key,
  RotateCcw
};

export const SalesSectionTiles = memo(function SalesSectionTiles() {
  const { navigateTo } = useApp();

  const handleTileClick = useCallback((tile) => {
    navigateTo('sales', tile.targetSubmodule);
  }, [navigateTo]);

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
          Sales Module Quick-Access Hubs
        </h3>
        <span className="mono-data" style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
          8 SUB-PAGES persistent
        </span>
      </div>

      <div className="section-tiles-grid">
        {SALES_SECTION_TILES.map((tile) => {
          const IconComp = ICON_MAP[tile.icon] || Building2;

          return (
            <div
              key={tile.id}
              tabIndex={0}
              role="button"
              className="section-tile"
              onClick={() => handleTileClick(tile)}
              onKeyDown={(e) => handleTileKeyDown(e, tile)}
              aria-label={`Open Sales section: ${tile.title}. ${tile.count}. ${tile.description}`}
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
                <span className="badge badge-info mono-data" style={{ fontSize: '0.625rem' }}>
                  {tile.count}
                </span>
              </div>

              <div style={{ fontWeight: 800, fontSize: '0.825rem', marginBottom: '2px', textAlign: 'left' }}>
                {tile.title}
              </div>

              <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)', lineHeight: 1.3, textAlign: 'left' }}>
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
                VIEW ALL <ArrowUpRight size={11} aria-hidden="true" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
