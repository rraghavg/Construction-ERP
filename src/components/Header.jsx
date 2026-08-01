import { useState, useMemo, memo, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { MODULES_LIST, ROLE_PERMISSIONS } from '../data/mockData';
import {
  RefreshCw,
  Sun,
  Moon,
  Bell,
  Menu,
  ChevronRight,
  Shield,
  Search
} from 'lucide-react';
import { NotificationDrawer } from './NotificationDrawer';

export const Header = memo(function Header() {
  const {
    activeModule,
    activeFilter,
    setActiveFilter,
    timeRange,
    setTimeRange,
    userRole,
    changeRole,
    isRefreshing,
    triggerRefresh,
    refreshCountdown,
    mobileMenuOpen,
    setMobileMenuOpen,
    theme,
    toggleTheme,
    navigateTo,
    showToast,
    unreadCount
  } = useApp();

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const activeModuleData = useMemo(() => {
    return MODULES_LIST.find((m) => m.id === activeModule) || {
      name: 'Dashboard Overview'
    };
  }, [activeModule]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, [setMobileMenuOpen]);

  const toggleNotifications = useCallback(() => {
    setNotificationOpen((prev) => !prev);
  }, []);

  const handleSearchKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      showToast(`Searching for "${searchQuery}" in telemetry database...`, 'info');
    }
  }, [searchQuery, showToast]);

  const handleManualRefresh = useCallback(() => {
    triggerRefresh(false);
  }, [triggerRefresh]);

  const handleProjectChange = useCallback((e) => {
    setActiveFilter((prev) => ({ ...prev, project: e.target.value }));
  }, [setActiveFilter]);

  const handleTimeRangeChange = useCallback((e) => {
    setTimeRange(e.target.value);
  }, [setTimeRange]);

  const handleRoleChange = useCallback((e) => {
    changeRole(e.target.value);
  }, [changeRole]);

  return (
    <header className="beam-header">
      {/* Brand & Structural Logo */}
      <div className="beam-logo-group">
        <button
          className="mobile-toggle-btn btn btn-secondary btn-sm"
          onClick={toggleMobileMenu}
          aria-label="Toggle Navigation Menu"
        >
          <Menu size={20} aria-hidden="true" />
        </button>

        <div className="beam-logo-square" aria-hidden="true">
          <div className="beam-logo-diamond"></div>
        </div>

        <div>
          <h1 className="text-xl font-extrabold tracking-tighter uppercase shimmer-text" style={{ fontSize: '1.15rem' }}>
            Apex Structural ERP
          </h1>
          <div className="breadcrumb" style={{ fontSize: '0.725rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              onClick={() => navigateTo('dashboard')}
              style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', font: 'inherit', cursor: 'pointer' }}
            >
              Command
            </button>
            <ChevronRight size={10} aria-hidden="true" />
            <span>{activeModuleData.name}</span>
          </div>
        </div>
      </div>

      {/* Controls & Telemetry Status */}
      <div className="header-controls" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* System Load Status */}
        <div style={{ textAlign: 'right', paddingRight: '0.75rem', borderRight: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.625rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '800' }}>
            System Telemetry
          </div>
          <div className="mono-data" style={{ fontSize: '0.725rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span className="status-node" style={{ background: '#16a34a' }} aria-hidden="true"></span> ACTIVE_LOAD_082
          </div>
        </div>

        {/* Search */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            padding: '0.35rem 0.65rem',
            borderRadius: '2px'
          }}
        >
          <Search size={13} color="var(--text-muted)" aria-hidden="true" />
          <input
            type="text"
            aria-label="Search telemetry database"
            placeholder="Search telemetry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              outline: 'none',
              width: '120px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)'
            }}
          />
        </div>

        {/* Project Selector */}
        <select
          className="select-input mono-data"
          value={activeFilter.project}
          onChange={handleProjectChange}
          aria-label="Filter by Active Site"
          title="Filter by Active Site"
        >
          <option value="All Projects">Active Sites (All)</option>
          <option value="Green Heights">Green Heights</option>
          <option value="Prime Residency">Prime Residency</option>
          <option value="Sunshine Towers">Sunshine Towers</option>
          <option value="Azure Sky">Azure Sky</option>
        </select>

        {/* Time Range */}
        <select
          className="select-input mono-data"
          value={timeRange}
          onChange={handleTimeRangeChange}
          aria-label="KPI Time Range"
          title="KPI Time Range"
        >
          <option value="3M">3M Range</option>
          <option value="6M">6M Range</option>
          <option value="12M">12M Range</option>
          <option value="FY">Current FY</option>
        </select>

        {/* Role Switcher */}
        <div className="role-switcher-dropdown mono-data" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Shield size={13} color="var(--precision-blue)" aria-hidden="true" />
          <select
            className="role-switcher-select select-input"
            value={userRole}
            onChange={handleRoleChange}
            aria-label="Select User Role"
          >
            {Object.keys(ROLE_PERMISSIONS).map((roleKey) => (
              <option key={roleKey} value={roleKey}>
                {roleKey}
              </option>
            ))}
          </select>
        </div>

        {/* Refresh Countdown */}
        <button
          className="refresh-indicator mono-data btn btn-secondary btn-sm"
          onClick={handleManualRefresh}
          aria-label="Refresh Dashboard Data"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
        >
          <RefreshCw size={13} className={isRefreshing ? 'spinning' : ''} aria-hidden="true" />
          <span>{isRefreshing ? 'SYNC' : `${refreshCountdown}s`}</span>
        </button>

        {/* Theme Toggle */}
        <button
          className="refresh-indicator btn btn-secondary btn-sm"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          style={{ padding: '0.4rem' }}
        >
          {theme === 'dark' ? <Sun size={14} color="#f97316" aria-hidden="true" /> : <Moon size={14} color="#2563eb" aria-hidden="true" />}
        </button>

        {/* Notifications Bell */}
        <button
          className="refresh-indicator btn btn-secondary btn-sm"
          style={{ position: 'relative', padding: '0.4rem 0.6rem', display: 'flex', alignItems: 'center', gap: '4px' }}
          onClick={toggleNotifications}
          aria-label={`Notifications (${unreadCount} unread)`}
          title={`Notifications (${unreadCount} unread)`}
        >
          <Bell size={14} aria-hidden="true" />
          {unreadCount > 0 && (
            <span
              className="mono-data"
              style={{
                fontSize: '0.625rem',
                fontWeight: 800,
                background: '#dc2626',
                color: '#ffffff',
                padding: '1px 5px',
                borderRadius: '10px'
              }}
            >
              {unreadCount}
            </span>
          )}
        </button>

        {/* Avatar Initials */}
        <div
          aria-label="User profile: John Doe"
          role="img"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-card)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '800',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)'
          }}
        >
          JD
        </div>
      </div>

      <NotificationDrawer isOpen={notificationOpen} onClose={() => setNotificationOpen(false)} />
    </header>
  );
});
