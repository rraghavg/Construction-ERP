import { memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Star, Compass } from 'lucide-react';

export const SiteVisitDetailsPanel = memo(function SiteVisitDetailsPanel({ onOpenFollowUp }) {
  const { selectedLead, navigateTo } = useApp();

  const handleFullHistory = useCallback(() => {
    navigateTo('crm', 'Site Visits');
  }, [navigateTo]);

  if (!selectedLead || !selectedLead.siteVisit) {
    return (
      <div className="panel-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', padding: '1.5rem 0' }}>
          <Compass size={24} style={{ marginBottom: '6px', opacity: 0.6 }} aria-hidden="true" />
          <p className="mono-data">NO_SITE_VISIT_RECORDED</p>
          <p style={{ fontSize: '0.7rem', marginTop: '4px' }}>
            Schedule a site visit for {selectedLead?.name || 'this lead'} to record driver feedback & rating.
          </p>
        </div>
      </div>
    );
  }

  const visit = selectedLead.siteVisit;

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <MapPin size={14} color="var(--precision-blue)" aria-hidden="true" /> Site Visit Companion
        </h4>
        <span className="badge badge-success">COMPLETED</span>
      </div>

      {/* Visit Summary Card */}
      <div className="structural-card" style={{ padding: '0.75rem', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ fontWeight: 800, fontSize: '0.8rem' }}>{visit.siteName}</span>
          <div
            style={{ display: 'flex', gap: '2px', color: '#f59e0b' }}
            aria-label={`Rating: ${visit.rating} out of 5 stars`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                fill={i < visit.rating ? '#f59e0b' : 'none'}
                color="#f59e0b"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '0.725rem' }}>
          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.625rem', display: 'block' }}>VISIT DATE</span>
            <span className="mono-data">{visit.date}</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.625rem', display: 'block' }}>DRIVER / PICKUP</span>
            <span>{visit.driverAssigned}</span>
          </div>
        </div>
      </div>

      {/* Feedback & Remarks */}
      <div style={{ background: 'var(--bg-input)', padding: '0.65rem', borderRadius: '4px', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
        <div style={{ fontWeight: 700, fontSize: '0.675rem', color: 'var(--text-muted)', marginBottom: '2px' }}>CUSTOMER FEEDBACK</div>
        <div>"{visit.feedback}"</div>
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
        <button
          className="widget-action-link mono-data"
          onClick={handleFullHistory}
          style={{ fontSize: '0.7rem' }}
        >
          FULL HISTORY
        </button>
        <button className="btn btn-secondary btn-sm" onClick={() => onOpenFollowUp(selectedLead)}>
          SCHEDULE RE-VISIT
        </button>
      </div>
    </div>
  );
});
