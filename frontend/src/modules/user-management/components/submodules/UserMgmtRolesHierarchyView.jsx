import { memo } from 'react';
import { Shield, Plus } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const UserMgmtRolesHierarchyView = memo(function UserMgmtRolesHierarchyView() {
  const { showToast } = useApp();

  const roles = [
    { key: 'SUPER_ADMIN', name: 'Super Administrator', level: 'Level 0 (Global Platform)', usersCount: 2, desc: 'Full unrestricted tenant & platform access' },
    { key: 'ADMIN', name: 'System Administrator', level: 'Level 1 (Company Admin)', usersCount: 5, desc: 'Full operational access across all business modules' },
    { key: 'SITE_MANAGER', name: 'Project Site Manager', level: 'Level 2 (Project Scoped)', usersCount: 14, desc: 'Inventory, maintenance, and site operations access' },
    { key: 'SALES_EXECUTIVE', name: 'Sales Executive', level: 'Level 3 (CRM & Sales)', usersCount: 42, desc: 'Lead management, site visit logging, and booking entry' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={18} style={{ color: 'var(--precision-blue)' }} />
            RBAC System Roles & Authority Hierarchy
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Role definitions, level-based inheritance tree, and user count assignments
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => showToast('Opened role creation wizard', 'info')}>
          <Plus size={14} /> DEFINE NEW ROLE
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {roles.map((r) => (
          <div key={r.key} className="anodized-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="mono-data" style={{ fontSize: '0.65rem', color: 'var(--precision-blue)', fontWeight: 700 }}>{r.key}</span>
              <span className="badge badge-info mono-data">{r.usersCount} USERS</span>
            </div>
            <h4 style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: '4px' }}>{r.name}</h4>
            <div style={{ fontSize: '0.675rem', color: 'var(--amber)', marginBottom: '0.75rem' }}>{r.level}</div>
            <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{r.desc}</p>
            <button className="btn btn-secondary btn-xs" style={{ width: '100%' }} onClick={() => showToast(`Configured permissions for ${r.name}`, 'info')}>
              Edit Role Permissions
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});
