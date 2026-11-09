import React from 'react';

export const AuthForm = ({ title, subtitle, onSubmit, children }) => {
  return (
    <div className="max-w-md w-full mx-auto bg-white p-8 border border-slate-200 rounded-2xl shadow-sm">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        {children}
      </form>
    </div>
  );
};
