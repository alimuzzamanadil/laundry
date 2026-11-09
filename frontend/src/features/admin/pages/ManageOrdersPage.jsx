import React, { useEffect, useState } from 'react';
import { adminApi } from '../api';
import { OrdersTable } from '../components/OrdersTable';
import { StatusUpdater } from '../components/StatusUpdater';
import { Input } from '../../../components/Input';

export const ManageOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const loadOrders = () => {
    setLoading(true);
    adminApi.getAllOrders({ search })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadOrders();
  }, [search]);

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = async (orderId, payload) => {
    await adminApi.updateOrderStatus(orderId, payload);
    loadOrders();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage All Orders</h1>
          <p className="text-sm text-slate-500 mt-0.5">Filter, inspect, and update laundry order statuses</p>
        </div>
        <div className="w-72">
          <Input
            placeholder="Search by customer or order #..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-sm text-slate-500 bg-white p-8 rounded-xl border text-center">No orders found.</p>
      ) : (
        <OrdersTable orders={orders} onOpenStatusModal={handleOpenModal} />
      )}

      <StatusUpdater
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
        onUpdate={handleUpdateStatus}
      />
    </div>
  );
};
