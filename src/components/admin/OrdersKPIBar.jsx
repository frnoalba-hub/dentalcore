import { useMemo } from 'react';
import { Package, Clock, Truck, CheckCircle, DollarSign, AlertCircle } from 'lucide-react';

const STATUS_CONFIG = {
  confirmed:       { label: 'Confirmed',       icon: Clock,        color: 'bg-blue-50   text-blue-700   border-blue-200' },
  processing:      { label: 'Processing',      icon: AlertCircle,  color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  shipped:         { label: 'Shipped',         icon: Truck,        color: 'bg-purple-50 text-purple-700 border-purple-200' },
  out_for_delivery:{ label: 'Out for Delivery',icon: Truck,        color: 'bg-orange-50 text-orange-700 border-orange-200' },
  delivered:       { label: 'Delivered',       icon: CheckCircle,  color: 'bg-green-50  text-green-700  border-green-200' },
};

export default function OrdersKPIBar({ orders }) {
  const stats = useMemo(() => {
    const pending = orders.filter(o => ['confirmed', 'processing'].includes(o.status));
    const inTransit = orders.filter(o => ['shipped', 'out_for_delivery'].includes(o.status));
    const delivered = orders.filter(o => o.status === 'delivered');

    const totalValue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
    const pendingValue = pending.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

    const byStatus = Object.entries(STATUS_CONFIG).map(([status, cfg]) => ({
      status,
      ...cfg,
      count: orders.filter(o => o.status === status).length,
      value: orders.filter(o => o.status === status).reduce((s, o) => s + (Number(o.total) || 0), 0),
    }));

    return { pending, inTransit, delivered, totalValue, pendingValue, byStatus };
  }, [orders]);

  return (
    <div className="space-y-4 mb-6">
      {/* Top KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KPICard
          icon={<Package className="w-5 h-5 text-gray-500" />}
          label="Total Orders"
          value={orders.length}
          sub={`$${stats.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} total`}
          color="bg-white"
        />
        <KPICard
          icon={<Clock className="w-5 h-5 text-blue-500" />}
          label="Needs Action"
          value={stats.pending.length}
          sub={`$${stats.pendingValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} pending`}
          color="bg-blue-50"
          highlight={stats.pending.length > 0}
        />
        <KPICard
          icon={<Truck className="w-5 h-5 text-purple-500" />}
          label="In Transit"
          value={stats.inTransit.length}
          sub={`${stats.inTransit.length} shipment${stats.inTransit.length !== 1 ? 's' : ''} moving`}
          color="bg-white"
        />
        <KPICard
          icon={<CheckCircle className="w-5 h-5 text-green-500" />}
          label="Delivered"
          value={stats.delivered.length}
          sub={`${orders.length > 0 ? Math.round((stats.delivered.length / orders.length) * 100) : 0}% fulfillment rate`}
          color="bg-green-50"
        />
      </div>

      {/* Status breakdown bar */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">By Status</p>
        <div className="flex flex-wrap gap-2">
          {stats.byStatus.map(({ status, label, icon: Icon, color, count, value }) => (
            <div key={status} className={`flex items-center gap-2 border rounded-lg px-3 py-2 text-sm ${color}`}>
              <Icon className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="font-semibold">{count}</span>
              <span className="text-xs opacity-75">{label}</span>
              {value > 0 && <span className="text-xs opacity-60 hidden sm:inline">· ${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function KPICard({ icon, label, value, sub, color, highlight }) {
  return (
    <div className={`${color} border ${highlight ? 'border-blue-300 ring-1 ring-blue-200' : 'border-gray-200'} rounded-lg p-4`}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
    </div>
  );
}