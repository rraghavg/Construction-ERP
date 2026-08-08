import { memo } from 'react';
import { useApp } from '../../../../core/providers/AppContext';
import { TrendingUp, User, Calendar, IndianRupee, MoveRight } from 'lucide-react';

export const CrmSalesPipelineKanbanView = memo(function CrmSalesPipelineKanbanView() {
  const { leads, setSelectedLead } = useApp();

  const columns = [
    { title: 'NEW INQUIRY', status: 'NEW', color: '#3b82f6' },
    { title: 'CONTACTED', status: 'CONTACTED', color: '#f59e0b' },
    { title: 'SITE VISIT', status: 'SITE_VISIT_SCHEDULED', color: '#8b5cf6' },
    { title: 'NEGOTIATION', status: 'NEGOTIATION', color: '#ec4899' },
    { title: 'BOOKED / WON', status: 'BOOKED', color: '#10b981' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={18} style={{ color: 'var(--precision-blue)' }} />
            Visual Sales Pipeline (Kanban Board)
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Stage-based conversion pipeline across all active real estate prospects
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem', overflowX: 'auto' }}>
        {columns.map((col) => {
          const colLeads = leads.filter((l) => l.status === col.status || (col.status === 'NEW' && !l.status));
          return (
            <div key={col.status} className="anodized-panel" style={{ padding: '0.75rem', background: 'rgba(15, 23, 42, 0.4)' }}>
              <div style={{ borderBottom: `2px solid ${col.color}`, paddingBottom: '6px', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800 }}>{col.title}</span>
                <span className="badge badge-info mono-data" style={{ fontSize: '0.6rem' }}>{colLeads.length}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {colLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    style={{
                      background: 'rgba(30, 41, 59, 0.7)',
                      padding: '0.65rem',
                      borderRadius: '4px',
                      border: '1px solid var(--border-color)',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontSize: '0.775rem', fontWeight: 700, marginBottom: '2px' }}>{lead.name}</div>
                    <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>{lead.project || 'Green Heights'}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                      <span className="mono-data" style={{ fontSize: '0.65rem', color: 'var(--precision-blue)', fontWeight: 700 }}>₹{lead.budget || '85 L'}</span>
                      <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>{lead.source}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
