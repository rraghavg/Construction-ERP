import { useMemo, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { Phone, Edit3, ArrowRight } from 'lucide-react';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import { PanelHeader } from '../../../shared/components/PanelHeader';

export const RecentLeadsTable = memo(function RecentLeadsTable({ onOpenAddModal, onOpenFollowUp }) {
  const { leads, selectedLead, setSelectedLead, leadStatusFilter, navigateTo, showToast } = useApp();

  const filteredLeads = useMemo(() => {
    if (leadStatusFilter === 'all') return leads;
    return leads.filter((l) => l.status.toLowerCase().replace(/\s+/g, '') === leadStatusFilter.toLowerCase().replace(/\s+/g, ''));
  }, [leads, leadStatusFilter]);

  const handleLeadSelect = useCallback((lead) => {
    setSelectedLead(lead);
  }, [setSelectedLead]);

  const handleLeadKeyDown = useCallback((e, lead) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedLead(lead);
    }
  }, [setSelectedLead]);

  const handleCall = useCallback((e, lead) => {
    e.stopPropagation();
    showToast(`Initiating call with ${lead.name} (${lead.mobile})...`, 'info');
  }, [showToast]);

  const handleEdit = useCallback((e, lead) => {
    e.stopPropagation();
    setSelectedLead(lead);
    showToast(`Opening lead record ${lead.id} for editing`, 'info');
  }, [setSelectedLead, showToast]);

  const handleNavigateToLeads = useCallback(() => {
    navigateTo('crm', 'Leads');
  }, [navigateTo]);

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Recent Lead Activity"
        accentColor="#2563eb"
        actionLabel="ALL LEADS"
        onAction={handleNavigateToLeads}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary btn-sm" onClick={onOpenAddModal}>
            + ADD LEAD
          </button>
        </div>
      </PanelHeader>

      <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }} aria-label="Recent leads list">
          <thead>
            <tr style={{ background: 'var(--bg-input)', borderBottom: '1px solid var(--border-color)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.65rem 0.75rem' }}>LEAD NAME</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>PROJECT</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>BUDGET</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>STATUS</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>NEXT ACTION</th>
              <th style={{ padding: '0.65rem 0.75rem', textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => {
              const isSelected = selectedLead?.id === lead.id;

              return (
                <tr
                  key={lead.id}
                  tabIndex={0}
                  role="button"
                  onClick={() => handleLeadSelect(lead)}
                  onKeyDown={(e) => handleLeadKeyDown(e, lead)}
                  aria-selected={isSelected}
                  style={{
                    borderBottom: '1px solid var(--border-color)',
                    background: isSelected ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease'
                  }}
                >
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          background: 'var(--structural-slate)',
                          color: '#ffffff',
                          display: 'grid',
                          placeItems: 'center',
                          fontWeight: '800',
                          fontSize: '0.65rem',
                          fontFamily: 'var(--font-mono)'
                        }}
                        aria-hidden="true"
                      >
                        {lead.initials}
                      </div>
                      <div>
                        <div style={{ fontWeight: '700' }}>{lead.name}</div>
                        <div className="mono-data" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                          {lead.id} | {lead.mobile}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem' }}>{lead.projectInterested}</td>
                  <td className="mono-data" style={{ padding: '0.75rem', fontWeight: '700' }}>{lead.budget}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="mono-data" style={{ padding: '0.75rem', fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                    {lead.nextFollowUp}
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '4px' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '3px 7px' }}
                        onClick={(e) => handleCall(e, lead)}
                        title="Call Lead"
                        aria-label={`Call ${lead.name}`}
                      >
                        <Phone size={12} aria-hidden="true" />
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '3px 7px' }}
                        onClick={(e) => handleEdit(e, lead)}
                        title="Edit Lead"
                        aria-label={`Edit ${lead.name}`}
                      >
                        <Edit3 size={12} aria-hidden="true" />
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '3px 7px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenFollowUp(lead);
                        }}
                        title="Schedule Follow-up"
                        aria-label={`Schedule follow-up for ${lead.name}`}
                      >
                        <ArrowRight size={12} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
});
