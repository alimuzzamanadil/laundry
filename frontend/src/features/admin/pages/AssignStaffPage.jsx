import React, { useEffect, useState } from 'react';
import { adminApi } from '../api';
import { Button } from '../../../components/Button';

export const AssignStaffPage = () => {
  const [orders, setOrders] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState('');
  const [selectedStaff, setSelectedStaff] = useState('');
  const [taskType, setTaskType] = useState('PICKUP');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    adminApi.getAllOrders().then((res) => setOrders(res.data));
    adminApi.getStaff().then((res) => setStaffList(res.data));
  }, []);

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!selectedOrder || !selectedStaff) return;
    setLoading(true);
    setMessage('');

    try {
      await adminApi.assignDelivery({
        order_id: selectedOrder,
        staff_id: selectedStaff,
        task_type: taskType,
        notes,
      });
      setMessage('Staff successfully assigned to order!');
      setSelectedOrder('');
      setNotes('');
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Assign Pickup / Delivery Staff</h1>
        <p className="text-sm text-slate-500 mt-1">Dispatch couriers for laundry pickup or dropoff tasks</p>
      </div>

      {message && (
        <div className="p-3 bg-primary-50 text-primary-700 border border-primary-200 text-sm rounded-lg">
          {message}
        </div>
      )}

      <form onSubmit={handleAssign} className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Select Order</label>
          <select
            value={selectedOrder}
            onChange={(e) => setSelectedOrder(e.target.value)}
            required
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
          >
            <option value="">-- Choose an Order --</option>
            {orders.map((o) => (
              <option key={o.id} value={o.id}>
                #{o.id.slice(0, 8)} - {o.customer_name} ({o.status})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Assign Staff Member</label>
          <select
            value={selectedStaff}
            onChange={(e) => setSelectedStaff(e.target.value)}
            required
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
          >
            <option value="">-- Choose Staff / Courier --</option>
            {staffList.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.phone || s.email})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Task Type</label>
          <select
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
          >
            <option value="PICKUP">Pickup From Customer</option>
            <option value="DELIVERY">Deliver Clean Laundry</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Instructions / Route Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Gate code, call upon arrival, etc."
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <Button type="submit" variant="primary" disabled={loading} className="w-full">
          {loading ? 'Assigning...' : 'Dispatch Assignment'}
        </Button>
      </form>
    </div>
  );
};
