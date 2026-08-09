import React, { useState } from 'react';
import { AppProvider, useApp } from '../core/providers/AppContext';
import { Sidebar } from '../shared/components/Sidebar';
import { Header } from '../shared/components/Header';
import { DashboardView } from '../modules/dashboard/pages/DashboardView';
import { Toast } from '../shared/components/Toast';
import { LoginPage } from '../core/auth/pages/LoginPage';
import { sessionManager } from '../core/session/sessionManager';
import { ErrorBoundary } from '../shared/components/ErrorBoundary';
import '../styles/global.css';
import '../styles/dashboard.css';

const MainLayout = () => {
  const { sidebarCollapsed } = useApp();

  return (
    <div className="app-container">
      <Sidebar />
      <div className={`main-wrapper ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <Header />
        <div className="layout-content-area">
          <DashboardView />
        </div>
      </div>
      <Toast />
    </div>
  );
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(sessionManager.isAuthenticated());

  if (!isAuthenticated) {
    return (
      <ErrorBoundary>
        <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </ErrorBoundary>
  );
}
