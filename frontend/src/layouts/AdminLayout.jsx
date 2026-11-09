import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Manage Orders', path: '/admin/orders' },
    { label: 'Assign Staff', path: '/admin/assign' },
    { label: 'View Customer Portal', path: '/' },
  ];

  return (
    <div className="min-h-screen flex bg-slate-100">
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center space-x-2">
            <span>🧺</span>
            <span>Admin Control</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Laundry Operations Suite</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-white">{user?.name}</p>
            <p className="text-xs text-slate-400">Administrator</p>
          </div>
          <Button variant="outline" size="sm" onClick={logout} className="text-white border-slate-700 hover:bg-slate-800">
            Exit
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
