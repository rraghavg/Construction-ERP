import { useState, useMemo, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { Eye, CheckCircle2, Search, Filter, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { PanelHeader } from '../shared/PanelHeader';

export const AuditSeverityBadge = memo(function AuditSeverityBadge({ severity }) {
  let badgeStyle = { bg: 'rgba(37, 99, 235, 0.12)', color: '#1d4ed8', border: 'rgba(37, 99, 235, 0.3)', label: 'LOW' };

  if (severity === 'medium') {
    badgeStyle = { bg: 'rgba(245, 158, 11, 0.12)', color: '#b45309', border: 'rgba(245, 158, 11, 0.3)', label: 'MEDIUM' };
  } else if (severity === 'high') {
    badgeStyle = { bg: 'rgba(220, 38, 38, 0.12)', color: '#b91c1c', border: 'rgba(220, 38, 38, 0.3)', label: 'HIGH' };
  } else if (severity === 'critical') {
    badgeStyle = { bg: 'rgba(153, 27, 27, 0.2)', color: '#991b1b', border: 'rgba(153, 27, 27, 0.4)', label: 'CRITICAL ⚠️' };
  }

  return (
    <span
      className="badge mono-data"
      style={{
        background: badgeStyle.bg,
        color: badgeStyle.color,
        border: `1px solid ${badgeStyle.border}`,
        fontSize: '0.625rem',
        fontWeight: 800
      }}
    >
      {badgeStyle.label}
    </span>
  );
});

export const AuditLogsTable = memo(function AuditLogsTable({ onSelectLog, onOpenExportModal }) {
  const { auditLogsList, selectedAuditLog, setSelectedAuditLog, markAuditLogReviewed } = useApp();

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  const filteredLogs = useMemo(() => {
    return auditLogsList.filter((item) => {
      // Tab Filter
      if (activeTab === 'logins' && item.category !== 'login') return false;
      if (activeTab === 'data_changes' && item.category !== 'data_change') return false;
      if (activeTab === 'critical' && item.severity !== 'critical') return false;
      if (activeTab === 'access' && item.category !== 'access_change') return false;

      // Module Filter
      if (moduleFilter !== 'all' && item.module !== moduleFilter) return false;

      // Severity Filter
      if (severityFilter !== 'all' && item.severity !== severityFilter) return false;

      // Search Query
      if (searchQuery.trim()) {
        const term = searchQuery.toLowerCase();
        const matchAction = item.action.toLowerCase().includes(term);
        const matchUser = item.user.toLowerCase().includes(term);
        const matchDetails = item.details.toLowerCase().includes(term);
        const matchIp = item.ipAddress.toLowerCase().includes(term);
        const matchId = item.id.toLowerCase().includes(term);
        if (!matchAction && !matchUser && !matchDetails && !matchIp && !matchId) return false;
      }

      return true;
    });
  }, [auditLogsList, activeTab, moduleFilter, severityFilter, searchQuery]);

  const handleLogSelect = useCallback((item) => {
    setSelectedAuditLog(item);
    onSelectLog(item);
  }, [setSelectedAuditLog, onSelectLog]);

  const handleLogKeyDown = useCallback((e, item) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleLogSelect(item);
    }
  }, [handleLogSelect]);

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Audit Event Log Stream & Activity Inspector"
        accentColor="#2563eb"
      >
        <button
          className="btn btn-secondary btn-sm"
          onClick={onOpenExportModal}
          aria-label="Export Audit Logs"
        >
          EXPORT LOGS ⬇️
        </button>
      </PanelHeader>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '6px', borderBottom: '1px solid var(--border-color)', marginBottom: '0.85rem', pb: '0.5rem', overflowX: 'auto' }}>
        {[
          { id: 'all', label: 'All Activities', count: auditLogsList.length },
          { id: 'logins', label: 'Logins', count: auditLogsList.filter((l) => l.category === 'login').length },
          { id: 'data_changes', label: 'Data Changes', count: auditLogsList.filter((l) => l.category === 'data_change').length },
          { id: 'critical', label: 'Critical Actions', count: auditLogsList.filter((l) => l.severity === 'critical').length },
          { id: 'access', label: 'Access Changes', count: auditLogsList.filter((l) => l.category === 'access_change').length }
        ].map((tab) => (
          <button
            key={tab.id}
            className={`btn btn-sm ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab(tab.id)}
            style={{ fontSize: '0.725rem', padding: '0.35rem 0.75rem', borderRadius: '4px' }}
          >
            {tab.label} <span className="mono-data" style={{ fontSize: '0.65rem', opacity: 0.8 }}>({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '0.3rem 0.6rem', flex: 1, minWidth: '200px' }}>
          <Search size={13} color="var(--text-muted)" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search audit action, user, IP, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', outline: 'none', width: '100%', fontSize: '0.75rem', fontFamily: 'var(--font-main)' }}
          />
        </div>

        <select
          className="select-input mono-data"
          value={moduleFilter}
          onChange={(e) => setModuleFilter(e.target.value)}
          aria-label="Filter by Module"
          style={{ fontSize: '0.7rem', padding: '0.3rem 0.5rem' }}
        >
          <option value="all">Module (All)</option>
          <option value="Finance">Finance</option>
          <option value="Inventory">Inventory</option>
          <option value="User Management">User Mgmt</option>
          <option value="Authentication">Authentication</option>
        </select>

        <select
          className="select-input mono-data"
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          aria-label="Filter by Severity"
          style={{ fontSize: '0.7rem', padding: '0.3rem 0.5rem' }}
        >
          <option value="all">Severity (All)</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }} aria-label="Audit logs table">
          <thead>
            <tr style={{ background: 'var(--bg-input)', borderBottom: '1px solid var(--border-color)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.65rem 0.75rem' }}>LOG ID</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>TIME & DATE</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>PERFORMED BY USER</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>ACTION PERFORMED</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>MODULE</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>IP ADDRESS & GEO</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>SEVERITY</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>STATUS</th>
              <th style={{ padding: '0.65rem 0.75rem', textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((item) => {
              const isSelected = selectedAuditLog?.id === item.id;

              return (
                <tr
                  key={item.id}
                  tabIndex={0}
                  role="button"
                  onClick={() => handleLogSelect(item)}
                  onKeyDown={(e) => handleLogKeyDown(e, item)}
                  aria-selected={isSelected}
                  style={{
                    borderBottom: '1px solid var(--border-color)',
                    background: isSelected ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                    borderLeft: item.severity === 'critical' ? '4px solid #dc2626' : '1px solid var(--border-color)',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease'
                  }}
                >
                  <td className="mono-data" style={{ padding: '0.75rem', fontWeight: '700', color: 'var(--precision-blue)' }}>
                    {item.id}
                  </td>
                  <td className="mono-data" style={{ padding: '0.75rem', fontSize: '0.725rem' }}>
                    {item.timestamp}
                  </td>
                  <td style={{ padding: '0.75rem', fontWeight: '700' }}>
                    {item.user}
                  </td>
                  <td style={{ padding: '0.75rem', fontWeight: '700', fontSize: '0.775rem' }}>
                    {item.action}
                  </td>
                  <td style={{ padding: '0.75rem', fontSize: '0.725rem' }}>
                    <span className="badge badge-info mono-data" style={{ fontSize: '0.625rem' }}>
                      {item.module}
                    </span>
                  </td>
                  <td className="mono-data" style={{ padding: '0.75rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {item.ipAddress} ({item.location})
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <AuditSeverityBadge severity={item.severity} />
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <span className={`badge ${item.status === 'Success' ? 'badge-success' : 'badge-danger'} mono-data`} style={{ fontSize: '0.625rem' }}>
                      {item.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '3px 7px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLogSelect(item);
                        }}
                        title="Inspect Log & JSON Diff"
                        aria-label={`Inspect ${item.id}`}
                      >
                        <Eye size={12} aria-hidden="true" />
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '3px 7px', color: item.reviewed ? '#16a34a' : 'var(--text-muted)' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          markAuditLogReviewed(item.id);
                        }}
                        title={item.reviewed ? 'Reviewed' : 'Mark as Reviewed'}
                        aria-label={`Mark ${item.id} reviewed`}
                      >
                        <CheckCircle2 size={12} aria-hidden="true" />
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
