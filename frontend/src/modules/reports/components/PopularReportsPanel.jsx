import { memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { POPULAR_REPORTS_LIST } from '../../../data/mockData';
import {
  TrendingUp,
  AlertCircle,
  IndianRupee,
  PieChart,
  FileText,
  Boxes,
  Receipt,
  Users,
  ArrowUpRight
} from 'lucide-react';

const ICON_MAP = {
  TrendingUp,
  AlertCircle,
  IndianRupee,
  PieChart,
  FileText,
  Boxes,
  Receipt,
  Users
};

export const PopularReportsPanel = memo(function PopularReportsPanel({ onSelectReport }) {
  const { navigateTo } = useApp();

  const handleReportClick = useCallback((report) => {
    onSelectReport(report);
  }, [onSelectReport]);

  const handleReportKeyDown = useCallback((e, report) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleReportClick(report);
    }
  }, [handleReportClick]);

  return (
    <div style={{ marginTop: '0.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
        <h3 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '16px', background: '#2563eb', display: 'inline-block' }} aria-hidden="true" />
          Popular Reports Library (Quick Launch)
        </h3>
        <span className="mono-data" style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
          8 FEATURED REPORTS
        </span>
      </div>

      <div className="section-tiles-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {POPULAR_REPORTS_LIST.map((tile) => {
          const IconComp = ICON_MAP[tile.icon] || FileText;

          return (
            <div
              key={tile.id}
              tabIndex={0}
              role="button"
              className="section-tile"
              onClick={() => handleReportClick(tile)}
              onKeyDown={(e) => handleReportKeyDown(e, tile)}
              aria-label={`Report: ${tile.name}. ${tile.module}`}
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
                  {tile.module}
                </span>
              </div>

              <div style={{ fontWeight: 800, fontSize: '0.825rem', marginBottom: '2px', textAlign: 'left' }}>
                {tile.name}
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
                VIEW REPORT <ArrowUpRight size={11} aria-hidden="true" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
