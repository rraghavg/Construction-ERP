import { useState, useMemo, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { Search, CheckCheck, Filter, Star, Clock, Trash2, CheckCircle2, ChevronRight } from 'lucide-react';
import { PanelHeader } from '../../../shared/components/PanelHeader';
import { PriorityBadge } from './NotificationDetailPanel';

export const NotificationsListPanel = memo(function NotificationsListPanel({ onSelectNotification, onSnoozeNotification }) {
  const {
    notifications,
    selectedNotification,
    setSelectedNotification,
    markNotificationRead,
    markNotificationUnread,
    toggleNotificationImportant,
    dismissNotification,
    markAllNotificationsRead
  } = useApp();

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

  // Filter & Search Logic
  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      // Category Tab Filter
      if (activeTab === 'unread' && item.is_read) return false;
      if (activeTab === 'important' && !item.is_important) return false;
      if (activeTab === 'reminders' && item.category !== 'reminder') return false;
      if (activeTab === 'system_alerts' && item.category !== 'system_alert') return false;

      // Module Filter
      if (moduleFilter !== 'all' && item.module !== moduleFilter) return false;

      // Priority Filter
      if (priorityFilter !== 'all' && item.priority !== priorityFilter) return false;

      // Search Query
      if (searchQuery.trim()) {
        const term = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(term);
        const matchBody = item.body.toLowerCase().includes(term);
        const matchModule = item.module.toLowerCase().includes(term);
        const matchId = item.related_record?.id?.toLowerCase().includes(term);
        if (!matchTitle && !matchBody && !matchModule && !matchId) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOrder === 'oldest') return a.id.localeCompare(b.id);
      if (sortOrder === 'priority') {
        const priorityScore = { high: 3, medium: 2, low: 1, system: 2 };
        return (priorityScore[b.priority] || 0) - (priorityScore[a.priority] || 0);
      }
      return b.id.localeCompare(a.id); // default newest
    });
  }, [notifications, activeTab, moduleFilter, priorityFilter, searchQuery, sortOrder]);

  // Tab counts
  const tabCounts = useMemo(() => ({
    all: notifications.length,
    unread: notifications.filter((n) => !n.is_read).length,
    important: notifications.filter((n) => n.is_important).length,
    reminders: notifications.filter((n) => n.category === 'reminder').length,
    system_alerts: notifications.filter((n) => n.category === 'system_alert').length
  }), [notifications]);

  const handleNotificationClick = useCallback((item) => {
    markNotificationRead(item.id);
    setSelectedNotification(item);
    onSelectNotification(item);
  }, [markNotificationRead, setSelectedNotification, onSelectNotification]);

  const handleNotificationKeyDown = useCallback((e, item) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNotificationClick(item);
    }
  }, [handleNotificationClick]);

  // Relative Date Grouping
  const groupedNotifications = useMemo(() => {
    const groups = { Today: [], Yesterday: [], Earlier: [] };
    filteredNotifications.forEach((n) => {
      const g = n.dateGroup === 'Today' ? 'Today' : n.dateGroup === 'Yesterday' ? 'Yesterday' : 'Earlier';
      groups[g].push(n);
    });
    return groups;
  }, [filteredNotifications]);

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Notifications Feed & Alerts"
        accentColor="#2563eb"
      >
        <button
          className="btn btn-secondary btn-sm"
          onClick={markAllNotificationsRead}
          aria-label="Mark all as read"
          style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.725rem' }}
        >
          <CheckCheck size={14} aria-hidden="true" color="#16a34a" /> MARK ALL READ
        </button>
      </PanelHeader>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '6px', borderBottom: '1px solid var(--border-color)', marginBottom: '0.85rem', paddingBottom: '0.5rem', overflowX: 'auto' }}>
        {[
          { id: 'all', label: 'All', count: tabCounts.all },
          { id: 'unread', label: 'Unread', count: tabCounts.unread },
          { id: 'important', label: 'Important', count: tabCounts.important },
          { id: 'reminders', label: 'Reminders', count: tabCounts.reminders },
          { id: 'system_alerts', label: 'System Alerts', count: tabCounts.system_alerts }
        ].map((tab) => (
          <button
            key={tab.id}
            className={`btn btn-sm ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab(tab.id)}
            style={{ fontSize: '0.725rem', padding: '0.35rem 0.75rem', borderRadius: '4px' }}
          >
            {tab.label} <span className="mono-data" style={{ fontSize: '0.65rem', opacity: 0.8 }}>({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Toolbar: Search, Filters & Sorting */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
        {/* Search Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '0.3rem 0.6rem', flex: 1, minWidth: '180px' }}>
          <Search size={13} color="var(--text-muted)" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search alerts, modules, invoices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', outline: 'none', width: '100%', fontSize: '0.75rem', fontFamily: 'var(--font-main)' }}
          />
        </div>

        {/* Module Filter */}
        <select
          className="select-input mono-data"
          value={moduleFilter}
          onChange={(e) => setModuleFilter(e.target.value)}
          aria-label="Filter by Module"
          style={{ fontSize: '0.7rem', padding: '0.3rem 0.5rem' }}
        >
          <option value="all">Module (All)</option>
          <option value="Finance">Finance</option>
          <option value="Sales">Sales</option>
          <option value="Inventory">Inventory</option>
          <option value="HR">HR</option>
          <option value="CRM">CRM</option>
          <option value="Document Management">Document Mgmt</option>
          <option value="System">System</option>
        </select>

        {/* Priority Filter */}
        <select
          className="select-input mono-data"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          aria-label="Filter by Priority"
          style={{ fontSize: '0.7rem', padding: '0.3rem 0.5rem' }}
        >
          <option value="all">Priority (All)</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>

        {/* Sort Order */}
        <select
          className="select-input mono-data"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          aria-label="Sort Notifications"
          style={{ fontSize: '0.7rem', padding: '0.3rem 0.5rem' }}
        >
          <option value="newest">Sort: Newest First</option>
          <option value="oldest">Sort: Oldest First</option>
          <option value="priority">Sort: Priority (High→Low)</option>
        </select>
      </div>

      {/* Notifications List Grouped by Date */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {Object.entries(groupedNotifications).map(([groupName, items]) => {
          if (items.length === 0) return null;

          return (
            <div key={groupName}>
              <div style={{ fontSize: '0.675rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.04em' }}>
                {groupName} ({items.length})
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {items.map((item) => {
                  const isSelected = selectedNotification?.id === item.id;

                  return (
                    <div
                      key={item.id}
                      tabIndex={0}
                      role="button"
                      onClick={() => handleNotificationClick(item)}
                      onKeyDown={(e) => handleNotificationKeyDown(e, item)}
                      aria-selected={isSelected}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.75rem 0.85rem',
                        background: isSelected ? 'rgba(37, 99, 235, 0.08)' : item.is_read ? 'var(--bg-card)' : 'var(--bg-input)',
                        border: '1px solid var(--border-color)',
                        borderLeft: item.priority === 'high' ? '4px solid #dc2626' : isSelected ? '4px solid #2563eb' : '1px solid var(--border-color)',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                        {/* Unread Blue Dot */}
                        <div
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: item.is_read ? 'transparent' : '#2563eb',
                            flexShrink: 0
                          }}
                          aria-hidden="true"
                        />

                        {/* Title & Body */}
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                            <span style={{ fontWeight: item.is_read ? 600 : 800, fontSize: '0.825rem' }}>
                              {item.title}
                            </span>
                            <PriorityBadge priority={item.priority} />
                          </div>

                          <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                            {item.body}
                          </div>

                          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px', display: 'flex', gap: '8px' }}>
                            <span className="mono-data" style={{ fontWeight: 700 }}>{item.module}</span>
                            <span>•</span>
                            <span className="mono-data">{item.time}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Row Actions */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '3px 6px' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (item.is_read) markNotificationUnread(item.id);
                            else markNotificationRead(item.id);
                          }}
                          title={item.is_read ? 'Mark Unread' : 'Mark Read'}
                          aria-label={item.is_read ? 'Mark Unread' : 'Mark Read'}
                        >
                          <CheckCircle2 size={12} color={item.is_read ? '#16a34a' : 'var(--text-muted)'} aria-hidden="true" />
                        </button>

                        <button
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '3px 6px' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleNotificationImportant(item.id);
                          }}
                          title="Star / Important"
                          aria-label="Star / Important"
                        >
                          <Star size={12} color={item.is_important ? '#f59e0b' : 'var(--text-muted)'} fill={item.is_important ? '#f59e0b' : 'none'} aria-hidden="true" />
                        </button>

                        <button
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '3px 6px' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSnoozeNotification(item);
                          }}
                          title="Snooze"
                          aria-label="Snooze"
                        >
                          <Clock size={12} color="var(--text-muted)" aria-hidden="true" />
                        </button>

                        <button
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '3px 6px', color: '#dc2626' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            dismissNotification(item.id);
                          }}
                          title="Dismiss"
                          aria-label="Dismiss"
                        >
                          <Trash2 size={12} aria-hidden="true" />
                        </button>

                        <ChevronRight size={14} color="var(--text-muted)" aria-hidden="true" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
