import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronDown, ChevronUp, Package, Truck, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

const STATUS_OPTIONS = ['confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered'];
const STATUS_COLORS = {
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-yellow-100 text-yellow-700',
  shipped: 'bg-purple-100 text-purple-700',
  out_for_delivery: 'bg-orange-100 text-orange-700',
  delivered: 'bg-green-100 text-green-700',
};

export default function OrderRow({ order }) {
  const [expanded, setExpanded] = useState(false);
  const [tracking, setTracking] = useState({
    status: order.status || 'confirmed',
    tracking_number: order.tracking_number || '',
    carrier: order.carrier || '',
    estimated_delivery: order.estimated_delivery || '',
    shipped_date: order.shipped_date || '',
    notes: order.notes || '',
  });
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (data) => base44.entities.Order.update(order.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      toast.success(`Order ${order.order_id} updated`);
    },
  });

  const handleSave = () => {
    updateMutation.mutate(tracking);
  };

  const handleField = (field, value) => {
    setTracking(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Summary row */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 text-left"
      >
        <Package className="w-5 h-5 text-gray-400 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm text-gray-900">{order.order_id}</span>
            <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-600'}`}>
              {(order.status || 'unknown').replace(/_/g, ' ')}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-0.5">
            {order.customer_name || order.email} · {order.created_date ? format(new Date(order.created_date), 'MMM d, yyyy') : '—'}
            {order.total ? ` · $${Number(order.total).toFixed(2)}` : ''}
          </div>
        </div>
        {order.tracking_number && (
          <div className="hidden md:flex items-center gap-1 text-xs text-gray-500">
            <Truck className="w-3.5 h-3.5" />
            {order.tracking_number}
          </div>
        )}
        {expanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-gray-100 p-4 bg-gray-50 space-y-4">
          {/* Items */}
          {order.items && order.items.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Items</h4>
              <div className="space-y-1">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-700">{item.quantity}× {item.name}</span>
                    <span className="text-gray-500">${Number(item.price).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tracking form */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Tracking & Status</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Status</label>
                <Select value={tracking.status} onValueChange={(v) => handleField('status', v)}>
                  <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map(s => (
                      <SelectItem key={s} value={s}>{s.replace(/_/g, ' ')}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Carrier</label>
                <Input className="bg-white" value={tracking.carrier} onChange={(e) => handleField('carrier', e.target.value)} placeholder="e.g. UPS, FedEx" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Tracking Number</label>
                <Input className="bg-white" value={tracking.tracking_number} onChange={(e) => handleField('tracking_number', e.target.value)} placeholder="Enter tracking #" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Shipped Date</label>
                <Input className="bg-white" type="date" value={tracking.shipped_date} onChange={(e) => handleField('shipped_date', e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Est. Delivery</label>
                <Input className="bg-white" type="date" value={tracking.estimated_delivery} onChange={(e) => handleField('estimated_delivery', e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Notes</label>
                <Input className="bg-white" value={tracking.notes} onChange={(e) => handleField('notes', e.target.value)} placeholder="Internal notes" />
              </div>
            </div>
            <div className="flex justify-end mt-3">
              <Button onClick={handleSave} disabled={updateMutation.isPending} size="sm">
                {updateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}