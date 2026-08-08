import { useState, useMemo, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { Search, Plus, Eye, Edit3, Trash2, ArrowLeft, Download, RefreshCw } from 'lucide-react';
import { PanelHeader } from '../../../shared/components/PanelHeader';

export const MasterCategoryListView = memo(function MasterCategoryListView({ category, onBack, onOpenAdd, onOpenEdit, onOpenDetail }) {
  const { masterRecords, deleteMasterRecord, toggleMasterStatus, userRole, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const categoryRecords = masterRecords[category.id] || [];

  const filteredRecords = useMemo(() => {
    return categoryRecords.filter((rec) => {
      // Status filter
      if (statusFilter === 'active' && rec.status !== 'Active') return false;
      if (statusFilter === 'inactive' && rec.status !== 'Inactive') return false;

      // Search filter across all keys
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return Object.values(rec).some((val) =>
        String(val).toLowerCase().includes(term)
      );
    });
  }, [categoryRecords, statusFilter, searchTerm]);

  const handleExport = useCallback(() => {
    showToast(`Exported ${filteredRecords.length} records of ${category.name} to CSV`, 'info');
  }, [filteredRecords.length, category.name, showToast]);

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button className="btn btn-secondary btn-sm" onClick={onBack} aria-label="Back to Category Tiles">
            <ArrowLeft size={14} aria-hidden="true" /> BACK TO TILES
          </button>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{category.name} Master List</h3>
            <p className="mono-data" style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
              {categoryRecords.length} Total Records | {categoryRecords.filter(r => r.status === 'Active').length} Active
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button className="btn btn-secondary btn-sm mono-data" onClick={handleExport} aria-label="Export dataset to CSV">
            <Download size={13} aria-hidden="true" /> EXPORT
          </button>
          {userRole !== 'Auditor (Read-Only)' && userRole !== 'Staff (Sales/Ops)' && (
            <button className="btn btn-primary btn-sm" onClick={onOpenAdd} aria-label={`Add new ${category.name} record`}>
              <Plus size={14} aria-hidden="true" /> ADD {category.name.toUpperCase()}
            </button>
          )}
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {/* Search */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            padding: '0.35rem 0.65rem',
            borderRadius: '4px',
            flex: 1,
            maxWidth: '320px'
          }}
        >
          <Search size={14} color="var(--text-muted)" aria-hidden="true" />
          <input
            type="text"
            placeholder={`Search ${category.name}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              outline: 'none',
              width: '100%',
              fontSize: '0.775rem',
              fontFamily: 'var(--font-main)'
            }}
          />
        </div>

        {/* Status Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <select
            className="select-input mono-data"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter status"
          >
            <option value="all">All Records ({categoryRecords.length})</option>
            <option value="active">Active Only ({categoryRecords.filter(r => r.status === 'Active').length})</option>
            <option value="inactive">Inactive Only ({categoryRecords.filter(r => r.status === 'Inactive').length})</option>
          </select>
        </div>
      </div>

      {/* Records Table */}
      <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }} aria-label={`${category.name} data table`}>
          <thead>
            <tr style={{ background: 'var(--bg-input)', borderBottom: '1px solid var(--border-color)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {category.fields.map((f) => (
                <th key={f.key} style={{ padding: '0.65rem 0.75rem', textTransform: 'uppercase' }}>
                  {f.label}
                </th>
              ))}
              <th style={{ padding: '0.65rem 0.75rem', textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((rec) => (
              <tr
                key={rec.id}
                style={{
                  borderBottom: '1px solid var(--border-color)',
                  opacity: rec.status === 'Inactive' ? 0.6 : 1,
                  transition: 'background 0.2s ease'
                }}
              >
                {category.fields.map((f) => {
                  const val = rec[f.key] || '--';

                  if (f.key === 'status') {
                    return (
                      <td key={f.key} style={{ padding: '0.75rem' }}>
                        <button
                          className={`badge ${val === 'Active' ? 'badge-success' : 'badge-warning'}`}
                          style={{ border: 'none', cursor: 'pointer' }}
                          onClick={() => toggleMasterStatus(category.id, rec.id)}
                          title="Click to toggle status"
                          aria-label={`Toggle status for ${rec.name || rec.code}`}
                        >
                          {val}
                        </button>
                      </td>
                    );
                  }

                  return (
                    <td
                      key={f.key}
                      className={f.key === 'code' || f.key === 'id' ? 'mono-data' : ''}
                      style={{
                        padding: '0.75rem',
                        fontWeight: f.key === 'name' || f.key === 'code' ? '700' : 'normal',
                        color: f.key === 'code' ? 'var(--precision-blue)' : 'inherit'
                      }}
                    >
                      {val}
                    </td>
                  );
                })}

                <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '4px' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '3px 7px' }}
                      onClick={() => onOpenDetail(rec)}
                      title="View Details"
                      aria-label={`View record ${rec.code || rec.name}`}
                    >
                      <Eye size={12} aria-hidden="true" />
                    </button>
                    {userRole !== 'Auditor (Read-Only)' && userRole !== 'Staff (Sales/Ops)' && (
                      <>
                        <button
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '3px 7px' }}
                          onClick={() => onOpenEdit(rec)}
                          title="Edit Record"
                          aria-label={`Edit record ${rec.code || rec.name}`}
                        >
                          <Edit3 size={12} aria-hidden="true" />
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '3px 7px', color: 'var(--color-danger)' }}
                          onClick={() => deleteMasterRecord(category.id, rec.id)}
                          title="Delete Record"
                          aria-label={`Delete record ${rec.code || rec.name}`}
                        >
                          <Trash2 size={12} aria-hidden="true" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {filteredRecords.length === 0 && (
              <tr>
                <td colSpan={category.fields.length + 1} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <div className="mono-data">NO_MATCHING_RECORDS_FOUND</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});
