import { memo, useState, useMemo } from 'react';
import { useApp } from '../../../../core/providers/AppContext';
import { Wrench, Search, Filter, Plus, AlertCircle } from 'lucide-react';

export const MaintenanceComplaintsRegisterView = memo(function MaintenanceComplaintsRegisterView({ onOpenAddModal, onOpenDetails }) {
  const { complaints, setSelectedComplaint } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('ALL');

  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.resident.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriority = priorityFilter === 'ALL' || c.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    });
  }, [complaints, searchTerm, priorityFilter]);

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Wrench size={18} style={{ color: 'var(--precision-blue)' }} />
            Complaints Register & Ticket Management Desk
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Resident maintenance complaints, priority assignment, SLA breach tracking, and resolution logs
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={onOpenAddModal}>
          <Plus size={14} /> RAISE COMPLAINT
        </button>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-control"
            placeholder="Search complaints by title, unit, resident..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '32px', fontSize: '0.75rem' }}
          />
        </div>

        <select className="form-control" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} style={{ fontSize: '0.75rem', width: '180px' }}>
          <option value="ALL">All Priorities</option>
          <option value="CRITICAL">Critical Priority</option>
          <option value="HIGH">High Priority</option>
          <option value="MEDIUM">Medium Priority</option>
          <option value="LOW">Low Priority</option>
        </select>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>TICKET ID</th>
              <th>ISSUE TITLE</th>
              <th>UNIT</th>
              <th>RESIDENT</th>
              <th>CATEGORY</th>
              <th>PRIORITY</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map((c) => (
              <tr
                key={c.id}
                onClick={() => {
                  setSelectedComplaint(c);
                  onOpenDetails(c);
                }}
                style={{ cursor: 'pointer' }}
              >
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{c.id}</td>
                <td style={{ fontWeight: 700 }}>{c.title}</td>
                <td className="mono-data">{c.unit}</td>
                <td>{c.resident}</td>
                <td>{c.category}</td>
                <td>
                  <span className={`badge ${c.priority === 'CRITICAL' || c.priority === 'HIGH' ? 'badge-danger' : 'badge-warning'}`}>
                    {c.priority}
                  </span>
                </td>
                <td>
                  <span className={`badge ${c.status === 'RESOLVED' ? 'badge-success' : 'badge-info'}`}>
                    {c.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-secondary btn-xs">Ticket Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
