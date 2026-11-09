import React, { useState } from 'react';
import { Button } from '../../../components/Button';
import { Modal } from '../../../components/Modal';

const STATUS_OPTIONS = [
  'PLACED',
  'PICKED_UP',
  'IN_PROCESS',
  'WASHING',
  'IRONING',
  'READY_FOR_DELIVERY',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
  'CANCELLED',
];

export const StatusUpdater = ({ isOpen, onClose, order, onUpdate }) => {
  const [status, setStatus] = useState(order?.status || 'PLACED');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onUpdate(order.id, { status, notes });
      onClose();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!order) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Update Order #${order.id.slice(0, 8)}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Select New Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
          >
            {STATUS_OPTIONS.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Status Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Ironing completed, handed to courier..."
            rows={3}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="flex justify-end space-x-2 pt-2">
          <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Update Status'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
