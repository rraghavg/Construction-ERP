import { memo } from 'react';
import { ShieldCheck, Check, X } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const UserMgmtPermissionMatrixView = memo(function UserMgmtPermissionMatrixView() {
  const { showToast } = useApp();

  const permissions = [
    { module: 'Master Data', admin: true, manager: true, sales: false, accounts: false },
    { module: 'CRM & Leads', admin: true, manager: true, sales: true, accounts: false },
    { module: 'Sales & Bookings', admin: true, manager: true, sales: true, accounts: true },
    { module: 'Finance & Accounts', admin: true, manager: false, sales: false, accounts: true },
    { module: 'Inventory & Materials', admin: true, manager: true, sales: false, accounts: false },
    { module: 'HR & Payroll', admin: true, manager: false, sales: false, accounts: false }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} style={{ color: 'var(--precision-blue)' }} />
            Granular Module Permission Checkbox Matrix
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Configure read, write, export, and delete entitlement flags across all system roles
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => showToast('Saved permission matrix changes', 'success')}>
          SAVE PERMISSION MATRIX
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>MODULE NAME</th>
              <th>SUPER ADMIN</th>
              <th>SITE MANAGER</th>
              <th>SALES EXECUTIVE</th>
              <th>ACCOUNTS OFFICER</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((p) => (
              <tr key={p.module}>
                <td style={{ fontWeight: 700 }}>{p.module}</td>
                <td><span className="badge badge-success"><Check size={12} /> FULL</span></td>
                <td>
                  {p.manager ? <span className="badge badge-success"><Check size={12} /> ALLOWED</span> : <span className="badge badge-danger"><X size={12} /> BLOCKED</span>}
                </td>
                <td>
                  {p.sales ? <span className="badge badge-success"><Check size={12} /> ALLOWED</span> : <span className="badge badge-danger"><X size={12} /> BLOCKED</span>}
                </td>
                <td>
                  {p.accounts ? <span className="badge badge-success"><Check size={12} /> ALLOWED</span> : <span className="badge badge-danger"><X size={12} /> BLOCKED</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
