import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CustomerLayout } from '../layouts/CustomerLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { ProtectedRoute } from './ProtectedRoute';

// Feature Pages
import { LoginPage } from '../features/auth/pages/LoginPage';
import { RegisterPage } from '../features/auth/pages/RegisterPage';
import { ServicesPage } from '../features/catalog/pages/ServicesPage';
import { PlaceOrderPage } from '../features/orders/pages/PlaceOrderPage';
import { OrderHistoryPage } from '../features/orders/pages/OrderHistoryPage';
import { OrderTrackingPage } from '../features/orders/pages/OrderTrackingPage';
import { DashboardPage } from '../features/admin/pages/DashboardPage';
import { ManageOrdersPage } from '../features/admin/pages/ManageOrdersPage';
import { AssignStaffPage } from '../features/admin/pages/AssignStaffPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public & Customer Routes */}
      <Route element={<CustomerLayout />}>
        <Route path="/" element={<Navigate to="/services" replace />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Authenticated Customer Routes */}
        <Route element={<ProtectedRoute allowedRoles={['CUSTOMER', 'ADMIN']} />}>
          <Route path="/orders" element={<OrderHistoryPage />} />
          <Route path="/orders/new" element={<PlaceOrderPage />} />
          <Route path="/orders/:id" element={<OrderTrackingPage />} />
        </Route>
      </Route>

      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="orders" element={<ManageOrdersPage />} />
          <Route path="assign" element={<AssignStaffPage />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
