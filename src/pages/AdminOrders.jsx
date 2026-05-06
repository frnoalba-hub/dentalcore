import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, X, Loader2, PackageOpen, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import OrderRow from '@/components/admin/OrderRow';

const STATUS_OPTIONS = ['all', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered'];

export default function AdminOrders() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: () => base44.entities.Order.list('-created_date', 200),
  });

  const filtered = useMemo(() => {
    return orders.filter(o => {
      const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
      const q = search.toLowerCase();
      const matchesSearch = !q ||
        (o.order_id || '').toLowerCase().includes(q) ||
        (o.email || '').toLowerCase().includes(q) ||
        (o.customer_name || '').toLowerCase().includes(q) ||
        (o.tracking_number || '').toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [orders, search, statusFilter]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/admin/products" className="text-gray-400 hover:text-gray-700">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
            <p className="text-gray-500 mt-0.5 text-sm">{orders.length} total orders</p>
          </div>
          <div className="ml-auto flex gap-2">
            <Link to="/admin/quotes" className="text-sm bg-white border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700">
              Quotes
            </Link>
            <Link to="/admin/dashboard" className="text-sm bg-white border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700">
              Dashboard
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by order ID, email, name, tracking…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map(s => (
                <SelectItem key={s} value={s}>{s === 'all' ? 'All Statuses' : s.replace(/_/g, ' ')}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Order list */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <PackageOpen className="w-12 h-12 mx-auto mb-3" />
            <p className="text-sm">{orders.length === 0 ? 'No orders yet' : 'No orders match your filters'}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(order => (
              <OrderRow key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}