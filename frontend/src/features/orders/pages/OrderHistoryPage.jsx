import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ordersApi } from '../api';
import { OrderCard } from '../components/OrderCard';
import { Button } from '../../../components/Button';

export const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ordersApi.getMyOrders()
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Orders</h1>
          <p className="text-sm text-slate-500 mt-0.5">Track and review your past laundry requests</p>
        </div>
        <Link to="/orders/new">
          <Button variant="primary" size="md">Book New Pickup</Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading your orders...</p>
      ) : orders.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
          <p className="text-slate-600 font-medium mb-4">You have no active or past orders yet.</p>
          <Link to="/orders/new">
            <Button variant="primary">Schedule your first order</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};
