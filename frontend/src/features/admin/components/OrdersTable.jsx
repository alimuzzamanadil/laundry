import React from 'react';
import { Button } from '../../../components/Button';

export const OrdersTable = ({ orders, onOpenStatusModal }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 text-xs uppercase font-semibold border-b border-slate-200">
            <tr>
              <th className="px-5 py-3">Order ID</th>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Pickup Date</th>
              <th className="px-5 py-3">Total</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-slate-50">
                <td className="px-5 py-4 font-mono text-xs font-medium text-slate-900">
                  #{o.id.slice(0, 8)}
                </td>
                <td className="px-5 py-4">
                  <p className="font-semibold text-slate-900">{o.customer_name}</p>
                  <p className="text-xs text-slate-400">{o.customer_phone || o.customer_email}</p>
                </td>
                <td className="px-5 py-4 text-xs">
                  {new Date(o.pickup_date).toLocaleDateString()}
                </td>
                <td className="px-5 py-4 font-semibold text-slate-900">
                  ${parseFloat(o.total_amount).toFixed(2)}
                </td>
                <td className="px-5 py-4">
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-slate-100 text-slate-800">
                    {o.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <Button size="sm" variant="outline" onClick={() => onOpenStatusModal(o)}>
                    Update Status
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
