import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import MainDashboard from './pages/main-dashboard';
import AnalyticsAndKPIDashboard from './pages/analytics-and-kpi-dashboard';
import SystemAdministrationSettings from './pages/system-administration-settings';
import WhatIfSimulationInterface from './pages/what-if-simulation-interface';
import LoginModalPage from './pages/login-modal';
import TrainDetailView from './pages/train-detail-view';
import RailBlazeDashboard from './components/RailBlazeDashboard';

// Component to redirect to landing page
const RedirectToLanding = () => {
  React.useEffect(() => {
    window.location.href = '/landing.html';
  }, []);
  return <div>🚄 Loading RailBlaze...</div>;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* ROOT CHANGED: Now redirects to landing page */}
        <Route path="/" element={<RedirectToLanding />} />
        
        {/* All your existing routes - NO CHANGES */}
        <Route path="/main-dashboard" element={<MainDashboard />} />
        <Route path="/analytics-and-kpi-dashboard" element={<AnalyticsAndKPIDashboard />} />
        <Route path="/system-administration-settings" element={<SystemAdministrationSettings />} />
        <Route path="/what-if-simulation-interface" element={<WhatIfSimulationInterface />} />
        <Route path="/login-modal" element={<LoginModalPage />} />
        <Route path="/train-detail-view" element={<TrainDetailView />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
