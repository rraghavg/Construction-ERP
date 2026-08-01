import { useState, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  Clock,
  ArrowRight,
  CheckCircle,
  Edit3
} from 'lucide-react';
import { StatusBadge } from '../shared/StatusBadge';

export const LeadDetailsPanel = memo(function LeadDetailsPanel({ onOpenFollowUp, onOpenAddModal }) {
  const { selectedLead, convertToCustomer, userRole } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const handleConvert = useCallback(() => {
    if (selectedLead) {
      convertToCustomer(selectedLead.id);
    }
  }, [selectedLead, convertToCustomer]);

  if (!selectedLead) {
    return (
      <div className="panel-card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p className="mono-data">NO_LEAD_SELECTED</p>
      </div>
    );
  }

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      {/* Header Profile */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'var(--structural-slate)',
              color: '#ffffff',
              display: 'grid',
              placeItems: 'center',
              fontWeight: '800',
              fontSize: '1rem',
              fontFamily: 'var(--font-mono)'
            }}
            aria-hidden="true"
          >
            {selectedLead.initials}
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>{selectedLead.name}</h3>
            <div className="mono-data" style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
              {selectedLead.id} | Added {selectedLead.timeline?.[0]?.date || 'Recently'}
            </div>
          </div>
        </div>

        <StatusBadge status={selectedLead.status} />
      </div>

      {/* Quick Action Pills */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', background: 'var(--bg-input)', padding: '0.4rem 0.6rem', borderRadius: '4px' }}>
          <Phone size={13} color="var(--precision-blue)" aria-hidden="true" />
          <span className="mono-data">{selectedLead.mobile}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', background: 'var(--bg-input)', padding: '0.4rem 0.6rem', borderRadius: '4px' }}>
          <Mail size={13} color="var(--precision-blue)" aria-hidden="true" />
          <span className="mono-data" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{selectedLead.email}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', background: 'var(--bg-input)', padding: '0.4rem 0.6rem', borderRadius: '4px' }}>
          <MapPin size={13} color="var(--precision-blue)" aria-hidden="true" />
          <span>{selectedLead.location}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', background: 'var(--bg-input)', padding: '0.4rem 0.6rem', borderRadius: '4px' }}>
          <User size={13} color="var(--precision-blue)" aria-hidden="true" />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{selectedLead.assignedTo}</span>
        </div>
      </div>

      {/* Info Grid */}
      <div className="structural-card" style={{ padding: '0.75rem', marginBottom: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.75rem' }}>
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.65rem' }}>INTERESTED SITE</span>
            <span style={{ fontWeight: 700 }}>{selectedLead.projectInterested}</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.65rem' }}>BUDGET RANGE</span>
            <span className="mono-data" style={{ fontWeight: 800, color: 'var(--precision-blue)' }}>{selectedLead.budget}</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.65rem' }}>REQUIREMENT</span>
            <span>{selectedLead.requirement}</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.65rem' }}>LEAD SOURCE</span>
            <span>{selectedLead.source}</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div
        role="tablist"
        aria-label="Lead details section tabs"
        style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', marginBottom: '1rem' }}
      >
        <button
          role="tab"
          id="tab-overview"
          aria-selected={activeTab === 'overview'}
          aria-controls="panel-overview"
          className={`btn ${activeTab === 'overview' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          onClick={() => handleTabChange('overview')}
          style={{ borderRadius: '2px 2px 0 0', flex: 1 }}
        >
          Timeline
        </button>
        <button
          role="tab"
          id="tab-remarks"
          aria-selected={activeTab === 'remarks'}
          aria-controls="panel-remarks"
          className={`btn ${activeTab === 'remarks' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          onClick={() => handleTabChange('remarks')}
          style={{ borderRadius: '2px 2px 0 0', flex: 1 }}
        >
          Remarks
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'overview' && (
        <div id="panel-overview" role="tabpanel" aria-labelledby="tab-overview">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem', maxHeight: '160px', overflowY: 'auto' }}>
            {selectedLead.timeline?.map((item) => (
              <div key={item.id} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '0.725rem' }}>
                <Clock size={13} color="var(--precision-blue)" style={{ marginTop: '2px', flexShrink: 0 }} aria-hidden="true" />
                <div>
                  <div style={{ fontWeight: 700 }}>{item.title}</div>
                  <div className="mono-data" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{item.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'remarks' && (
        <div id="panel-remarks" role="tabpanel" aria-labelledby="tab-remarks">
          <div style={{ padding: '0.65rem', background: 'var(--bg-input)', borderRadius: '4px', fontSize: '0.775rem', marginBottom: '1rem' }}>
            {selectedLead.remarks}
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div style={{ display: 'flex', gap: '8px', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
        <button
          className="btn btn-secondary btn-sm"
          style={{ flex: 1 }}
          onClick={() => onOpenFollowUp(selectedLead)}
        >
          <Calendar size={13} aria-hidden="true" /> Follow-up
        </button>
        <button
          className="btn btn-primary btn-sm"
          style={{ flex: 1, background: selectedLead.status === 'Converted' ? '#15803d' : undefined }}
          onClick={handleConvert}
          disabled={selectedLead.status === 'Converted' || userRole === 'Auditor (Read-Only)'}
        >
          {selectedLead.status === 'Converted' ? (
            <>
              <CheckCircle size={13} aria-hidden="true" /> CONVERTED
            </>
          ) : (
            <>
              <ArrowRight size={13} aria-hidden="true" /> CONVERT TO CUSTOMER
            </>
          )}
        </button>
      </div>
    </div>
  );
});
