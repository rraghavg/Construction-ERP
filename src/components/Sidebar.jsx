import { useState, useMemo, memo, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { MODULES_LIST } from '../data/mockData';
import {
  Building2,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Search,
  LayoutDashboard,
  Database,
  Users,
  TrendingUp,
  Headphones,
  KeyRound,
  Wrench,
  Boxes,
  IndianRupee,
  UserCheck,
  FileText,
  Bell,
  BarChart3,
  ShieldCheck,
  ShieldAlert,
  Settings
} from 'lucide-react';

const ICON_MAP = {
  LayoutDashboard,
  Database,
  Users,
  TrendingUp,
  Headphones,
  KeyRound,
  Wrench,
  Boxes,
  IndianRupee,
  UserCheck,
  FileText,
  Bell,
  BarChart3,
  ShieldCheck,
  ShieldAlert,
  Settings
};

export const Sidebar = memo(function Sidebar() {
  const {
    activeModule,
    activeSubmodule,
    navigateTo,
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileMenuOpen
  } = useApp();

  const [expandedModule, setExpandedModule] = useState(activeModule);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleAccordion = useCallback((id) => {
    setExpandedModule((prev) => (prev === id ? null : id));
  }, []);

  const renderIcon = (iconName) => {
    const IconComp = ICON_MAP[iconName] || Building2;
    return <IconComp size={18} aria-hidden="true" />;
  };

  const handleModuleClick = useCallback((modId) => {
    navigateTo(modId);
    toggleAccordion(modId);
  }, [navigateTo, toggleAccordion]);

  const handleModuleKeyDown = useCallback((e, modId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleModuleClick(modId);
    }
  }, [handleModuleClick]);

  const handleSubmoduleKeyDown = useCallback((e, modId, sub) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigateTo(modId, sub);
    }
  }, [navigateTo]);

  // Filter modules/submodules dynamically when user types in sidebar search
  const filteredModules = useMemo(() => {
    if (!searchTerm.trim()) return MODULES_LIST;
    const term = searchTerm.toLowerCase();

    return MODULES_LIST.filter((mod) => {
      const matchMod = mod.name.toLowerCase().includes(term);
      const matchSub = mod.submodules?.some((sub) => sub.toLowerCase().includes(term));
      return matchMod || matchSub;
    });
  }, [searchTerm]);

  return (
    <aside
      className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}
      aria-label="Main navigation"
    >
      {/* Brand Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: sidebarCollapsed ? 'center' : 'space-between',
          padding: '1rem',
          borderBottom: '1px solid var(--sidebar-border)',
          background: 'rgba(0, 0, 0, 0.2)'
        }}
      >
        {!sidebarCollapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                display: 'grid',
                placeItems: 'center',
                color: '#ffffff',
                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.4)'
              }}
              aria-hidden="true"
            >
              <Building2 size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                APEX ERP
              </div>
              <div className="mono-data" style={{ fontSize: '0.625rem', color: 'var(--sidebar-text-muted)', marginTop: '2px' }}>
                CONSTRUCTION V2.4
              </div>
            </div>
          </div>
        )}

        <button
          className="btn btn-sm"
          style={{
            padding: '0.4rem',
            background: 'rgba(255, 255, 255, 0.06)',
            borderColor: 'rgba(255, 255, 255, 0.15)',
            color: '#ffffff'
          }}
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          aria-label={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {sidebarCollapsed ? <ChevronRight size={16} aria-hidden="true" /> : <ChevronLeft size={16} aria-hidden="true" />}
        </button>
      </div>

      {/* Active Project Scaffold Card */}
      {!sidebarCollapsed && (
        <div style={{ padding: '0.75rem 0.85rem 0.25rem 0.85rem' }}>
          <div
            style={{
              padding: '0.6rem 0.75rem',
              borderRadius: '4px',
              background: 'rgba(37, 99, 235, 0.12)',
              border: '1px solid rgba(37, 99, 235, 0.3)'
            }}
          >
            <div className="mono-data" style={{ fontSize: '0.6rem', color: '#60a5fa', fontWeight: 800, textTransform: 'uppercase' }}>
              PROJECT SCAFFOLD
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, marginTop: '2px', color: '#ffffff' }}>
              Green Heights Ph. II
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--sidebar-text-muted)' }}>Steel & Superstructure</div>
          </div>
        </div>
      )}

      {/* Quick Search Filter Bar */}
      {!sidebarCollapsed && (
        <div style={{ padding: '0.5rem 0.85rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '4px',
              padding: '0.35rem 0.6rem'
            }}
          >
            <Search size={13} color="var(--sidebar-text-muted)" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search modules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                outline: 'none',
                width: '100%',
                fontSize: '0.725rem',
                fontFamily: 'var(--font-main)'
              }}
            />
          </div>
        </div>
      )}

      {/* Unified 15 Modules Navigation List */}
      <nav className="nav-section" style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 0.65rem' }} aria-label="Modules list">
        {filteredModules.map((mod) => {
          const isActive = activeModule === mod.id;
          const isExpanded = expandedModule === mod.id || searchTerm.length > 0;

          return (
            <div key={mod.id} className="nav-item-wrapper" style={{ marginBottom: '3px' }}>
              <div
                tabIndex={0}
                role="button"
                aria-expanded={isExpanded}
                title={sidebarCollapsed ? mod.name : undefined}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => handleModuleClick(mod.id)}
                onKeyDown={(e) => handleModuleKeyDown(e, mod.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: sidebarCollapsed ? 'center' : 'space-between',
                  padding: sidebarCollapsed ? '0.65rem 0' : '0.55rem 0.75rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  background: isActive ? 'var(--sidebar-active-bg)' : 'transparent',
                  borderLeft: isActive ? '3px solid #2563eb' : '3px solid transparent'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ color: isActive ? '#60a5fa' : 'var(--sidebar-text-muted)' }} aria-hidden="true">
                    {renderIcon(mod.icon)}
                  </div>
                  {!sidebarCollapsed && (
                    <span style={{ fontSize: '0.8rem', color: isActive ? '#ffffff' : 'var(--sidebar-text)', fontWeight: isActive ? 800 : 600 }}>
                      {mod.name}
                    </span>
                  )}
                </div>

                {!sidebarCollapsed && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {mod.badge && (
                      <span
                        className="mono-data"
                        style={{
                          fontSize: '0.6rem',
                          padding: '2px 5px',
                          borderRadius: '3px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          color: '#ffffff'
                        }}
                      >
                        {mod.badge}
                      </span>
                    )}
                    {mod.submodules && mod.submodules.length > 0 && (
                      <div style={{ color: 'var(--sidebar-text-muted)' }} aria-hidden="true">
                        {isExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {!sidebarCollapsed && isExpanded && mod.submodules && (
                <div
                  className="submodules-list"
                  role="group"
                  aria-label={`${mod.name} submodules`}
                  style={{
                    paddingLeft: '1.85rem',
                    marginTop: '2px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                    marginLeft: '1rem'
                  }}
                >
                  {mod.submodules.map((sub) => {
                    const isSubActive = isActive && activeSubmodule === sub;

                    return (
                      <div
                        key={sub}
                        tabIndex={0}
                        role="button"
                        className={`submodule-item ${isSubActive ? 'active' : ''}`}
                        onClick={() => navigateTo(mod.id, sub)}
                        onKeyDown={(e) => handleSubmoduleKeyDown(e, mod.id, sub)}
                        style={{
                          fontSize: '0.725rem',
                          padding: '4px 8px',
                          borderRadius: '3px',
                          cursor: 'pointer',
                          color: isSubActive ? '#60a5fa' : 'var(--sidebar-text-muted)',
                          fontWeight: isSubActive ? 800 : 500,
                          background: isSubActive ? 'rgba(37, 99, 235, 0.15)' : 'transparent'
                        }}
                      >
                        {sub}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer System Settings Link */}
      <div style={{ padding: '0.65rem', borderTop: '1px solid var(--sidebar-border)' }}>
        <button
          className={`nav-item ${activeModule === 'settings' ? 'active' : ''}`}
          onClick={() => navigateTo('settings')}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
            gap: '10px',
            padding: '0.5rem 0.75rem',
            background: 'transparent',
            border: 'none',
            borderRadius: '4px',
            color: 'var(--sidebar-text-muted)',
            cursor: 'pointer'
          }}
          title="System Settings"
          aria-label="System Settings"
        >
          <Settings size={18} aria-hidden="true" color="var(--sidebar-text-muted)" />
          {!sidebarCollapsed && (
            <span style={{ fontSize: '0.8rem', color: 'var(--sidebar-text)', fontWeight: 600 }}>System Settings</span>
          )}
        </button>
      </div>
    </aside>
  );
});
