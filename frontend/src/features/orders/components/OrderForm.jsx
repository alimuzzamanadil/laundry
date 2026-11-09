import React, { useState, useEffect } from 'react';
import { catalogApi } from '../../catalog/api';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

export const OrderForm = ({ onSubmit, loading }) => {
  const [services, setServices] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [pickupAddress, setPickupAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    catalogApi.getServices().then((res) => setServices(res.data));
  }, []);

  const handleQuantityChange = (serviceId, delta) => {
    const current = selectedItems[serviceId] || 0;
    const next = Math.max(0, current + delta);
    if (next === 0) {
      const copy = { ...selectedItems };
      delete copy[serviceId];
      setSelectedItems(copy);
    } else {
      setSelectedItems({ ...selectedItems, [serviceId]: next });
    }
  };

  const calculateTotal = () => {
    return Object.entries(selectedItems).reduce((sum, [serviceId, qty]) => {
      const s = services.find((srv) => srv.id === serviceId);
      return sum + (s ? parseFloat(s.price_per_unit) * qty : 0);
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const items = Object.entries(selectedItems).map(([service_id, quantity]) => ({
      service_id,
      quantity,
    }));

    onSubmit({
      pickup_address: pickupAddress,
      delivery_address: deliveryAddress || pickupAddress,
      pickup_date: pickupDate,
      notes,
      items,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 border border-slate-200 rounded-xl space-y-4">
        <h3 className="font-semibold text-slate-900 border-b pb-2">1. Select Laundry Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => {
            const qty = selectedItems[service.id] || 0;
            return (
              <div key={service.id} className="border border-slate-200 rounded-lg p-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-sm text-slate-800">{service.name}</p>
                  <p className="text-xs text-slate-500">${service.price_per_unit} / {service.unit_type}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(service.id, -1)}
                    className="w-7 h-7 rounded border border-slate-300 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-sm font-semibold">{qty}</span>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(service.id, 1)}
                    className="w-7 h-7 rounded border border-slate-300 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white p-6 border border-slate-200 rounded-xl space-y-4">
        <h3 className="font-semibold text-slate-900 border-b pb-2">2. Pickup & Delivery Details</h3>
        <Input
          label="Pickup Address"
          id="pickupAddress"
          required
          value={pickupAddress}
          onChange={(e) => setPickupAddress(e.target.value)}
          placeholder="123 Main St, Apt 4B"
        />
        <Input
          label="Delivery Address (Optional if same as pickup)"
          id="deliveryAddress"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          placeholder="Leave blank to use pickup address"
        />
        <Input
          label="Pickup Date & Time"
          id="pickupDate"
          type="datetime-local"
          required
          value={pickupDate}
          onChange={(e) => setPickupDate(e.target.value)}
        />
        <Input
          label="Special Instructions / Notes"
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Fragile garments, hypoallergenic detergent, etc."
        />
      </div>

      <div className="bg-slate-900 text-white p-6 rounded-xl flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400">Estimated Total</p>
          <p className="text-2xl font-bold">${calculateTotal().toFixed(2)}</p>
        </div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={loading || Object.keys(selectedItems).length === 0}
        >
          {loading ? 'Submitting Order...' : 'Confirm & Place Order'}
        </Button>
      </div>
    </form>
  );
};
