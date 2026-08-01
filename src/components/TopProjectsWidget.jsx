import { useState, useMemo, memo, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { TOP_PROJECTS_DATA } from '../data/mockData';
import { PanelHeader } from './shared/PanelHeader';
import { WidgetSkeleton } from './shared/WidgetSkeleton';

export const TopProjectsWidget = memo(function TopProjectsWidget() {
  const { isRefreshing, navigateTo } = useApp();
  const [metricKey, setMetricKey] = useState('salesValueCr');

  const { sortedProjects, maxVal } = useMemo(() => {
    const sorted = [...TOP_PROJECTS_DATA].sort((a, b) => b[metricKey] - a[metricKey]);
    const max = Math.max(...sorted.map((p) => p[metricKey]));
    return { sortedProjects: sorted, maxVal: max };
  }, [metricKey]);

  const formatMetricValue = useCallback((proj) => {
    if (metricKey === 'salesValueCr') return `₹ ${proj.salesValueCr} Cr`;
    if (metricKey === 'unitsSold') return `${proj.unitsSold} / ${proj.totalUnits} Units`;
    if (metricKey === 'occupancyPct') return `${proj.occupancyPct}%`;
    return proj[metricKey];
  }, [metricKey]);

  const handleProjectClick = useCallback((projectName) => {
    navigateTo('master-data', 'Projects & Towers', { project: projectName });
  }, [navigateTo]);

  const handleProjectKeyDown = useCallback((e, projectName) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleProjectClick(projectName);
    }
  }, [handleProjectClick]);

  if (isRefreshing) {
    return <WidgetSkeleton height="220px" />;
  }

  return (
    <div className="data-grid-item" style={{ padding: '1.25rem' }}>
      <PanelHeader title="Top Sites" accentColor="#2563eb">
        <select
          className="select-input mono-data"
          value={metricKey}
          onChange={(e) => setMetricKey(e.target.value)}
          aria-label="Select metric for ranking top sites"
          style={{ fontSize: '0.7rem', padding: '0.2rem 0.4rem' }}
        >
          <option value="salesValueCr">Sales Value</option>
          <option value="unitsSold">Units Sold</option>
          <option value="occupancyPct">Occupancy %</option>
        </select>
      </PanelHeader>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {sortedProjects.map((project, index) => {
          const pct = Math.round((project[metricKey] / maxVal) * 100);

          return (
            <div
              key={project.id}
              tabIndex={0}
              role="button"
              className="structural-card"
              style={{ padding: '0.65rem', marginBottom: 0 }}
              onClick={() => handleProjectClick(project.name)}
              onKeyDown={(e) => handleProjectKeyDown(e, project.name)}
              aria-label={`Rank ${index + 1}: ${project.name}, Value: ${formatMetricValue(project)}`}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.775rem' }}>
                <div style={{ fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className="mono-data" style={{ fontSize: '0.7rem', color: 'var(--precision-blue)' }}>
                    0{index + 1}
                  </span>
                  <span>{project.name}</span>
                </div>
                <span className="mono-data" style={{ fontWeight: '800' }}>{formatMetricValue(project)}</span>
              </div>

              <div className="load-bar">
                <div className="load-fill" style={{ transform: `scaleX(${pct / 100})` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
