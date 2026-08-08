import { useState, useMemo, memo, useCallback } from 'react';
import { useApp } from '../../core/providers/AppContext';
import { MODULES_LIST } from '../../data/mockData';
import {
  Building2,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
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
  Settings,
  ShoppingCart,
  HelpCircle,
  Plus
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
  Settings,
  ShoppingCart
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

  const toggleAccordion = useCallback((id) => {
    setExpandedModule((prev) => (prev === id ? null : id));
  }, []);

  const renderIcon = (iconName) => {
    const IconComp = ICON_MAP[iconName] || Building2;
    return <IconComp size={20} aria-hidden="true" />;
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

  return (
    <aside
      className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}
      aria-label="Main navigation"
    >
      {/* ── M3 Brand Header ── */}
      <div
        style={{
          padding: 'var(--container-padding)',
          paddingBottom: '16px'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: sidebarCollapsed ? 'center' : 'flex-start',
            justifyContent: sidebarCollapsed ? 'center' : 'space-between',
            marginBottom: sidebarCollapsed ? 0 : '20px'
          }}
        >
          {!sidebarCollapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: 'var(--m3-primary-container)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--m3-on-primary-container)',
                  fontWeight: 600,
                  fontSize: '16px'
                }}
                aria-hidden="true"
              >
                AX
              </div>
              <div>
                <div
                  style={{
                    fontSize: '22px',
                    fontWeight: 500,
                    lineHeight: '28px',
                    color: 'var(--m3-on-surface)'
                  }}
                >
                  Apex ERP
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                    lineHeight: '16px',
                    color: 'var(--m3-on-surface-variant)',
                    marginTop: '2px'
                  }}
                >
                  Construction Suite
                </div>
              </div>
            </div>
          )}

          {sidebarCollapsed && (
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: 'var(--m3-primary-container)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--m3-on-primary-container)',
                fontWeight: 600,
                fontSize: '16px',
                marginBottom: '8px'
              }}
              aria-hidden="true"
            >
              AX
            </div>
          )}
        </div>

        {/* New Project Button */}
        {!sidebarCollapsed && (
          <button
            style={{
              width: '100%',
              background: 'var(--m3-primary-container)',
              color: 'var(--m3-on-primary-container)',
              padding: '10px 16px',
              borderRadius: '8px',
              border: 'none',
              fontFamily: 'var(--font-main)',
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.1px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'filter 0.15s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = 'none'; }}
          >
            <Plus size={18} aria-hidden="true" />
            New Project
          </button>
        )}
      </div>

      {/* ── M3 Navigation Items ── */}
      <nav
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingTop: '8px',
          paddingBottom: '8px'
        }}
        aria-label="Modules list"
      >
        {MODULES_LIST.map((mod) => {
          const isActive = activeModule === mod.id;
          const isExpanded = expandedModule === mod.id;

          return (
            <div key={mod.id} style={{ marginBottom: '2px' }}>
              {/* Module Nav Item — M3 rounded-right-full */}
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
                  padding: sidebarCollapsed ? '12px 0' : '12px 24px',
                  borderRadius: sidebarCollapsed ? '0' : '0 9999px 9999px 0',
                  marginRight: sidebarCollapsed ? '0' : '16px',
                  cursor: 'pointer',
                  gap: '16px',
                  background: isActive ? 'var(--m3-secondary-container)' : 'transparent',
                  color: isActive ? 'var(--m3-on-secondary-container)' : 'var(--m3-on-surface-variant)',
                  transition: 'background 0.15s ease, color 0.15s ease',
                  border: 'none',
                  outline: 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                    {renderIcon(mod.icon)}
                  </span>
                  {!sidebarCollapsed && (
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: isActive ? 600 : 500,
                        letterSpacing: '0.1px',
                        lineHeight: '20px'
                      }}
                    >
                      {mod.name}
                    </span>
                  )}
                </div>

                {!sidebarCollapsed && mod.submodules && mod.submodules.length > 0 && (
                  <span style={{ display: 'flex', alignItems: 'center', opacity: 0.7 }}>
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </span>
                )}
              </div>

              {/* Submodule Accordion */}
              {!sidebarCollapsed && isExpanded && mod.submodules && (
                <div
                  role="group"
                  aria-label={`${mod.name} submodules`}
                  style={{
                    paddingLeft: '56px',
                    paddingRight: '16px',
                    marginTop: '2px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px'
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
                          fontSize: '14px',
                          letterSpacing: '0.25px',
                          lineHeight: '20px',
                          padding: '8px 16px',
                          borderRadius: '9999px',
                          cursor: 'pointer',
                          color: isSubActive ? 'var(--m3-primary)' : 'var(--m3-on-surface-variant)',
                          fontWeight: isSubActive ? 600 : 400,
                          background: isSubActive ? 'var(--color-info-bg)' : 'transparent',
                          transition: 'all 0.15s ease'
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

      {/* ── M3 Footer ── */}
      <div
        style={{
          padding: '16px',
          borderTop: '1px solid var(--m3-outline-variant)'
        }}
      >
        {/* Collapse Toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          aria-label={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
            padding: sidebarCollapsed ? '12px 0' : '12px 16px',
            justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
            background: 'transparent',
            border: 'none',
            borderRadius: '9999px',
            color: 'var(--m3-on-surface-variant)',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '0.1px',
            fontFamily: 'var(--font-main)',
            transition: 'background 0.15s ease',
            marginBottom: '4px'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--m3-surface-container-high)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
        >
          {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          {!sidebarCollapsed && <span>Collapse</span>}
        </button>

        {/* Help */}
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
            padding: sidebarCollapsed ? '12px 0' : '12px 16px',
            justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
            background: 'transparent',
            border: 'none',
            borderRadius: '9999px',
            color: 'var(--m3-on-surface-variant)',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '0.1px',
            fontFamily: 'var(--font-main)',
            transition: 'background 0.15s ease',
            marginBottom: '4px'
          }}
          title="Help"
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--m3-surface-container-high)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
        >
          <HelpCircle size={20} />
          {!sidebarCollapsed && <span>Help</span>}
        </button>

        {/* Settings */}
        <button
          className={`nav-item ${activeModule === 'settings' ? 'active' : ''}`}
          onClick={() => navigateTo('settings')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
            padding: sidebarCollapsed ? '12px 0' : '12px 16px',
            justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
            background: activeModule === 'settings' ? 'var(--m3-secondary-container)' : 'transparent',
            border: 'none',
            borderRadius: '9999px',
            color: activeModule === 'settings' ? 'var(--m3-on-secondary-container)' : 'var(--m3-on-surface-variant)',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: activeModule === 'settings' ? 600 : 500,
            letterSpacing: '0.1px',
            fontFamily: 'var(--font-main)',
            transition: 'background 0.15s ease'
          }}
          title="Settings"
          aria-label="Settings"
          onMouseEnter={(e) => {
            if (activeModule !== 'settings') e.currentTarget.style.background = 'var(--m3-surface-container-high)';
          }}
          onMouseLeave={(e) => {
            if (activeModule !== 'settings') e.currentTarget.style.background = 'transparent';
          }}
        >
          <Settings size={20} aria-hidden="true" />
          {!sidebarCollapsed && <span>Settings</span>}
        </button>
      </div>
    </aside>
  );
});
