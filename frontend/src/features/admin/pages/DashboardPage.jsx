import React, { useEffect, useState } from 'react';
import { adminApi } from '../api';

export const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getDashboardStats()
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-sm text-slate-500">Loading dashboard metrics...</p>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Operations Overview</h1>
        <p className="text-sm text-slate-500 mt-1">Real-time KPIs for Laundry & Dry Cleaning Operations</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Revenue</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">${stats?.totalRevenue.toFixed(2)}</p>
        </div>

        <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active In-Process Orders</p>
          <p className="text-3xl font-extrabold text-primary-600 mt-2">{stats?.activeOrders}</p>
        </div>

        <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Delivered Orders</p>
          <p className="text-3xl font-extrabold text-emerald-600 mt-2">{stats?.completedOrders}</p>
        </div>

        <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Registered Customers</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">{stats?.totalCustomers}</p>
        </div>
      </div>

      <div className="bg-white p-6 border border-slate-200 rounded-xl">
        <h2 className="text-base font-bold text-slate-800 mb-4">Orders Status Distribution</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {stats?.statusBreakdown?.map((st) => (
            <div key={st.status} className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-center">
              <span className="text-xs font-medium text-slate-500 block">{st.status}</span>
              <span className="text-lg font-bold text-slate-900 mt-1">{st.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
