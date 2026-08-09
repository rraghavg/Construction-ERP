import { memo, useState, useMemo } from 'react';
import { useApp } from '../../../../core/providers/AppContext';
import { Building2, Search, Filter, Plus, FileText } from 'lucide-react';

export const SalesBookingsListView = memo(function SalesBookingsListView({ onOpenAddModal, onOpenBookingDetails }) {
  const { bookings, setSelectedBooking } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState('ALL');

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const term = (searchTerm || '').toLowerCase();
      const matchesSearch =
        (b.customerName || '').toLowerCase().includes(term) ||
        (b.id || '').toLowerCase().includes(term) ||
        (b.unitNumber || '').toLowerCase().includes(term);
      const matchesProject = projectFilter === 'ALL' || b.project === projectFilter;
      return matchesSearch && matchesProject;
    });
  }, [bookings, searchTerm, projectFilter]);

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building2 size={18} style={{ color: 'var(--precision-blue)' }} />
            Bookings & Unit Sales Master Directory
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Master ledger of all executed property unit bookings, agreements, and agreement values
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={onOpenAddModal}>
          <Plus size={14} /> NEW BOOKING
        </button>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-control"
            placeholder="Search bookings by customer, unit number, booking ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '32px', fontSize: '0.75rem' }}
          />
        </div>

        <select className="form-control" value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)} style={{ fontSize: '0.75rem', width: '180px' }}>
          <option value="ALL">All Projects</option>
          <option value="Green Heights">Green Heights</option>
          <option value="Prime Residency">Prime Residency</option>
          <option value="Sunshine Towers">Sunshine Towers</option>
        </select>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>BOOKING ID</th>
              <th>CUSTOMER NAME</th>
              <th>PROJECT</th>
              <th>UNIT NO.</th>
              <th>AGREEMENT VALUE</th>
              <th>AMOUNT RECEIVED</th>
              <th>BALANCE DUE</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((b) => (
              <tr
                key={b.id}
                onClick={() => {
                  setSelectedBooking(b);
                  onOpenBookingDetails(b);
                }}
                style={{ cursor: 'pointer' }}
              >
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{b.id}</td>
                <td style={{ fontWeight: 700 }}>{b.customerName}</td>
                <td>{b.project}</td>
                <td className="mono-data" style={{ fontWeight: 700 }}>{b.unitNumber}</td>
                <td className="mono-data">₹{b.agreementValue}</td>
                <td className="mono-data" style={{ color: 'var(--emerald)', fontWeight: 700 }}>₹{b.amountReceived}</td>
                <td className="mono-data" style={{ color: 'var(--amber)' }}>₹{b.balanceDue}</td>
                <td><span className="badge badge-success">{b.status}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button className="btn btn-secondary btn-xs">
                      <FileText size={11} /> View
                    </button>
                    <button 
                      className="btn btn-secondary btn-xs" 
                      style={{ color: 'var(--m3-error)', borderColor: 'var(--m3-error-container)' }}
                      onClick={(e) => { e.stopPropagation(); alert(`Initiating Buyback for Booking ${b.id}`); }}
                    >
                      Buyback
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
