import { memo, useState, useMemo } from 'react';
import { useApp } from '../../../../core/providers/AppContext';
import { Headphones, Search, Filter, Plus, ShieldCheck, FileText } from 'lucide-react';

export const CustomerDirectoryView = memo(function CustomerDirectoryView({ onOpenAddModal, onOpenCustomer360 }) {
  const { customers, setSelectedCustomer } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [kycFilter, setKycFilter] = useState('ALL');

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.unit.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesKyc = kycFilter === 'ALL' || c.kycStatus === kycFilter;
      return matchesSearch && matchesKyc;
    });
  }, [customers, searchTerm, kycFilter]);

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Headphones size={18} style={{ color: 'var(--precision-blue)' }} />
            Customer 360° Directory & Buyer Accounts
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Master directory of all onboarded real estate property buyers, KYC documents, and unit mappings
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={onOpenAddModal}>
          <Plus size={14} /> ONBOARD NEW CUSTOMER
        </button>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-control"
            placeholder="Search customers by name, phone, unit number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '32px', fontSize: '0.75rem' }}
          />
        </div>

        <select className="form-control" value={kycFilter} onChange={(e) => setKycFilter(e.target.value)} style={{ fontSize: '0.75rem', width: '180px' }}>
          <option value="ALL">All KYC Statuses</option>
          <option value="VERIFIED">KYC Verified</option>
          <option value="PENDING">KYC Pending</option>
          <option value="EXPIRING_SOON">Expiring Soon</option>
        </select>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>CUSTOMER ID</th>
              <th>NAME & CONTACT</th>
              <th>ASSIGNED UNIT</th>
              <th>PROJECT</th>
              <th>CITY</th>
              <th>KYC STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((c) => (
              <tr
                key={c.id}
                onClick={() => {
                  setSelectedCustomer(c);
                  onOpenCustomer360(c);
                }}
                style={{ cursor: 'pointer' }}
              >
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{c.id}</td>
                <td>
                  <div style={{ fontWeight: 700 }}>{c.name}</div>
                  <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>{c.phone} • {c.email}</div>
                </td>
                <td className="mono-data" style={{ fontWeight: 700 }}>{c.unit}</td>
                <td>{c.project}</td>
                <td>{c.city}</td>
                <td>
                  <span className={`badge ${c.kycStatus === 'VERIFIED' ? 'badge-success' : 'badge-warning'}`}>
                    {c.kycStatus}
                  </span>
                </td>
                <td>
                  <button className="btn btn-secondary btn-xs">
                    <FileText size={11} /> 360° Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
