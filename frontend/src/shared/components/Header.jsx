import { useState, useMemo, memo, useCallback } from 'react';
import { useApp } from '../../core/providers/AppContext';
import { MODULES_LIST, SETTINGS_MODULE, ROLE_PERMISSIONS } from '../../data/mockData';
import {
  RefreshCw,
  Sun,
  Moon,
  Bell,
  Menu,
  Search,
  Settings
} from 'lucide-react';
import { NotificationDrawer } from '../../modules/notifications/components/NotificationDrawer';

export const Header = memo(function Header() {
  const {
    activeModule,
    activeSubmodule,
    userRole,
    setUserRole,
    setMobileMenuOpen,
    theme,
    toggleTheme,
    navigateTo,
    showToast,
    unreadCount,
    isRefreshing,
    triggerRefresh
  } = useApp();

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const activeModuleData = useMemo(() => {
    return (
      MODULES_LIST.find((m) => m.id === activeModule) ||
      (activeModule === 'settings' ? SETTINGS_MODULE : null) || {
        name: 'Dashboard Overview'
      }
    );
  }, [activeModule]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, [setMobileMenuOpen]);

  const toggleNotifications = useCallback(() => {
    setNotificationOpen((prev) => !prev);
  }, []);

  const handleSearchKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      showToast(`Searching for "${searchQuery}"...`, 'info');
    }
  }, [searchQuery, showToast]);

  const handleManualRefresh = useCallback(() => {
    triggerRefresh(false);
  }, [triggerRefresh]);

  return (
    <header className="beam-header">
      {/* ── Left: Mobile menu + Brand ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '0 0 auto', minWidth: 0 }}>
        {/* Mobile Menu Toggle */}
        <button
          className="mobile-toggle-btn"
          onClick={toggleMobileMenu}
          aria-label="Toggle Navigation Menu"
          style={{
            padding: '8px',
            background: 'transparent',
            border: 'none',
            borderRadius: '9999px',
            color: 'var(--m3-on-surface-variant)',
            cursor: 'pointer',
            display: 'none',
            transition: 'background 0.15s ease'
          }}
        >
          <Menu size={24} aria-hidden="true" />
        </button>

        {/* Brand Text */}
        <div
          style={{
            fontSize: '24px',
            lineHeight: '32px',
            fontWeight: 600,
            color: 'var(--m3-primary)',
            whiteSpace: 'nowrap'
          }}
        >
          Apex ERP
        </div>
      </div>

      {/* ── Center: Search Bar ── */}
      <div style={{ flex: '1 1 auto', maxWidth: '720px', padding: '0 24px' }}>
        <div style={{ position: 'relative', width: '100%' }}>
          <Search
            size={20}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--m3-on-surface-variant)',
              pointerEvents: 'none'
            }}
            aria-hidden="true"
          />
          <input
            type="text"
            placeholder="Search projects, resources, or documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            style={{
              width: '100%',
              background: 'var(--m3-surface-container-low)',
              border: '1px solid var(--m3-outline-variant)',
              borderRadius: '8px',
              padding: '10px 16px 10px 40px',
              fontSize: '14px',
              lineHeight: '20px',
              letterSpacing: '0.25px',
              color: 'var(--m3-on-surface)',
              fontFamily: 'var(--font-main)',
              outline: 'none',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--m3-primary)';
              e.target.style.boxShadow = '0 0 0 1px var(--m3-primary)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--m3-outline-variant)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
      </div>

      {/* ── Right: Actions ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: '0 0 auto' }}>
        {/* Refresh */}
        <button
          onClick={handleManualRefresh}
          title="Refresh Data"
          aria-label="Refresh Data"
          style={{
            padding: '8px',
            background: 'transparent',
            border: 'none',
            borderRadius: '9999px',
            color: 'var(--m3-on-surface-variant)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.15s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--m3-surface-container)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
        >
          <RefreshCw size={20} className={isRefreshing ? 'spin-animation' : ''} aria-hidden="true" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          style={{
            padding: '8px',
            background: 'transparent',
            border: 'none',
            borderRadius: '9999px',
            color: 'var(--m3-on-surface-variant)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.15s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--m3-surface-container)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
        >
          {theme === 'dark' ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
        </button>

        {/* Notifications */}
        <button
          onClick={toggleNotifications}
          title="Notifications"
          aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
          style={{
            padding: '8px',
            background: 'transparent',
            border: 'none',
            borderRadius: '9999px',
            color: 'var(--m3-on-surface-variant)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            transition: 'background 0.15s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--m3-surface-container)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
        >
          <Bell size={20} aria-hidden="true" />
          {unreadCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--m3-error)',
                border: '2px solid var(--bg-header)'
              }}
            />
          )}
        </button>

        {/* Settings */}
        <button
          onClick={() => navigateTo('settings')}
          title="Settings"
          aria-label="Settings"
          style={{
            padding: '8px',
            background: 'transparent',
            border: 'none',
            borderRadius: '9999px',
            color: 'var(--m3-on-surface-variant)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.15s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--m3-surface-container)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
        >
          <Settings size={20} aria-hidden="true" />
        </button>

        {/* User Avatar */}
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'var(--m3-primary-fixed-dim)',
            marginLeft: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            overflow: 'hidden',
            transition: 'box-shadow 0.15s ease',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--m3-on-surface)'
          }}
          title="User Profile"
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 0 2px var(--m3-primary-container)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
        >
          A
        </div>
      </div>

      {/* Notification Drawer */}
      {notificationOpen && (
        <NotificationDrawer onClose={() => setNotificationOpen(false)} />
      )}
    </header>
  );
});
