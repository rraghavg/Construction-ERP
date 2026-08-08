import { useState, memo, useMemo, useCallback } from 'react';
import { useApp } from '../../../../core/providers/AppContext';
import { Search, Filter, Phone, Mail, Calendar, UserCheck, Plus, ArrowUpRight } from 'lucide-react';

export const CrmLeadsDirectoryView = memo(function CrmLeadsDirectoryView({ onOpenAddModal, onOpenFollowUp }) {
  const { leads, selectedLead, setSelectedLead, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sourceFilter, setSourceFilter] = useState('ALL');

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.project.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;
      const matchesSource = sourceFilter === 'ALL' || lead.source === sourceFilter;
      return matchesSearch && matchesStatus && matchesSource;
    });
  }, [leads, searchTerm, statusFilter, sourceFilter]);

  const handleRowClick = useCallback((lead) => {
    setSelectedLead(lead);
  }, [setSelectedLead]);

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '16px', background: '#2563eb', display: 'inline-block' }} aria-hidden="true" />
            Leads Directory & Pipeline Management
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Interactive master database of all active sales prospects and inquiries
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={onOpenAddModal}>
          <Plus size={14} aria-hidden="true" /> ADD NEW LEAD
        </button>
      </div>

      {/* Filter Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-control"
            placeholder="Search leads by name, phone, email, project..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '32px', fontSize: '0.75rem' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Filter size={13} style={{ color: 'var(--text-muted)' }} />
          <select className="form-control" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ fontSize: '0.75rem' }}>
            <option value="ALL">All Statuses</option>
            <option value="NEW">New Inquiry</option>
            <option value="CONTACTED">Contacted</option>
            <option value="SITE_VISIT_SCHEDULED">Site Visit Scheduled</option>
            <option value="NEGOTIATION">Negotiation</option>
            <option value="BOOKED">Booked</option>
            <option value="LOST">Lost</option>
          </select>

          <select className="form-control" value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)} style={{ fontSize: '0.75rem' }}>
            <option value="ALL">All Sources</option>
            <option value="Website">Website Direct</option>
            <option value="Property Portal">MagicBricks / Housing</option>
            <option value="Walk-in">Site Walk-in</option>
            <option value="Referral">Customer Referral</option>
            <option value="Social Media">Meta / Google Ads</option>
          </select>
        </div>
      </div>

      {/* Directory Table */}
      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>LEAD ID</th>
              <th>PROSPECT NAME</th>
              <th>PROJECT INTEREST</th>
              <th>BUDGET</th>
              <th>SOURCE</th>
              <th>STATUS</th>
              <th>ASSIGNED TO</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => {
              const isSelected = selectedLead?.id === lead.id;
              return (
                <tr
                  key={lead.id}
                  onClick={() => handleRowClick(lead)}
                  style={{
                    cursor: 'pointer',
                    background: isSelected ? 'rgba(37, 99, 235, 0.12)' : undefined
                  }}
                >
                  <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>
                    {lead.id}
                  </td>
                  <td>
                    <div style={{ fontWeight: 700 }}>{lead.name}</div>
                    <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>{lead.phone} • {lead.email}</div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{lead.project || 'Green Heights'}</td>
                  <td className="mono-data">₹{lead.budget || '85.0 L'}</td>
                  <td><span className="badge badge-info">{lead.source || 'Website'}</span></td>
                  <td>
                    <span className={`badge ${lead.status === 'BOOKED' ? 'badge-success' : lead.status === 'LOST' ? 'badge-danger' : 'badge-warning'}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td>{lead.assignedTo || 'Rahul Sharma'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button
                        className="btn btn-secondary btn-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenFollowUp(lead);
                        }}
                        title="Schedule Follow-up"
                      >
                        <Calendar size={12} />
                      </button>
                      <button
                        className="btn btn-primary btn-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          showToast(`Initiated call to ${lead.phone}`, 'info');
                        }}
                        title="Call Prospect"
                      >
                        <Phone size={12} />
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
