import React from 'react';
import { Link } from 'react-router-dom';

export const OrderCard = ({ order }) => {
  const statusColors = {
    PLACED: 'bg-amber-50 text-amber-700 border-amber-200',
    PICKED_UP: 'bg-blue-50 text-blue-700 border-blue-200',
    WASHING: 'bg-sky-50 text-sky-700 border-sky-200',
    DELIVERED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    CANCELLED: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-primary-300 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="text-xs text-slate-400 font-mono">#{order.id.slice(0, 8)}</span>
          <p className="text-sm font-semibold text-slate-800 mt-0.5">
            Pickup: {new Date(order.pickup_date).toLocaleDateString()}
          </p>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${statusColors[order.status] || 'bg-slate-100 text-slate-700'}`}>
          {order.status}
        </span>
      </div>

      <div className="text-xs text-slate-500 space-y-1 mb-4">
        <p><strong>Address:</strong> {order.pickup_address}</p>
        <p><strong>Total:</strong> ${parseFloat(order.total_amount).toFixed(2)}</p>
      </div>

      <Link
        to={`/orders/${order.id}`}
        className="block text-center text-xs font-semibold text-primary-600 hover:text-primary-700 bg-primary-50 py-2 rounded-lg"
      >
        Track Order & View Details →
      </Link>
    </div>
  );
};
