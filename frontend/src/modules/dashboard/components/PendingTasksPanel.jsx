import { useState, useMemo, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { CalendarCheck } from 'lucide-react';
import { PanelHeader } from '../../../shared/components/PanelHeader';
import { WidgetSkeleton } from '../../../shared/components/WidgetSkeleton';

export const PendingTasksPanel = memo(function PendingTasksPanel() {
  const { tasks, toggleTaskComplete, isRefreshing, userRole, navigateTo } = useApp();
  const [taskFilter, setTaskFilter] = useState('all');

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (taskFilter === 'pending') return !t.completed;
      if (taskFilter === 'completed') return t.completed;
      if (taskFilter === 'my') return t.assignedTo.includes('Admin') || userRole === 'Admin';
      return true;
    });
  }, [tasks, taskFilter, userRole]);

  const handleNavigateToTasks = useCallback(() => {
    navigateTo('maintenance', 'Complaints Register');
  }, [navigateTo]);

  if (isRefreshing) {
    return <WidgetSkeleton height="200px" className="panel-card" />;
  }

  return (
    <div className="panel-card">
      <PanelHeader
        title="Tasks"
        icon={<CalendarCheck size={15} color="var(--precision-blue)" />}
        accentColor="#2563eb"
        actionLabel="VIEW ALL"
        onAction={handleNavigateToTasks}
      >
        <select
          className="select-input mono-data"
          value={taskFilter}
          onChange={(e) => setTaskFilter(e.target.value)}
          aria-label="Filter tasks"
          style={{ fontSize: '0.7rem', padding: '0.2rem 0.4rem' }}
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Done</option>
          <option value="my">My Role</option>
        </select>
      </PanelHeader>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="structural-card"
            style={{ padding: '0.65rem', marginBottom: 0, opacity: task.completed ? 0.6 : 1 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                id={`task-checkbox-${task.id}`}
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskComplete(task.id)}
                aria-label={`Mark task "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
                style={{ cursor: 'pointer', accentColor: 'var(--precision-blue)' }}
              />
              <label
                htmlFor={`task-checkbox-${task.id}`}
                style={{
                  fontWeight: '700',
                  fontSize: '0.75rem',
                  textDecoration: task.completed ? 'line-through' : 'none',
                  cursor: 'pointer',
                  flex: 1
                }}
              >
                {task.title}
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', paddingLeft: '22px' }}>
              <span className="mono-data" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                {task.assignedTo}
              </span>
              <span
                className="mono-data"
                style={{
                  fontSize: '0.65rem',
                  fontWeight: '700',
                  color: task.priority === 'High' ? 'var(--color-danger)' : 'var(--text-muted)'
                }}
              >
                {task.dueDate}
              </span>
            </div>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <div className="empty-widget-state" style={{ padding: '1.5rem' }}>
            <p className="mono-data" style={{ fontSize: '0.75rem' }}>NO_MATCHING_TASKS</p>
          </div>
        )}
      </div>
    </div>
  );
});
