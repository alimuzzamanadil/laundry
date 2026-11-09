import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { catalogApi } from '../api';
import { ServiceCard } from '../components/ServiceCard';
import { Button } from '../../../components/Button';

export const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    catalogApi.getServices()
      .then((res) => setServices(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-primary-600 to-sky-700 p-8 rounded-2xl text-white shadow-lg">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Professional Laundry Care</h1>
          <p className="text-primary-100 mt-2 max-w-xl text-sm">
            Select from our comprehensive list of washing, steam pressing, and dry-cleaning services. Fast pickup and delivery.
          </p>
        </div>
        <Link to="/orders/new">
          <Button variant="secondary" size="lg" className="whitespace-nowrap font-semibold">
            Book Pickup Now →
          </Button>
        </Link>
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Our Services & Pricing</h2>
        {loading ? (
          <p className="text-sm text-slate-500">Loading catalog...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
