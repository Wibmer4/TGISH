import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import CSSDDashboard from './pages/cssd-dashboard';
import StaffLogin from './pages/staff-login';
import QualityControlValidation from './pages/quality-control-validation';
import PreDisinfectionWorkflow from './pages/pre-disinfection-workflow';
import SterilizationCycleManagement from './pages/sterilization-cycle-management';
import PatientTraceabilitySystem from './pages/patient-traceability-system';
import SterileInventoryManagement from './pages/sterile-inventory-management';
import EquipmentManagement from './pages/equipment-management';
import ComplianceReporting from './pages/compliance-reporting';
import Layout from './components/ui/Layout';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Public / standalone routes */}
        <Route path="/" element={<StaffLogin />} />
        <Route path="/staff-login" element={<StaffLogin />} />

        {/* App routes rendered inside the Layout (Header + Sidebar) */}
        <Route element={<Layout />}>
          <Route path="/cssd-dashboard" element={<CSSDDashboard />} />
          <Route path="/quality-control-validation" element={<QualityControlValidation />} />
          <Route path="/pre-disinfection-workflow" element={<PreDisinfectionWorkflow />} />
          <Route path="/sterilization-cycle-management" element={<SterilizationCycleManagement />} />
          <Route path="/sterile-inventory-management" element={<SterileInventoryManagement />} />
          <Route path="/equipment-management" element={<EquipmentManagement />} />
          <Route path="/compliance-reporting" element={<ComplianceReporting />} />
          <Route path="/patient-traceability-system" element={<PatientTraceabilitySystem />} />
          <Route path="*" element={<NotFound />} />
        </Route>

          <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
