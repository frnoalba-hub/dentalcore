import { format } from 'date-fns';
import { Truck, Calendar } from 'lucide-react';
import { companyInfo } from '@/components/dentalcore/productsData';

export default function OrderDetails({ order }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Shipping Info */}
      <div className="border border-[#111]/10 p-6">
        <h3 className="text-[10px] uppercase tracking-widest font-semibold text-[#111]/40 mb-4">Shipping Information</h3>
        <div className="space-y-3">
          {order.customer_name && (
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#111]/30 block">Customer</span>
              <span className="text-sm font-body text-[#111]">{order.customer_name}</span>
            </div>
          )}
          {order.carrier && (
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#111]/40" />
              <span className="text-sm font-body text-[#111]">{order.carrier}</span>
            </div>
          )}
          {order.tracking_number && (
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#111]/30 block">Tracking Number</span>
              <span className="text-sm font-body font-medium text-accent">{order.tracking_number}</span>
            </div>
          )}
          {order.shipped_date && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#111]/40" />
              <span className="text-sm font-body text-[#111]">Shipped {format(new Date(order.shipped_date), 'MMM d, yyyy')}</span>
            </div>
          )}
          {order.estimated_delivery && (
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#111]/30 block">Estimated Delivery</span>
              <span className="text-sm font-body font-medium text-[#111]">{format(new Date(order.estimated_delivery), 'MMM d, yyyy')}</span>
            </div>
          )}
          {!order.carrier && !order.tracking_number && (
            <p className="text-sm font-body text-[#111]/50">Shipping details will appear once your order ships.</p>
          )}
        </div>
      </div>

      {/* Order Items */}
      <div className="border border-[#111]/10 p-6">
        <h3 className="text-[10px] uppercase tracking-widest font-semibold text-[#111]/40 mb-4">Order Summary</h3>
        {order.items?.length > 0 ? (
          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between border-b border-[#111]/5 pb-2 last:border-0 last:pb-0">
                <div>
                  <span className="text-sm font-body text-[#111]">{item.name}</span>
                  <span className="text-xs text-[#111]/40 ml-2">×{item.quantity}</span>
                </div>
                <span className="text-sm font-medium text-[#111]">${item.price?.toFixed(2)}</span>
              </div>
            ))}
            {order.total && (
              <div className="flex items-center justify-between pt-3 border-t border-[#111]/10">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#111]">Total</span>
                <span className="text-lg font-medium text-[#111]">${order.total.toFixed(2)}</span>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm font-body text-[#111]/50">No item details available.</p>
        )}

        {/* Contact help */}
        <div className="mt-6 pt-4 border-t border-[#111]/10">
          <p className="text-xs text-[#111]/40 font-body">
            Questions? <a href={`mailto:${companyInfo.email}`} className="text-accent hover:underline">{companyInfo.email}</a>
          </p>
        </div>
      </div>
    </div>
  );
}