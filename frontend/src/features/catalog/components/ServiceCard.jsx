import React from 'react';
import { Button } from '../../../components/Button';

export const ServiceCard = ({ service, onSelect }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-slate-900">{service.name}</h3>
          <span className="text-xs bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full font-medium">
            {service.category}
          </span>
        </div>
        <p className="text-slate-600 text-sm mb-4 leading-relaxed">{service.description}</p>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-2xl font-bold text-slate-900">${parseFloat(service.price_per_unit).toFixed(2)}</span>
          <span className="text-xs text-slate-500 ml-1">/ {service.unit_type}</span>
        </div>
        {onSelect && (
          <Button size="sm" variant="primary" onClick={() => onSelect(service)}>
            Select
          </Button>
        )}
      </div>
    </div>
  );
};
