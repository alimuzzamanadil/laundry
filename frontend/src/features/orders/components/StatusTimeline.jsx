import React from 'react';

const STAGES = [
  { key: 'PLACED', label: 'Order Placed' },
  { key: 'PICKED_UP', label: 'Picked Up' },
  { key: 'WASHING', label: 'Washing / Ironing' },
  { key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery' },
  { key: 'DELIVERED', label: 'Delivered' },
];

export const StatusTimeline = ({ currentStatus, timeline = [] }) => {
  const currentIndex = STAGES.findIndex((s) => s.key === currentStatus);

  return (
    <div className="py-6">
      <div className="flex items-center justify-between relative">
        {STAGES.map((stage, idx) => {
          const isDone = idx <= currentIndex && currentStatus !== 'CANCELLED';
          const isCurrent = idx === currentIndex;

          return (
            <div key={stage.key} className="flex flex-col items-center flex-1 relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                  isDone
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-slate-200 text-slate-500'
                } ${isCurrent ? 'ring-4 ring-primary-100' : ''}`}
              >
                {idx + 1}
              </div>
              <span className="text-xs font-semibold text-slate-700 mt-2 text-center">
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>

      {timeline.length > 0 && (
        <div className="mt-8 border-t border-slate-100 pt-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Status Log</h4>
          <ul className="space-y-2 text-xs">
            {timeline.map((entry) => (
              <li key={entry.id} className="flex justify-between text-slate-600">
                <span>
                  <strong className="text-slate-800">{entry.status}</strong>: {entry.notes}
                </span>
                <span className="text-slate-400">
                  {new Date(entry.created_at).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
