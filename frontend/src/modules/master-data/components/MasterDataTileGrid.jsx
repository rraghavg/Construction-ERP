import { memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import {
  Building,
  Building2,
  Layers,
  Compass,
  Grid,
  Home,
  Maximize2,
  Truck,
  Users,
  UserCheck,
  CreditCard,
  Shield,
  Receipt,
  Headphones,
  ArrowUpRight,
  AlertTriangle
} from 'lucide-react';

const ICON_MAP = {
  Building,
  Building2,
  Layers,
  Compass,
  Grid,
  Home,
  Maximize2,
  Truck,
  Users,
  UserCheck,
  CreditCard,
  Shield,
  Receipt,
  Headphones
};

export const MasterDataTileGrid = memo(function MasterDataTileGrid({ onSelectCategory }) {
  const { masterCategories } = useApp();

  const hierarchyCategories = masterCategories.filter((c) => c.group === 'hierarchy');
  const referenceCategories = masterCategories.filter((c) => c.group === 'reference');

  const handleTileClick = useCallback((category) => {
    onSelectCategory(category);
  }, [onSelectCategory]);

  const handleTileKeyDown = useCallback((e, category) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTileClick(category);
    }
  }, [handleTileClick]);

  const renderCategoryTile = (cat) => {
    const IconComp = ICON_MAP[cat.icon] || Building2;
    const isUnconfigured = cat.count === 0;

    return (
      <div
        key={cat.id}
        tabIndex={0}
        role="button"
        className="section-tile"
        onClick={() => handleTileClick(cat)}
        onKeyDown={(e) => handleTileKeyDown(e, cat)}
        aria-label={`Master Category ${cat.name}: ${cat.count} records. ${cat.description}`}
        style={{
          opacity: isUnconfigured ? 0.75 : 1,
          border: isUnconfigured ? '1px dashed var(--color-warning)' : '1px solid var(--border-color)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '4px',
              background: isUnconfigured ? 'rgba(249, 115, 22, 0.1)' : 'rgba(37, 99, 235, 0.1)',
              color: isUnconfigured ? 'var(--color-warning)' : 'var(--precision-blue)',
              display: 'grid',
              placeItems: 'center'
            }}
            aria-hidden="true"
          >
            <IconComp size={18} />
          </div>

          {isUnconfigured ? (
            <span className="badge badge-warning mono-data" style={{ fontSize: '0.625rem' }}>
              <AlertTriangle size={10} aria-hidden="true" /> NOT SET UP YET
            </span>
          ) : (
            <span className="badge badge-info mono-data" style={{ fontSize: '0.65rem' }}>
              {cat.activeCount} ACTIVE
            </span>
          )}
        </div>

        <div style={{ fontWeight: 800, fontSize: '0.85rem', marginBottom: '2px', textAlign: 'left' }}>
          {cat.name}
        </div>

        <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)', lineHeight: 1.3, textAlign: 'left', minHeight: '32px' }}>
          {cat.description}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.6rem', paddingTop: '0.4rem', borderTop: '1px solid var(--border-color)' }}>
          <span className="mono-data" style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>
            Total: {cat.count}
          </span>
          <span className="mono-data" style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--precision-blue)', display: 'flex', alignItems: 'center', gap: '2px' }}>
            MANAGE <ArrowUpRight size={11} aria-hidden="true" />
          </span>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Section 1: Physical Infrastructure Hierarchy */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '16px', background: '#2563eb', display: 'inline-block' }} aria-hidden="true" />
            Physical Hierarchy Master Data (7 Categories)
          </h3>
          <span className="mono-data" style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
            Company &gt; Projects &gt; Buildings &gt; Towers &gt; Floors &gt; Units
          </span>
        </div>

        <div className="section-tiles-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
          {hierarchyCategories.map(renderCategoryTile)}
        </div>
      </div>

      {/* Section 2: Operational & Financial Reference Data */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '16px', background: '#16a34a', display: 'inline-block' }} aria-hidden="true" />
            Operational & Financial Reference Data (6 Categories)
          </h3>
          <span className="mono-data" style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
            Vendors, Dealers, Employees, Banks, Tax, Payment Modes
          </span>
        </div>

        <div className="section-tiles-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
          {referenceCategories.map(renderCategoryTile)}
        </div>
      </div>
    </div>
  );
});
