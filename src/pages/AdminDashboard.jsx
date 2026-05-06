import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { Loader2, TrendingUp, DollarSign, ShoppingBag, Package, ArrowLeft } from 'lucide-react';
import { format, startOfMonth, eachDayOfInterval, subDays, subMonths } from 'date-fns';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';

const COLORS = ['#0047FF', '#111111', '#6366f1', '#f59e0b', '#10b981', '#ef4444'];

export default function AdminDashboard() {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: () => base44.entities.Order.list('-created_date', 500),
  });

  const metrics = useMemo(() => {
    if (!orders.length) return null;

    const now = new Date();
    const thisMonthStart = startOfMonth(now);
    const lastMonthStart = startOfMonth(subMonths(now, 1));

    const thisMonthOrders = orders.filter(o => new Date(o.created_date) >= thisMonthStart);
    const lastMonthOrders = orders.filter(o => {
      const d = new Date(o.created_date);
      return d >= lastMonthStart && d < thisMonthStart;
    });

    const totalRevenue = orders.reduce((s, o) => s + (Number(o.total) || 0), 0);
    const monthRevenue = thisMonthOrders.reduce((s, o) => s + (Number(o.total) || 0), 0);
    const lastMonthRevenue = lastMonthOrders.reduce((s, o) => s + (Number(o.total) || 0), 0);
    const revenueChange = lastMonthRevenue > 0 ? ((monthRevenue - lastMonthRevenue) / lastMonthRevenue * 100).toFixed(1) : null;

    // Order volume over last 30 days
    const last30 = eachDayOfInterval({ start: subDays(now, 29), end: now });
    const ordersByDay = last30.map(day => {
      const label = format(day, 'MMM d');
      const count = orders.filter(o => format(new Date(o.created_date), 'MMM d, yyyy') === format(day, 'MMM d, yyyy')).length;
      const revenue = orders
        .filter(o => format(new Date(o.created_date), 'MMM d, yyyy') === format(day, 'MMM d, yyyy'))
        .reduce((s, o) => s + (Number(o.total) || 0), 0);
      return { label, count, revenue };
    });

    // Top products
    const productCounts = {};
    orders.forEach(o => {
      (o.items || []).forEach(item => {
        if (!item.name) return;
        productCounts[item.name] = (productCounts[item.name] || 0) + (item.quantity || 1);
      });
    });
    const topProducts = Object.entries(productCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, count]) => ({ name: name.length > 30 ? name.slice(0, 28) + '…' : name, count }));

    // Status breakdown
    const statusCounts = {};
    orders.forEach(o => {
      const s = o.status || 'unknown';
      statusCounts[s] = (statusCounts[s] || 0) + 1;
    });

    return {
      totalOrders: orders.length,
      totalRevenue,
      monthRevenue,
      revenueChange,
      thisMonthCount: thisMonthOrders.length,
      ordersByDay,
      topProducts,
      statusCounts,
    };
  }, [orders]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link to="/admin/products" className="text-gray-400 hover:text-gray-700">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sales Dashboard</h1>
            <p className="text-gray-500 text-sm mt-0.5">Live overview of your store performance</p>
          </div>
          <div className="ml-auto flex gap-2">
            <Link to="/admin/orders" className="text-sm bg-white border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700">
              View Orders →
            </Link>
            <Link to="/admin/quotes" className="text-sm bg-white border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700">
              View Quotes →
            </Link>
          </div>
        </div>

        {!metrics ? (
          <div className="text-center py-20 text-gray-400">
            <Package className="w-12 h-12 mx-auto mb-3" />
            <p>No orders yet — metrics will appear here once orders come in.</p>
          </div>
        ) : (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <KpiCard
                icon={<DollarSign className="w-5 h-5" />}
                label="Total Revenue"
                value={`$${metrics.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                color="blue"
              />
              <KpiCard
                icon={<TrendingUp className="w-5 h-5" />}
                label="This Month"
                value={`$${metrics.monthRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                sub={metrics.revenueChange ? `${metrics.revenueChange > 0 ? '+' : ''}${metrics.revenueChange}% vs last month` : null}
                color="green"
              />
              <KpiCard
                icon={<ShoppingBag className="w-5 h-5" />}
                label="Total Orders"
                value={metrics.totalOrders}
                color="purple"
              />
              <KpiCard
                icon={<Package className="w-5 h-5" />}
                label="This Month Orders"
                value={metrics.thisMonthCount}
                color="orange"
              />
            </div>

            {/* Order Volume Trend */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Order Volume — Last 30 Days</h2>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={metrics.ordersByDay} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                    tickFormatter={(v, i) => i % 5 === 0 ? v : ''}
                    interval={0}
                  />
                  <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                    formatter={(v, n) => [v, n === 'count' ? 'Orders' : 'Revenue ($)']}
                  />
                  <Line type="monotone" dataKey="count" stroke="#0047FF" strokeWidth={2} dot={false} name="count" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue Trend */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Daily Revenue — Last 30 Days</h2>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={metrics.ordersByDay} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                    tickFormatter={(v, i) => i % 5 === 0 ? v : ''}
                    interval={0}
                  />
                  <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} tickFormatter={v => `$${v}`} />
                  <Tooltip
                    contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                    formatter={(v) => [`$${Number(v).toFixed(2)}`, 'Revenue']}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Products */}
              {metrics.topProducts.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Top Products by Units Sold</h2>
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={metrics.topProducts} layout="vertical" margin={{ top: 0, right: 10, bottom: 0, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 10, fill: '#9ca3af' }} allowDecimals={false} />
                      <YAxis dataKey="name" type="category" width={130} tick={{ fontSize: 10, fill: '#374151' }} />
                      <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v) => [v, 'Units']} />
                      <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                        {metrics.topProducts.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Order Status Breakdown */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Orders by Status</h2>
                <div className="space-y-3">
                  {Object.entries(metrics.statusCounts).map(([status, count], i) => {
                    const pct = Math.round((count / metrics.totalOrders) * 100);
                    return (
                      <div key={status}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="capitalize text-gray-700">{status.replace(/_/g, ' ')}</span>
                          <span className="text-gray-500">{count} ({pct}%)</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all"
                            style={{ width: `${pct}%`, backgroundColor: COLORS[i % COLORS.length] }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function KpiCard({ icon, label, value, sub, color }) {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  };
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className={`inline-flex p-2 rounded-lg mb-3 ${colorMap[color]}`}>{icon}</div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
      {sub && <div className="text-xs text-green-600 mt-0.5">{sub}</div>}
    </div>
  );
}