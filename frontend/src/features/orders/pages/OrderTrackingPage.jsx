import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ordersApi } from '../api';
import { StatusTimeline } from '../components/StatusTimeline';
import { Button } from '../../../components/Button';

export const OrderTrackingPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    ordersApi.getOrderById(id)
      .then((res) => setOrder(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    try {
      await ordersApi.cancelOrder(id);
      const refreshed = await ordersApi.getOrderById(id);
      setOrder(refreshed.data);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p className="text-sm text-slate-500">Loading order status...</p>;
  if (error || !order) return <p className="text-sm text-rose-600">{error || 'Order not found'}</p>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <button onClick={() => navigate('/orders')} className="text-xs text-primary-600 font-medium hover:underline mb-1">
            ← Back to Orders
          </button>
          <h1 className="text-2xl font-bold text-slate-900">Order #{order.id.slice(0, 8)}</h1>
        </div>
        {order.status === 'PLACED' && (
          <Button variant="danger" size="sm" onClick={handleCancel}>
            Cancel Order
          </Button>
        )}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Live Status Progress</h2>
        <StatusTimeline currentStatus={order.status} timeline={order.timeline} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-semibold text-slate-900 border-b pb-2 mb-3">Order Items</h3>
          <ul className="divide-y divide-slate-100 text-sm">
            {order.items?.map((item) => (
              <li key={item.id} className="py-2.5 flex justify-between">
                <div>
                  <p className="font-medium text-slate-800">{item.service_name}</p>
                  <p className="text-xs text-slate-400">{item.quantity} {item.unit_type} @ ${item.unit_price}</p>
                </div>
                <span className="font-semibold text-slate-800">${parseFloat(item.subtotal).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="pt-3 border-t border-slate-200 flex justify-between font-bold text-base mt-2">
            <span>Total:</span>
            <span className="text-primary-600">${parseFloat(order.total_amount).toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 text-sm space-y-3">
          <h3 className="font-semibold text-slate-900 border-b pb-2 mb-3">Delivery Information</h3>
          <p><strong>Pickup Address:</strong> {order.pickup_address}</p>
          <p><strong>Delivery Address:</strong> {order.delivery_address}</p>
          <p><strong>Scheduled Pickup:</strong> {new Date(order.pickup_date).toLocaleString()}</p>
          {order.notes && <p><strong>Notes:</strong> {order.notes}</p>}
        </div>
      </div>
    </div>
  );
};
