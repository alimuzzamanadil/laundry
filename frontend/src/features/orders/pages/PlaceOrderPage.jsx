import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ordersApi } from '../api';
import { OrderForm } from '../components/OrderForm';

export const PlaceOrderPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreateOrder = async (orderData) => {
    setLoading(true);
    setError('');
    try {
      const res = await ordersApi.createOrder(orderData);
      navigate(`/orders/${res.data.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Book Laundry Pickup</h1>
        <p className="text-sm text-slate-500 mt-1">
          Customize your order and our courier will collect your laundry at your chosen time.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg">
          {error}
        </div>
      )}

      <OrderForm onSubmit={handleCreateOrder} loading={loading} />
    </div>
  );
};
