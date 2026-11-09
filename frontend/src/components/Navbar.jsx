import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from './Button';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 font-bold text-xl text-primary-600">
          <span>🧺</span>
          <span>FreshPress</span>
        </Link>

        <nav className="flex items-center space-x-6 text-sm font-medium text-slate-600">
          <Link to="/services" className="hover:text-primary-600 transition">Services</Link>
          {user ? (
            <>
              <Link to="/orders" className="hover:text-primary-600 transition">My Orders</Link>
              <Link to="/orders/new" className="hover:text-primary-600 transition">Book Pickup</Link>
              {user.role === 'ADMIN' && (
                <Link to="/admin" className="text-primary-600 font-semibold hover:underline">
                  Admin Panel
                </Link>
              )}
              <div className="flex items-center pl-4 border-l border-slate-200 space-x-3">
                <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full font-medium">
                  {user.name} ({user.role})
                </span>
                <Button variant="secondary" size="sm" onClick={handleLogout}>
                  Sign Out
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button variant="outline" size="sm">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">Get Started</Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
