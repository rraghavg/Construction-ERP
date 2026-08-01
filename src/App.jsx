import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { Toast } from './components/Toast';
import './styles/global.css';
import './styles/dashboard.css';

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
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
